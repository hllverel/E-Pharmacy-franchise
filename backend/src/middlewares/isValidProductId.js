import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidProductId = (req, res, next) => {
  if (!isValidObjectId(req.params.productId)) {
    return next(createHttpError(400, 'Invalid product id'));
  }
  next();
};