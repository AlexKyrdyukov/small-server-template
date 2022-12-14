import type { Handler } from 'express';
import * as yup from 'yup';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../exceptions/CustomError';

type ValidationShemaType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema;
};

type ValidationType = {
  body?: ValidationShemaType;
  query?: ValidationShemaType;
  params?: ValidationShemaType;
};

const createValidationMiddleware = (schema: ValidationType) => {
  const validationMiddleware: Handler = async (req, res, next) => {
    try {
      const error: Array<{
        field?: string[];
        message?: string;
        errors?: string[];
        inner?: string[];
      }> = [];

      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      const keysRequest = [
        ...Object.keys(req.body),
        ...Object.keys(req.params),
        ...Object.keys(req.query),
      ];

      const keysSchema = [
        ...Object.keys(schema.body),
        ...Object.keys(schema.params),
        ...Object.keys(schema.query),
      ];

      const arrKey = _.difference(keysRequest, keysSchema);
      if (arrKey.length) {
        error.push({
          field: arrKey,
          errors: [`please deleted ${arrKey} fields`],
        });
      }
      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object(rootShape);
      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => error.push({
          inner: err.inner,
          // errors: err.errors,
        }));
      if (error.length) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'error entered data', error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};

export default createValidationMiddleware;
