import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (user: JwtPayload, payload: TProduct) => {
  payload.userEmail = user.email;

  const result = await Product.create(payload);

  return result;
};

const getAllProductFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  if (query.userEmail && query.userEmail !== user.email) {
    throw new Error('You are not authorized user');
  }

  const productQuery = new QueryBuilder(Product.find(), query).filter();
  const result = await productQuery.modelQuery;
  return {
    products: result,
  };
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);

  return result;
};

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    runValidators: true,
    new: true,
  });

  return result;
};

const duplicateProduct = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const duplicateData = {
    productName: payload.productName,
    productPrice: payload.productPrice,
    productQuantity: payload.productQuantity,
    image: payload.image,
    modelNumber: payload.modelNumber,
    brand: payload.brand,
    category: payload.category,
    userEmail: payload.userEmail,
    connectivity: payload.connectivity,
    powerSource: payload.powerSource,
  };

  const result = await Product.create(duplicateData);

  return result;
};

const deleteManyProductsFromDB = async (productIds: Types.ObjectId[]) => {
  const result = await Product.deleteMany({ _id: { $in: productIds } });

  return result;
};

const deleteSingleProductsFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);

  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  duplicateProduct,
  deleteManyProductsFromDB,
  deleteSingleProductsFromDB,
};
