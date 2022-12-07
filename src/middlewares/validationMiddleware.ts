import { ValidationError } from 'yup';
import type { Request, Response, NextFunction } from 'express';
import type { SchemaType } from '../validationSchemas/userSchemas';

const validate = (schema: SchemaType) => async (
  req: Request, res: Response, next: NextFunction,
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: 'please enter correctly data' });
    }
    res.status(400).json({ message: 'please enter correctly data' });
  }
};

export default validate;
