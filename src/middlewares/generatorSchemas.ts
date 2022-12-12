/* eslint-disable no-console */
// import { ValidationError } from 'yup';

import type { Handler } from 'express';
import * as yup from 'yup';

// import type * as yup from 'yup';

// import type { OptionalObjectSchema } from 'yup/lib/object';

// type SchemaType =
// OptionalObjectSchema<ValidationType>;

type ValidationShemaType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema;
};
type ValidationType = {
  body?: ValidationShemaType;
  query?: ValidationShemaType;
  params?: ValidationShemaType;
};
// export type ValidationType = {
// body?: OptionalObjectSchema<ValidationShemaType>;
// query?: OptionalObjectSchema<ValidationShemaType>;
// params?: OptionalObjectSchema<ValidationShemaType>;
// };

const generatorValidate = (schema: ValidationType) => {
  // return async (req, res, next) => {
  const errors: Array<{
    key: string;
    path: string;
    message: string;
    value: string;
    errors: string[];
    inner: [];
    name: string;
  }> = [];
  const validationMiddleware: Handler = (req, _res, next) => {
    try {
      const rootShape: Record<string, yup.AnyObjectSchema> = {};
      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
        const yupSchema = yup.object(rootShape);
        // eslint-disable-next-line no-console
        yupSchema.validate(req, { abortEarly: true })
          .then((_responseData) => {
            // eslint-disable-next-line no-console
            console.log('no errors');
            // eslint-disable-next-line no-console
            // console.log(responseData);
          })
          .catch((err) => {
            // console.log(err);
            console.log(err.name);
            // console.log(err.errors);
            errors.push(err);
          });
        // .catch((err) => {
        console.log('errorfrom catch', errors);
        // });
      });
      // eslint-disable-next-line no-console
      // console.log('eeeeeeeeeeeeeeeeeeeeee', errors);

      // if (errors.length) {
      // throw new ValidationError(errors);
      // }
      // eslint-disable-next-line no-console
      // const error: Array<{
      // key: string;
      // path: string;
      // message:string;
      // }> = [];
      next();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error');
      next(error);
    }
  };
  // eslint-disable-next-line no-console
  console.log(validationMiddleware, 'val');
  return validationMiddleware;
};

export default generatorValidate;
