import { JwtPayload } from 'jsonwebtoken';
import { Cart } from './cart.model';
import QueryBuilder from '../../builder/queryBuilder';
import { Product } from '../product/product.model';
import { TCart } from './cart.interface';

const addProductIntoCart = async (
  productId: string,
  user: JwtPayload,
  payload: TCart,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  payload.userEmail = user.email;
  payload.productId = productId;

  const result = await Cart.create(payload);

  return result;
};

const getCartProductFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  if (query.userEmail && query.userEmail !== user.email) {
    throw new Error('You are not authorized user');
  }

  const productQuery = new QueryBuilder(Cart.find(), query).filter();
  const result = await productQuery.modelQuery;
  return result;
};

const updateCartProductQuantityIntoDB = async (
  cartProductId: string,
  payload: { productQuantity: number },
) => {
  const result = await Cart.findByIdAndUpdate(
    cartProductId,
    {
      productQuantity: payload.productQuantity,
    },
    { runValidators: true, new: true },
  );

  return result;
};

const deleteCartFromDB = async (cartId: string) => {
  const result = await Cart.findByIdAndDelete(cartId);

  return result;
};

export const cartServices = {
  addProductIntoCart,
  getCartProductFromDB,
  updateCartProductQuantityIntoDB,
  deleteCartFromDB,
};
