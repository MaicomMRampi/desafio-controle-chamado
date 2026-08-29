import express from 'express'
import authJwt from '../middlewares/authJwt.js'
import { getAllUsers, deleteUser, userUpdate } from '../controllers/userController.js'
const router = express.Router()

router.get('/getUsers', getAllUsers)
router.delete('/deleteUser', deleteUser)
// router.post('/newUser', newUser)
router.put('/editUser', authJwt, userUpdate)

export default router