import express from 'express'
import { login } from '../controllers/authControllers.js'
// import 
const router = express.Router()

router.post('/login', login)

export default router