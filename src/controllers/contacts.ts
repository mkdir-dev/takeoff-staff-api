import Contact from "../models/contact";

import {
  SuccessOkRequest,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "../errors/errorClasses";

import {
  contactReq,
  contactErr,
  serverErr,
} from '../errors/errorMessages';

export const getContacts = (req, res, next) => {
  Contact.find({}, { __v: 0 })
    .then((arr) => res.status(SuccessOkRequest.code).send(arr))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ConflictError.code).send({
          code: ConflictError.code,
          type: BadRequestError.type,
          name: err.name,
          message: contactErr.BadRequestError,
          errMessage: err.message,
        })
      } else if (err.massage === 'NotFound') {
        res.status(NotFoundError.code).send({
          code: NotFoundError.code,
          type: NotFoundError.type,
          name: err.name,
          message: err.message,
          errMessage: contactErr.NotFoundError,
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

export const getUserContacts = (req, res, next) => {
  const { userId } = req.params;

  Contact.find({ owner: userId }, { __v: 0 })
    .then((arr) => res.status(SuccessOkRequest.code).send(arr))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ConflictError.code).send({
          code: ConflictError.code,
          type: BadRequestError.type,
          name: err.name,
          message: contactErr.BadRequestError,
          errMessage: err.message,
        })
      } else if (err.massage === 'NotFound') {
        res.status(NotFoundError.code).send({
          code: NotFoundError.code,
          type: NotFoundError.type,
          name: err.name,
          message: err.message,
          errMessage: contactErr.NotFoundError,
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

export const createContact = (req, res, next) => {
  const { name, phone, email } = req?.body;
  const owner = String(req.user._id);

  Contact.create({ name, phone, email, owner })
    .then((contact) => {
      res.status(SuccessOkRequest.code).send(contact);
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

export const updateContact = (req, res, next) => {
  const { name, phone, email } = req?.body;
  const { contactId } = req.params;
  const userId = req.user._id;

  Contact.findById(contactId)
    .then((contact) => {
      if (contact.owner.toString() === userId) {
        Contact.findByIdAndUpdate(
          contactId,
          { name, phone, email },
          { new: true, runValidators: true },
        )
          .then((response) => {
            res.status(SuccessOkRequest.code).send(response);
          })
          .catch(next);
      } else {
        res.status(ForbiddenError.code).send({
          code: ForbiddenError.code,
          type: ForbiddenError.type,
          name: ForbiddenError.type,
          message: contactErr.UpdateError,
          errMessage: contactErr.UpdateError,
        })
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ConflictError.code).send({
          code: ConflictError.code,
          type: BadRequestError.type,
          name: err.name,
          message: serverErr.ConflictError,
          errMessage: err.message,
        })
      } else if (err.message === 'NotFound') {
        res.status(NotFoundError.code).send({
          code: NotFoundError.code,
          type: NotFoundError.type,
          name: err.name,
          message: contactErr.NotFoundError,
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
    })
    .catch(next);
};

export const deleteContact = (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  Contact.findById(contactId)
    .then((contact) => {
      if (contact.owner.toString() === userId) {
        Contact.findByIdAndRemove(contactId)
          .then(() => {
            res.status(SuccessOkRequest.code).send({
              code: SuccessOkRequest.code,
              type: SuccessOkRequest.type,
              name: SuccessOkRequest.type,
              message: contactReq.SuccessOkRequest,
              errMessage: contactReq.SuccessOkRequest,
            });
          })
          .catch(next);
      } else {
        res.status(ForbiddenError.code).send({
          code: ForbiddenError.code,
          type: ForbiddenError.type,
          name: ForbiddenError.type,
          message: contactErr.DeleteError,
          errMessage: contactErr.DeleteError,
        })
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ConflictError.code).send({
          code: ConflictError.code,
          type: BadRequestError.type,
          name: err.name,
          message: serverErr.ConflictError,
          errMessage: err.message,
        })
      } else if (err.message === 'NotFound') {
        res.status(NotFoundError.code).send({
          code: NotFoundError.code,
          type: NotFoundError.type,
          name: err.name,
          message: contactErr.NotFoundError,
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
    })
    .catch(next);
};