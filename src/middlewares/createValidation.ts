/* eslint-disable no-console */
import type { Handler } from 'express';
import * as yup from 'yup';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../exceptions/CustomError';
import errorText from '../utils/consts/error';

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
    type ParamsType = {
      path: string;
    };
    try {
      const error: Array<{
        field?: string[];
        message?: string[];
        errors?: string[];
        inner?: ParamsType[];
        path?: string[];
      }> = [];

      const rootShape: Record<string, yup.AnyObjectSchema> = {};
      const keysRequest = [
        ...Object.keys(req.body),
        ...Object.keys(req.params),
        ...Object.keys(req.query),
      ];

      const keysSchema = [
        ...Object.keys(schema.body ? schema.body : {}),
        ...Object.keys(schema.params ? schema.params : {}),
        ...Object.keys(schema.query ? schema.query : {}),
      ];

      const arrKey = _.difference(keysRequest, keysSchema);

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });
      const yupSchema = yup.object(rootShape);

      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => error.push({
          errors: err.errors,
          inner: err.inner,
        }));

      if (arrKey.length) {
        error[error.length] = {
          field: arrKey,
          message: [`please deleted ${arrKey} field(s)`],
        };
      }

      if (error.length) {
        error[0].path = error[0].inner.map((item) => item.path);
        delete error[0].inner;
        throw new CustomError(StatusCodes.BAD_REQUEST, errorText.USER_INVALID_REQUEST, error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};

export default createValidationMiddleware;
