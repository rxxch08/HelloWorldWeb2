import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { findAll, findById, create, update, partialUpdate, remove } from '../models/studentModel'

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await findAll()
    res.status(200).json(students)
  } catch (err) {
    next(err)
  }
}

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const student = await findById(id)

    if (!student) {
      return next(new ApiError(404, 'Student not found'))
    }

    res.status(200).json(student)
  } catch (err) {
    next(err)
  }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email } = req.body

    if (!firstName || !lastName || !email) {
      return next(new ApiError(400, 'Fields firstName, lastName and email are required'))
    }

    const newStudent = await create({ firstName, lastName, email })
    res.status(201).json(newStudent)
  } catch (err) {
    next(err)
  }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const { firstName, lastName, email } = req.body

    if (!firstName || !lastName || !email) {
      return next(new ApiError(400, 'Fields firstName, lastName and email are required'))
    }

    const student = await update(id, { firstName, lastName, email })

    if (!student) {
      return next(new ApiError(404, 'Student not found'))
    }

    res.status(200).json(student)
  } catch (err) {
    next(err)
  }
}

export const partialUpdateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const student = await partialUpdate(id, req.body)

    if (!student) {
      return next(new ApiError(404, 'Student not found'))
    }

    res.status(200).json(student)
  } catch (err) {
    next(err)
  }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const success = await remove(id)

    if (!success) {
      return next(new ApiError(404, 'Student not found'))
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}