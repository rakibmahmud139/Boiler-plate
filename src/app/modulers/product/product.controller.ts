import { catchAsync } from '../../utils/catchAsync';
import { productServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await productServices.createProductIntoDB(user, req.body);
  res.status(201).json({
    success: true,
    message: 'product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const result = await productServices.getAllProductFromDB(user, query);

  res.status(200).json({
    success: true,
    message: 'product retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productServices.getSingleProductFromDB(productId);

  res.status(200).json({
    success: true,
    message: 'Single product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productServices.updateProductIntoDB(productId, req.body);

  res.status(200).json({
    success: true,
    message: 'product updated successfully',
    data: result,
  });
});

const duplicateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productServices.duplicateProduct(productId, req.body);

  res.status(200).json({
    success: true,
    message: 'product duplicate successfully',
    data: result,
  });
});

const deleteManyProduct = catchAsync(async (req, res) => {
  const { productIds } = req.body;
  await productServices.deleteManyProductsFromDB(productIds);

  res.status(200).json({
    success: true,
    message: 'products deleted successfully',
    data: null,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  await productServices.deleteSingleProductsFromDB(productId);

  res.status(200).json({
    success: true,
    message: 'product deleted successfully',
    data: null,
  });
});

export const productControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  duplicateProduct,
  deleteManyProduct,
  deleteSingleProduct,
};
