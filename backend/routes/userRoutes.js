import express from "express";
const router = express.Router();
import {protect,admin} from '../middleware/authMiddleware.js';
import { 
    getUsers,
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUsersById} from "../controllers/userController.js";

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUsersById).put(updateUser)
export default router;