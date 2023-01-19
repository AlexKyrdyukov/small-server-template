import * as yup from 'yup';
import _ from 'lodash';

import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomError, errorMessages } from '../utils';

type ValidationShemaType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema;
};

type ValidationType = {
  body?: ValidationShemaType;
  query?: ValidationShemaType;
  params?: ValidationShemaType;
};

type ParamsType = {
  errors: string[];
  path: string;
};

type ErrorType = {
  inner: ParamsType[];
  errors: string[];
};

const createValidationMiddleware = (schema: ValidationType) => {
  const validationMiddleware: Handler = async (req, res, next) => {
    try {
      const errors: Array<{
        path: string;
        message?: string;
        key?: string;
      }> = [];

      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      const keysRequest = {
        body: Object.keys(req.body),
        params: Object.keys(req.params),
        query: Object.keys(req.query),
      };

      Object.entries(schema).forEach(([key, value]) => {
        const arr = keysRequest[key as keyof typeof keysRequest];
        const diff = _.difference(arr, Object.keys(value));
        if (diff.length) {
          diff.forEach((item) => {
            errors.push({
              key: item,
              path: key,
              message: 'please delete entered field',
            });
          });
        }
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object(rootShape);
      await yupSchema.validate(req, { abortEarly: false })
        .catch((err: ErrorType) => {
          err.inner.forEach((item) => {
            const [path, key] = item.path.split('.');
            errors.push({
              message: item.errors.join(),
              path,
              key,
            });
          });
        });

      if (errors.length) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST, errorMessages.USER_INVALID_REQUEST, errors,
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};

export default createValidationMiddleware;
