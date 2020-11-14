import { v1 } from 'uuid';
import products from './products.json';
import categories from './categories.json';

const productsWithId = products.map((item) => ({
  ...item,
  id: v1(),
}));

export default {
  products: productsWithId,
  categories,
};
