import express from 'express';
import { productsRouter } from './routes/products';
import { categoriesRouter } from './routes/categories';

export const app = express();
app.use(express.json());
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.listen(3000, () => console.log('Server is up!'));
