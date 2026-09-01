import { saveScheduling, getSchedule, deleteSchedule, updateScheduling } from '../controllers/schedulingController.js'
import authJwt from '../middlewares/authJwt.js'
import express from 'express'
const router = express.Router()

router.post('/saveScheduling', authJwt, saveScheduling)
router.get('/getScheduling', authJwt, getSchedule)
router.delete('/delete', authJwt, deleteSchedule)
router.put('/editScheduling', authJwt, updateScheduling)

export default router