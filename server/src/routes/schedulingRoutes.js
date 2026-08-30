import { saveScheduling } from '../controllers/schedulingController.js'
import authJwt from '../middlewares/authJwt.js'
import express from 'express'
const router = express.Router()

router.post('/saveScheduling', authJwt, saveScheduling)

export default router