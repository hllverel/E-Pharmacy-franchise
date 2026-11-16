import createHttpError from 'http-errors';

export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });
  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(createHttpError(400, message));
  }
  req.validatedQuery = value;
  next();
};