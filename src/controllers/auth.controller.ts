import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError'
import { findByEmail, create } from '../models/user.model'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ApiError(400, 'Email and password are required'))
    }

    const existingUser = await findByEmail(email)
    if (existingUser) {
      return next(new ApiError(409, 'Email already in use'))
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await create(email, hashedPassword)

    res.status(201).json({ id: user.id, email: user.email })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ApiError(400, 'Email and password are required'))
    }

    const user = await findByEmail(email)
    if (!user) {
      return next(new ApiError(401, 'Invalid credentials'))
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return next(new ApiError(401, 'Invalid credentials'))
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}