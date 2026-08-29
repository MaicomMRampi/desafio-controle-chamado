import express from 'express'
import {
  getAllPriority,
  newPriority,
  deletePriority
} from '../controllers/priorityController.js'

const router = express.Router()

router.get('/getPriority', getAllPriority)
router.post('/newPriority', newPriority)
router.delete('/deletePriority', deletePriority)

export default router