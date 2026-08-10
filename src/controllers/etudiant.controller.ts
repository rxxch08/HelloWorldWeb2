import { Request, Response } from 'express'
import { getAll } from '../models/etudiant.model'

export const getAllEtudiants = (req: Request, res: Response) => {
  const etudiants = getAll()
  res.status(200).json(etudiants)
}