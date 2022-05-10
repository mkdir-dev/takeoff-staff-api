import mongoose from "mongoose";
import validator from "validator";

import { userValidErr } from "../errors/errorMessages";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value: string) {
        return validator.isEmail(value);
      },
      message: userValidErr.urlErrEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

export default mongoose.model("User", userSchema);