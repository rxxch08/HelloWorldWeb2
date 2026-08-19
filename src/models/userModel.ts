import { pool } from '../config/db'
import type { User } from '../types/userTypes'

export async function findByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0] || null
}

export async function create(email: string, hashedPassword: string): Promise<User> {
  const result = await pool.query<User>(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  )
  return result.rows[0]
}