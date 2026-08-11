import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { getAll, getById, create, update, partialUpdate, remove } from '../models/etudiant.model'

export const getAllEtudiants = (req: Request, res: Response) => {
  const etudiants = getAll()
  res.status(200).json(etudiants)
}

export const getEtudiantById = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const etudiant = getById(id)

  if (!etudiant) {
    return res.status(404).json({ message: 'Étudiant non trouvé' })
  }

  res.status(200).json(etudiant)
}

export const createEtudiant = (req: Request, res: Response, next: NextFunction) => {
  const { nom, prenom, email } = req.body

  if (!nom || !prenom || !email) {
    return next(new ApiError(400, 'Les champs nom, prenom et email sont requis'))
  }

  const nouvelEtudiant = create(nom, prenom, email)
  res.status(201).json(nouvelEtudiant)
}

export const updateEtudiant = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id)
  const { nom, prenom, email } = req.body

  if (!nom || !prenom || !email) {
    return next(new ApiError(400, 'Les champs nom, prenom et email sont requis'))
  }

  const etudiant = update(id, nom, prenom, email)

  if (!etudiant) {
    return next(new ApiError(404, 'Étudiant non trouvé'))
  }

  res.status(200).json(etudiant)
}

export const partialUpdateEtudiant = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id)
  const etudiant = partialUpdate(id, req.body)

  if (!etudiant) {
    return next(new ApiError(404, 'Étudiant non trouvé'))
  }

  res.status(200).json(etudiant)
}

export const deleteEtudiant = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id)
  const success = remove(id)

  if (!success) {
    return next(new ApiError(404, 'Étudiant non trouvé'))
  }

  res.status(204).send()
}