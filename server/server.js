import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import 'dotenv/config';

// routes
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoute.js'
import priorityRoute from './src/routes/priorityRoute.js'
import schedulingRoute from './src/routes/schedulingRoutes.js'

const app = express()
app.use(cookieParser())
app.use(cors({
  origin: process.env.API_URL_FRONTEND,
  credentials: true,
  methods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-type', 'Authorization']
}))
app.use(express.json())

app.use(authRoutes)
app.use(userRoutes)
app.use(priorityRoute)
app.use(schedulingRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Servidor rodando na porta d ${port}`)
})