import express from 'express'
import authJwt from '../middlewares/authJwt.js'
import { getAllUsers, deleteUser, userUpdate } from '../controllers/userController.js'
const router = express.Router()

router.delete('/deleteUser', authJwt, deleteUser)
router.get('/getUsers', getAllUsers)
router.delete('/deleteUser', authJwt, deleteUser)
// router.post('/newUser',authJwt, newUser)
router.put('/editUser', authJwt, userUpdate)

export default router