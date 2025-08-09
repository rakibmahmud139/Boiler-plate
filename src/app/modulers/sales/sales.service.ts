import { Product } from '../product/product.model';
import { TSale } from './sales.interface';
import { Sale } from './sales.model';

const createSaleIntoDB = async (productId: string, payload: TSale) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (payload.quantityOfSold > product.productQuantity) {
    throw new Error('Insufficient quantity');
  }

  const sellProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: { productQuantity: -payload.quantityOfSold },
    },
    { new: true },
  );

  if ((sellProduct?.productQuantity as number) <= 0) {
    await Product.findByIdAndDelete(productId);
  }

  const result = await Sale.create(payload);

  return result;
};

const salesHistory = async (period: string) => {
  let result;

  if (period === 'daily') {
    result = await Sale.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$saleDate' },
          },
          totalSales: { $sum: '$quantityOfSold' },
        },
      },
    ]);
  }

  if (period === 'weekly') {
    result = await Sale.aggregate([
      {
        $group: {
          _id: {
            week: { $week: '$saleDate' },
          },
          totalSales: { $sum: '$quantityOfSold' },
        },
      },
    ]);
  }

  if (period === 'monthly') {
    result = await Sale.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$saleDate' },
          },
          totalSales: { $sum: '$quantityOfSold' },
        },
      },
    ]);
  }

  if (period === 'yearly') {
    result = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
          },
          totalSales: { $sum: '$quantityOfSold' },
        },
      },
    ]);
  }

  return result;
};

export const salesServices = {
  createSaleIntoDB,
  salesHistory,
};
