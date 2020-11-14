import { Request, Response, NextFunction } from 'express';
import data from '../data';

export const findItem = (name: keyof typeof data) => (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  const itemIdx = data[name].findIndex((item) => item.id === id);
  if (itemIdx === -1) {
    res.sendStatus(404);
    return;
  }
  res.locals.item = data[name][itemIdx];
  res.locals.itemIdx = itemIdx;
  next();
};
