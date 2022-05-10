import * as yup from 'yup';

import {
  serverErr,
  userValidErr,
  contactValidErr,
} from '../errors/errorMessages';

import {
  BadRequestError,
} from "../errors/errorClasses";

export const userValidSchema = yup.object({
  body: yup.object({
    email: yup.string()
      .required(userValidErr.errEmailRequired)
      .email(userValidErr.errEmail),
    password: yup.string()
      .required(userValidErr.errPassRequired)
      .min(8, userValidErr.errPass),
  })
});

export const contactValidSchema = yup.object({
  body: yup.object({
    name: yup.string()
      .required(contactValidErr.errNameRequired)
      .min(2, contactValidErr.errNameMin)
      .max(30, contactValidErr.errNameMax),
    phone: yup.string()
      .required(contactValidErr.errPhoneRequired)
      .min(6, contactValidErr.errPhoneMin)
      .max(24, contactValidErr.errPhoneMax),
    email: yup.string()
      .required(contactValidErr.errEmailRequired)
      .email(contactValidErr.errEmail),
  })
});

export const validate = (schema: any) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });

    return next();
  } catch (err) {
    return res.status(BadRequestError.code).send({
      code: BadRequestError.code,
      type: BadRequestError.type,
      name: err.name,
      message: serverErr.ValidationError,
      errMessage: err.message,
    });
  }
};