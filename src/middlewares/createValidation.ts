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

type ParamsType = {
  path: string;
};

type ErrorType = {
  inner: ParamsType[];
  errors: string[];
};
const createValidationMiddleware = (schema: ValidationType) => {
  const validationMiddleware: Handler = async (req, res, next) => {
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

      const invalidFields = _.difference(keysRequest, keysSchema);

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });
      const yupSchema = yup.object(rootShape);

      const handleError = (err: ErrorType) => {
        error[0] = {
          ...error[0],
          errors: err.errors,
          inner: err.inner,
        };
        error[0].path = error[0].inner.map((item) => item.path);
        delete error[0].inner;
      };

      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => handleError(err));

      if (invalidFields.length) {
        error[0] = {
          ...error[0],
          field: invalidFields,
          message: [`please deleted ${invalidFields} field(s)`],
        };
      }

      if (error.length) {
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
