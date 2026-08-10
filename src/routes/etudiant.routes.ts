import { Router } from 'express'
import { getAllEtudiants, getEtudiantById, createEtudiant, updateEtudiant, partialUpdateEtudiant } from '../controllers/etudiant.controller'

const router = Router()

router.get('/', getAllEtudiants)
router.get('/:id', getEtudiantById)
router.post('/', createEtudiant)
router.put('/:id', updateEtudiant)
router.patch('/:id', partialUpdateEtudiant)

export default router