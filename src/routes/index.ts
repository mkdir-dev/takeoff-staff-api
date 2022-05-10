import express from "express";

import { register, login } from "../controllers/users";
import { validate, userValidSchema } from "../middlewares/validation";

import usersRoutes from "./users";
import contactsRoutes from "./contacts";

const router = express.Router();

router.post('/register', validate(userValidSchema), register);
router.post('/login', validate(userValidSchema), login);

router.use('/user', usersRoutes);
router.use('/contacts', contactsRoutes);

export default router;