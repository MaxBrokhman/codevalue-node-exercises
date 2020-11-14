import { Router } from 'express';
import { v1 } from 'uuid';
import data from '../data';
import { findItem } from './utils';

export const categoriesRouter = Router();

const findCategory = findItem('categories');

categoriesRouter.get('/', (req, res) => {
  res.status(200).send(data.categories);
});

categoriesRouter.get('/:id', findCategory, (req, res) => {
  res.status(200).send(res.locals.item);
});

categoriesRouter.get('/:id/products', findCategory, (req, res) => {
  const category = res.locals.item;
  const products = data.products.filter((product) => product.categoryId === category.id);
  res.status(200).send(products);
});

categoriesRouter.post('/', (req, res) => {
  if (req.body && req.body.name) {
    const newCategory = {
      ...req.body,
      id: v1(),
    };
    data.categories.push(newCategory);
    return res.status(201).send(newCategory);
  }
  res.sendStatus(400);
});

categoriesRouter.put('/:id', findCategory, (req, res) => {
  const idx = res.locals.itemIdx;
  if (req.body && req.body.name) {
    data.categories[idx] = {
      ...data.categories[idx],
      name: req.body.name,
    };
    return res.status(200).send(data.categories[idx]);
  }
  res.sendStatus(400);
});

categoriesRouter.delete('/:id', findCategory, (req, res) => {
  data.categories.splice(res.locals.itemIdx, 1);
  res.sendStatus(204);
});
