import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  accessToken: string;
  refreshToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getToken: HandlerType = (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
};

export default getToken;
