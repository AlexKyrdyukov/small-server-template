// import type { AnyObject, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { ValidationError } from 'yup';
import type { Handler } from 'express';
// import type { RequiredDateSchema } from 'yup/lib/date';
import type { RequiredStringSchema } from 'yup/lib/string';

type UserSchemaType =
  OptionalObjectSchema<{
    body: OptionalObjectSchema<{
      fullName?: RequiredStringSchema<string, AnyObject>;
      email?: RequiredStringSchema<string, AnyObject>;
      password?: RequiredStringSchema<string, AnyObject>;
      dob?: RequiredStringSchema<string, AnyObject>;
    }>;
  }>;

export type ValidationSheasType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema | yup.AnyObjectSchema;
};
export type ValidationType = {
  body?: ValidationSheasType;
  query?: ValidationSheasType;
  params?: ValidationSheasType;
};

const generatorValidate = (schema: UserSchemaType): Handler => {
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
      if (error instanceof ValidationError) {
        // return res.status(400).json({ message: 'please enter correctly data' });
        next(error);
      }

      next(error);
    }
  };
};

export default generatorValidate;
