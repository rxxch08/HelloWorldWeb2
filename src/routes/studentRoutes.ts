import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  partialUpdateStudent,
  deleteStudent
} from '../controllers/studentController'

const router = Router()

router.use(authenticate)

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.patch('/:id', partialUpdateStudent)
router.delete('/:id', deleteStudent)

export default router