import { Router } from 'express';
import { v1 } from 'uuid';
import data from '../data';
import { findItem } from './utils';
import { productNameValidator } from '../middleware/productNameValidator';

export const productsRouter = Router();

const findProduct = findItem('products');

productsRouter.get('/', (req, res) => {
  res.status(200).send(data.products);
});

productsRouter.get('/:id', findProduct, (req, res) => {
  res.status(200).send(res.locals.item);
});

productsRouter.post('/', productNameValidator, (req, res) => {
  const newProduct = {
    ...req.body,
    id: v1(),
  };
  data.products.push(newProduct);
  res.status(201).send(newProduct);
});

productsRouter.put('/:id', productNameValidator, findProduct, (req, res) => {
  const idx = res.locals.itemIdx;
  if (req.body) {
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
