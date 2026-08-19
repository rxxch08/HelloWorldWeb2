import { pool } from '../config/db'
import type { Student, StudentInput } from '../types/studentTypes'

export const findAll = async (): Promise<Student[]> => {
  const result = await pool.query<Student>(
    'SELECT id, first_name AS "firstName", last_name AS "lastName", email FROM students ORDER BY id ASC'
  )
  return result.rows
}

export const findById = async (id: number): Promise<Student | null> => {
  const result = await pool.query<Student>(
    'SELECT id, first_name AS "firstName", last_name AS "lastName", email FROM students WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export const create = async (student: StudentInput): Promise<Student | null> => {
  const result = await pool.query<Student>(
    'INSERT INTO students (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id, first_name AS "firstName", last_name AS "lastName", email',
    [student.firstName, student.lastName, student.email]
  )
  return result.rows[0] || null
}

export const update = async (id: number, student: StudentInput): Promise<Student | null> => {
  const result = await pool.query<Student>(
    'UPDATE students SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING id, first_name AS "firstName", last_name AS "lastName", email',
    [student.firstName, student.lastName, student.email, id]
  )
  return result.rows[0] || null
}

export const partialUpdate = async (id: number, data: Partial<StudentInput>): Promise<Student | null> => {
  const columnMap: Record<string, string> = {
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email'
  }

  const fields = Object.keys(data)
  if (fields.length === 0) return findById(id)

  const sets = fields.map((field, i) => `${columnMap[field]} = $${i + 1}`).join(', ')
  const values = fields.map((field) => (data as any)[field])

  const result = await pool.query<Student>(
    `UPDATE students SET ${sets} WHERE id = $${fields.length + 1} RETURNING id, first_name AS "firstName", last_name AS "lastName", email`,
    [...values, id]
  )
  return result.rows[0] || null
}

export const remove = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id])
  return (result.rowCount ?? 0) > 0
}