import { Router } from 'express';
import { v1 } from 'uuid';
import data from '../data';
import { findItem } from './utils';

export const productsRouter = Router();

const findProduct = findItem('products');

productsRouter.get('/', (req, res) => {
  res.status(200).send(data.products);
});

productsRouter.get('/:id', findProduct, (req, res) => {
  res.status(200).send(res.locals.item);
});

productsRouter.post('/', (req, res) => {
  if (req.body && req.body.name && req.body.name.length >= 3) {
    const newProduct = {
      ...req.body,
      id: v1(),
    };
    data.products.push(newProduct);
    return res.status(201).send(newProduct);
  }
  res.sendStatus(400);
});

productsRouter.put('/:id', findProduct, (req, res) => {
  const idx = res.locals.itemIdx;
  if (req.body) {
    if (req.body.name && req.body.name.length < 3) {
      return res.sendStatus(400);
    }
    data.products[idx] = {
      ...data.products[idx],
      ...req.body,
    };
    return res.status(200).send(data.products[idx]);
  }
  res.sendStatus(400);
});

productsRouter.delete('/:id', findProduct, (req, res) => {
  data.products.splice(res.locals.itemIdx, 1);
  res.sendStatus(204);
});
