import Joi from 'joi';
import { PRODUCT_CATEGORIES } from '../constants/categories.js';

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().max(2000).allow(''),
  category: Joi.string().valid(...PRODUCT_CATEGORIES),
  stock: Joi.number().integer().min(0),
  suppliers: Joi.string().max(100).allow(''),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  price: Joi.number().positive(),
  description: Joi.string().max(2000).allow(''),
  category: Joi.string().valid(...PRODUCT_CATEGORIES),
  stock: Joi.number().integer().min(0),
  suppliers: Joi.string().max(100).allow(''),
});

export const productQuerySchema = Joi.object({
  scope: Joi.string().valid('shop', 'all').default('shop'),
  category: Joi.string().valid(...PRODUCT_CATEGORIES).allow(''),
  search: Joi.string().trim().max(100).allow(''),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(8),
});

export const reviewsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(20).default(3),
});