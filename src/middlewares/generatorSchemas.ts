import { StatusCodes } from 'http-status-codes';
/* eslint-disable no-console */
import _ from 'lodash';

import * as yup from 'yup';
import type { Handler } from 'express';

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
      const errors: Array<{
        key?: Array<string> | undefined;
        path: Array<string> | string;
        message: string;
        value: string;
        errors: string[];
        inner: yup.ValidationError[] | undefined;
        name: string;
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
      console.log(keysRequest, keysSchema);
      const arrKey = _.difference(keysRequest, keysSchema);
      console.log(arrKey);
      if (arrKey.length) {
        errors.push({
          key: arrKey,
          errors: ['errors'],
          path: arrKey,
          value: 'err.value',
          inner: undefined,
          name: 'err.name',
          message: `please delete field ${arrKey} for correct request`,
        });
        throw new yup.ValidationError({errors}, 'value', 'path');
      }
      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });
      const yupSchema = yup.object(rootShape);
      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => errors.push({
          errors: err.errors,
          path: err.path,
          value: err.value,
          inner: err.inner,
          name: err.name,
          message: err.meassage,
        }));
      if (errors.length) {
        console.log('errlength try error', errors);
        throw new yup.ValidationError(errors, 'value', 'path');
      }
      next();
    } catch (error) {
      console.log('err error');
      next(error);
    }
  };

  return validationMiddleware;
};

export default createValidationMiddleware;
