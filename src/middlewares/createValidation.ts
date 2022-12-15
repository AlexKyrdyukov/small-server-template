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
    try {
      const error: Array<{
        field?: string[];
        message?: string[];
        errors?: string[];
      }> = [];

      const rootShape: Record<string, yup.AnyObjectSchema> = {};
      console.log(req.body);
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

      // if (arrKey.length) {
      //   error.push({
      //     field: arrKey,
      //     message: [`please deleted ${arrKey} field(s)`],
      //   });
      // }

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object(rootShape);
      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => error.push({
          errors: err.errors,
        }));

      if (arrKey.length) {
        error[0] = {
          field: arrKey,
          message: [`please deleted ${arrKey} field(s)`],
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
