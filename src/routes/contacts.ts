import express from "express";

import { auth } from "../middlewares/auth";
import { validate, contactValidSchema } from "../middlewares/validation";
import {
  getContacts,
  getUserContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contacts";

const router = express.Router();

router.get('/', auth, getContacts);
router.get('/:userId', auth, getUserContacts);
router.post('/create', auth, validate(contactValidSchema), createContact);
router.patch('/:contactId', auth, validate(contactValidSchema), updateContact);
router.delete('/:contactId', auth, deleteContact);

export default router;