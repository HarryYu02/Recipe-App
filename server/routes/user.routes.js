import express from "express";

// Import all controllers
import {
    createUser,
    getAllUsers,
    getUserInfoById,
    updateUserInfoById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoById);
router.route('/:id').patch(updateUserInfoById);

export default router;