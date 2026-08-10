import express from 'express'
import dotenv from 'dotenv'
import etudiantRoutes from './routes/etudiant.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/etudiants', etudiantRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})