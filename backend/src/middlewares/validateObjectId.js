import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateObjectId = (paramName) => (req, res, next) => {
  if (!isValidObjectId(req.params[paramName])) {
    return next(createHttpError(400, `Invalid ${paramName}`));
  }
  next();
};