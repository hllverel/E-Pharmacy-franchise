import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.shopId)) {
    return next(createHttpError(400, 'Invalid shop id'));
  }
  next();
};