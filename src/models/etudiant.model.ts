import { pool } from '../config/db'
import type { Etudiant, EtudiantInput } from '../types/etudiant.types'

export async function findAll(): Promise<Etudiant[]> {
  const result = await pool.query<Etudiant>(
    'SELECT * FROM etudiants ORDER BY id ASC'
  )
  return result.rows
}

export async function findById(id: number): Promise<Etudiant | null> {
  const result = await pool.query<Etudiant>(
    'SELECT * FROM etudiants WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function create(etudiant: EtudiantInput): Promise<Etudiant | null> {
  const result = await pool.query<Etudiant>(
    'INSERT INTO etudiants (nom, prenom, email) VALUES ($1, $2, $3) RETURNING *',
    [etudiant.nom, etudiant.prenom, etudiant.email]
  )
  return result.rows[0] || null
}

export async function update(id: number, etudiant: EtudiantInput): Promise<Etudiant | null> {
  const result = await pool.query<Etudiant>(
    'UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *',
    [etudiant.nom, etudiant.prenom, etudiant.email, id]
  )
  return result.rows[0] || null
}

export async function partialUpdate(id: number, data: Partial<EtudiantInput>): Promise<Etudiant | null> {
  const champs = Object.keys(data)
  if (champs.length === 0) return findById(id)

  const sets = champs.map((champ, i) => `${champ} = $${i + 1}`).join(', ')
  const valeurs = Object.values(data)

  const result = await pool.query<Etudiant>(
    `UPDATE etudiants SET ${sets} WHERE id = $${champs.length + 1} RETURNING *`,
    [...valeurs, id]
  )
  return result.rows[0] || null
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM etudiants WHERE id = $1', [id])
  return (result.rowCount ?? 0) > 0
}