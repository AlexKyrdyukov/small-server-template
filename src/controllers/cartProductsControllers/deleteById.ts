import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteById: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    const { bookId, cartId } = req.body;
    const { userId } = req.params;

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default deleteById;
