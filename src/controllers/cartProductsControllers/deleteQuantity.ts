import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteQuantity: HandlerType = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { bookId, cartId } = req.query;

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default deleteQuantity;
