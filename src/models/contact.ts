import mongoose from "mongoose";
import validator from "validator";

import { userValidErr } from "../errors/errorMessages";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 24,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value: string) {
        return validator.isEmail(value);
      },
      message: userValidErr.urlErrEmail,
    },
  },
  owner: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model("Contact", contactSchema);