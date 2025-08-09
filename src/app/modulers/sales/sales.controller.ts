import { catchAsync } from '../../utils/catchAsync';
import { salesServices } from './sales.service';

const createSale = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await salesServices.createSaleIntoDB(productId, req.body);

  res.status(201).json({
    success: true,
    message: 'Sale Successfully',
    data: result,
  });
});

const salesHistory = catchAsync(async (req, res) => {
  const { period } = req.params;
  const result = await salesServices.salesHistory(period);

  res.status(200).json({
    success: true,
    message: 'Sales history retrieved Successfully',
    data: result,
  });
});

export const saleControllers = {
  createSale,
  salesHistory,
};
