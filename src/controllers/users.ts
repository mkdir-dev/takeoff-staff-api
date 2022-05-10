import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/constants';

import User from '../models/user';

import {
  SuccessOkRequest,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "../errors/errorClasses";

import {
  userErr,
  authErr,
  serverErr,
} from '../errors/errorMessages';

export const register = (req, res, next) => {
  const { email, password } = req?.body;

  bcrypt.hash(password, 8)
    .then((hash) => User.create({
      email,
      password: hash,
    })
      .then((user) => {
        const _id = user._id;

        res.status(SuccessOkRequest.code).send({ email, _id })
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(BadRequestError.code).send({
            code: BadRequestError.code,
            type: BadRequestError.type,
            name: err.name,
            message: err.message,
            errMessage: serverErr.ValidationError,
          })
        } else if (err.name === 'CastError') {
          res.status(ConflictError.code).send({
            code: ConflictError.code,
            type: BadRequestError.type,
            name: err.name,
            message: err.message,
            errMessage: serverErr.ConflictError,
          })
        } else if (err.name === 'MongoServerError' && err.code === 11000) {
          res.status(ConflictError.code).send({
            code: ConflictError.code,
            type: ConflictError.type,
            name: err.name,
            message: err.keyValue.email + userErr.ConflictError,
            errMessage: err.message,
          })
        } else {
          res.status(InternalServerError.code).send({
            code: InternalServerError.code,
            type: InternalServerError.type,
            name: err.name,
            message: serverErr.ServerError,
            errMessage: err.message,
          })
        }
      }))
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req?.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(UnauthorizedError.code).send({
          code: UnauthorizedError.code,
          type: UnauthorizedError.type,
          name: UnauthorizedError.type,
          message: userErr.NotFoundError,
          errMessage: authErr.userUnauthError,
        })
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(UnauthorizedError.code).send({
              code: UnauthorizedError.code,
              type: UnauthorizedError.type,
              name: UnauthorizedError.type,
              message: authErr.userUnauthError,
              errMessage: serverErr.ServerError,
            })
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          const _id = user._id;
          const email = user.email;

          res.status(SuccessOkRequest.code).send({ email, _id, token });
        })
    })
    .catch((err) => {
      if (err) {
        res.status(UnauthorizedError.code).send({
          code: UnauthorizedError.code,
          type: UnauthorizedError.type,
          name: err.name,
          message: err.message,
          errMessage: authErr.UnauthorizedError,
        })
      } else {
        res.status(InternalServerError.code).send({
          code: InternalServerError.code,
          type: InternalServerError.type,
          name: InternalServerError.type,
          message: serverErr.ServerError,
          errMessage: serverErr.ServerError,
        })
      }
    })
    .catch(next);
};

export const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      const _id = user._id;
      const email = user.email;

      res.status(SuccessOkRequest.code).send({ email, _id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ConflictError.code).send({
          code: ConflictError.code,
          type: BadRequestError.type,
          name: err.name,
          message: userErr.BadRequestError,
          errMessage: err.message,
        })
      } else if (err.massage === 'NotFound') {
        res.status(NotFoundError.code).send({
          code: NotFoundError.code,
          type: NotFoundError.type,
          name: err.name,
          message: err.message,
          errMessage: userErr.NotFoundError,
        })
      } else {
        res.status(InternalServerError.code).send({
          code: InternalServerError.code,
          type: InternalServerError.type,
          name: err.name,
          message: err.message,
          errMessage: serverErr.ServerError,
        })
      }
    })
    .catch(next);
};