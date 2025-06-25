import express from 'express';

import {
  getAllProducts,
  addProduct,
  getProductById,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', addProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;
