import { Response } from 'express';

export const validationErrorHandler = (error: Error, res: Response, code = 400): void => {
  res.status(code).send(error.message);
};
