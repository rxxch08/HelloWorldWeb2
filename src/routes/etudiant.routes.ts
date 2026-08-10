import { Router } from 'express'
import { getAllEtudiants, getEtudiantById, createEtudiant } from '../controllers/etudiant.controller'

const router = Router()

router.get('/', getAllEtudiants)
router.get('/:id', getEtudiantById)
router.post('/', createEtudiant)


export default router