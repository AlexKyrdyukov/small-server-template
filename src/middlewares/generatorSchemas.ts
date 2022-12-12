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

const generatorValidate = (schema: ValidationType): Handler => {
  return async (req, res, next) => {
    try {
      const rootShape: Record<string, yup.AnyObjectSchema> = {};
      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
        const yupSchema = yup.object(rootShape);
        yupSchema.validate(req, { abortEarly: true })
          // .catch((err) => {
          // eslint-disable-next-line no-console
            // console.log('errorfrom catch', err);
          // });
      });
      // eslint-disable-next-line no-console
      // const errors: Array<{
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
};

export default generatorValidate;
