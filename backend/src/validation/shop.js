import Joi from 'joi';

const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

export const createShopSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  ownerName: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phonePattern).required(),
  street: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(60).required(),
    zip: Joi.string().min(3).max(12).required(),
  password: Joi.string().required(),
  hasOwnDelivery: Joi.boolean().required(),
});

export const updateShopSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  ownerName: Joi.string().min(2).max(60),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phonePattern),
  street: Joi.string().min(2).max(100),
  city: Joi.string().min(2).max(60),
  zip: Joi.string().min(3).max(12),
  hasOwnDelivery: Joi.boolean(),
}).min(1);