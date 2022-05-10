import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/constants';

import {
  UnauthorizedError,
} from "../errors/errorClasses";

import {
  authErr,
} from '../errors/errorMessages';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(UnauthorizedError.code).send({
      code: UnauthorizedError.code,
      type: UnauthorizedError.type,
      name: UnauthorizedError.type,
      message: authErr.AuthRequired,
      errMessage: authErr.AuthRequired,
    })
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    res.status(UnauthorizedError.code).send({
      code: UnauthorizedError.code,
      type: UnauthorizedError.type,
      name: UnauthorizedError.type,
      message: authErr.AuthRequired,
      errMessage: authErr.AuthRequired,
    })
  }

  req.user = payload;

  next();
};