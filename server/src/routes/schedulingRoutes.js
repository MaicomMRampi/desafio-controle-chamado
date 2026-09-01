import { saveScheduling, getSchedule, deleteSchedule, updateScheduling, updateSituation, saveNote, getMessages } from '../controllers/schedulingController.js'
import authJwt from '../middlewares/authJwt.js'
import express from 'express'
const router = express.Router()

router.post('/saveScheduling', authJwt, saveScheduling)
router.get('/getScheduling', authJwt, getSchedule)
router.delete('/delete', authJwt, deleteSchedule)
router.put('/editScheduling', authJwt, updateScheduling)
router.put('/updateStatus', authJwt, updateSituation)
router.post('/saveNote', authJwt, saveNote)
router.get('/getMessages', authJwt, getMessages)

export default router