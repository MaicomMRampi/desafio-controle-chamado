import express from 'express'
import { login, checkAuth } from '../controllers/authController.js'
import authJwt from '../middlewares/authJwt.js'
// import 
const router = express.Router()

router.post('/login', login)
router.get('/me', authJwt, checkAuth)

export default router