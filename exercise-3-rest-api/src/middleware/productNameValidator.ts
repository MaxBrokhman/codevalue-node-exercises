import { Request, Response, NextFunction } from 'express';
import { validationErrorHandler } from './validationErrorHandler';

export const productNameValidator = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && req.body.name && req.body.name.length < 3) {
    return validationErrorHandler(new Error('Name must be at least 3 characters long'), res);
  }
  next();
};
