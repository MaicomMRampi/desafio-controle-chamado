import express from 'express'
import {
  getAllPriority,
  newPriority,
  deletePriority
} from '../controllers/priorityController.js'
import authJwt from '../middlewares/authJwt.js'

const router = express.Router()

router.get('/getPriority', authJwt, getAllPriority)
router.post('/newPriority', authJwt, newPriority)
router.delete('/deletePriority', authJwt, deletePriority)

export default router