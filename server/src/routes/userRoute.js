import express from 'express'
import authJwt from '../middlewares/authJwt.js'
import { getAllUsers, deleteUser, userUpdate, newUser, getUsers, updateProfile } from '../controllers/userController.js'
const router = express.Router()

router.delete('/deleteUser', authJwt, deleteUser)
router.get('/getUsers', getAllUsers)
router.delete('/deleteUser', authJwt, deleteUser)
router.post('/newUser', authJwt, newUser)
router.put('/editUser', authJwt, userUpdate)
router.get('/getUsersSheduling', authJwt, getUsers)
router.put('/updateProfile', authJwt, updateProfile)
export default router