/* eslint-disable no-console */
import type { Handler } from 'express';
import _ from 'lodash';
import * as yup from 'yup';

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
        key: string[];
        path?: string;
        message: string;
        value: string;
        errors: string[];
        inner: yup.ValidationError[];
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

      const arrKey = _.difference(keysRequest, keysSchema);

      if (arrKey.length) {
        errors.push({
          key: arrKey,
          errors: [`please delete ${arrKey} field for validation your data`],
          path: `${arrKey}`,
          value: 'err.value',
          inner: [],
          name: 'ValidationError',
          message: `please delete field ${arrKey} for correct request`,
        });
        throw new yup.ValidationError(errors);
      }

      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object(rootShape);

      await yupSchema.validate(req, { abortEarly: false })
        .catch((err) => errors.push({
          key: ['null'],
          errors: err.errors,
          path: err.path,
          value: err.value,
          inner: err.inner,
          message: 'error validation',
          name: err.name,
        }));
      if (errors.length) {
        throw new yup.ValidationError(errors);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  return validationMiddleware;
};

export default createValidationMiddleware;
