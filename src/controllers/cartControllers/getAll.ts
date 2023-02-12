import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.body, req.params, req.query);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default getAll;
