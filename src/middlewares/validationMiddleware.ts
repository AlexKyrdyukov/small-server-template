import type { Handler } from 'express';
import type * as yup from 'yup';

import type { OptionalObjectSchema } from 'yup/lib/object';

type SchemaType =
  OptionalObjectSchema<ValidationType>;

export type ValidationShemaType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema;
};
export type ValidationType = {
  body?: OptionalObjectSchema<ValidationShemaType>;
  query?: OptionalObjectSchema<ValidationShemaType>;
  params?: OptionalObjectSchema<ValidationShemaType>;
};

const generatorValidate = (schema: SchemaType): Handler => {
  return async (req, res, next) => {
    try {
      await schema
        .validate({
          body: req.body,
          query: req.query,
          params: req.params,
        });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default generatorValidate;
