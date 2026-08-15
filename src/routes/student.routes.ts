import { Router } from 'express'
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  partialUpdateStudent,
  deleteStudent
} from '../controllers/student.controller'

const router = Router()

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.patch('/:id', partialUpdateStudent)
router.delete('/:id', deleteStudent)

export default router