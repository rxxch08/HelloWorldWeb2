import express from 'express'
import dotenv from 'dotenv'
import studentRoutes from './routes/student.routes'
import { errorHandler } from './middlewares/errorHandler'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/students', studentRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.use('/auth', authRoutes)