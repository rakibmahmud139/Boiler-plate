import { catchAsync } from '../../utils/catchAsync';
import { cartServices } from './cart.service';

const addProductIntoCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  const result = await cartServices.addProductIntoCart(
    productId,
    user,
    req.body,
  );
  res.status(201).json({
    success: true,
    message: 'product created successfully',
    data: result,
  });
});

const getCartProduct = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const result = await cartServices.getCartProductFromDB(user, query);

  res.status(200).json({
    success: true,
    message: 'My cart product retrieved successfully',
    data: result,
  });
});

const updateCartProductQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await cartServices.updateCartProductQuantityIntoDB(
    productId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Update cart product quantity successfully',
    data: result,
  });
});

const deleteCart = catchAsync(async (req, res) => {
  const cartId = req.params.id;
  await cartServices.deleteCartFromDB(cartId);

  res.status(200).json({
    success: true,
    message: 'cart deleted successfully',
    data: null,
  });
});

export const cartControllers = {
  addProductIntoCart,
  getCartProduct,
  updateCartProductQuantity,
  deleteCart,
};
