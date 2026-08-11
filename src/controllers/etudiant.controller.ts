import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { findAll, findById, create, update, partialUpdate, remove } from '../models/etudiant.model'

export const getAllEtudiants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const etudiants = await findAll()
    res.status(200).json(etudiants)
  } catch (err) {
    next(err)
  }
}

export const getEtudiantById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const etudiant = await findById(id)

    if (!etudiant) {
      return next(new ApiError(404, 'Étudiant non trouvé'))
    }

    res.status(200).json(etudiant)
  } catch (err) {
    next(err)
  }
}

export const createEtudiant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nom, prenom, email } = req.body

    if (!nom || !prenom || !email) {
      return next(new ApiError(400, 'Les champs nom, prenom et email sont requis'))
    }

    const nouvelEtudiant = await create({ nom, prenom, email })
    res.status(201).json(nouvelEtudiant)
  } catch (err) {
    next(err)
  }
}

export const updateEtudiant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const { nom, prenom, email } = req.body

    if (!nom || !prenom || !email) {
      return next(new ApiError(400, 'Les champs nom, prenom et email sont requis'))
    }

    const etudiant = await update(id, { nom, prenom, email })

    if (!etudiant) {
      return next(new ApiError(404, 'Étudiant non trouvé'))
    }

    res.status(200).json(etudiant)
  } catch (err) {
    next(err)
  }
}

export const partialUpdateEtudiant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const etudiant = await partialUpdate(id, req.body)

    if (!etudiant) {
      return next(new ApiError(404, 'Étudiant non trouvé'))
    }

    res.status(200).json(etudiant)
  } catch (err) {
    next(err)
  }
}

export const deleteEtudiant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const success = await remove(id)

    if (!success) {
      return next(new ApiError(404, 'Étudiant non trouvé'))
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}