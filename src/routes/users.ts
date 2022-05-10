import express from "express";

import { auth } from "../middlewares/auth";
import { getUserById } from "../controllers/users";

const router = express.Router();

router.get('/:userId', auth, getUserById);

export default router;