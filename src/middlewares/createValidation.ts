/* eslint-disable no-console */
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import type { Handler } from 'express';

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

      const textMessage = '';

      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      const keysRequest = {
        body: Object.keys(req.body),
        params: Object.keys(req.params),
        query: Object.keys(req.query),
      };

      const keysSchema = {
        body: Object.keys(schema.body || {}),
        params: Object.keys(schema.params || {}),
        query: Object.keys(schema.query || {}),
      };
      console.log(Object.entries(keysSchema));
      Object.entries(keysRequest).forEach(([key, value]) => {
        
        value.filter((item) => console.log(item));
      });
      const objReq = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
        // console.log([value]);
      });

      const yupSchema = yup.object(rootShape);
      await yupSchema.validate(req, { abortEarly: false })
        .catch((err: ErrorType) => {
          err.inner.forEach((item) => {
            const [path, key] = item.path.split('.');
            errors.push({
              // eslint-disable-next-line max-len
              message: item.errors.join(), // because in the "errors" array the property message type is described as a string
              path,
              key,
            });
          });
        });

      // if (invalidKeys.length) {
      // const keys = invalidKeys.join(', ');
      // textMessage = `Please delete from request next keys: ${keys}`;
      // }

      if (errors.length) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST, errorText.USER_INVALID_REQUEST, { textMessage, errors },
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
