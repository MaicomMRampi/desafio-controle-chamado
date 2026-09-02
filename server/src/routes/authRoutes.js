import express from 'express'
import { login, checkAuth, logout } from '../controllers/authController.js'
import authJwt from '../middlewares/authJwt.js'
const router = express.Router()

router.post('/login', login)
router.get('/me', authJwt, checkAuth)
router.post('/logout', authJwt, logout)

export default router