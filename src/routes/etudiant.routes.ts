import { Router } from 'express'
import { getAllEtudiants } from '../controllers/etudiant.controller'

const router = Router()

router.get('/', getAllEtudiants)

export default router