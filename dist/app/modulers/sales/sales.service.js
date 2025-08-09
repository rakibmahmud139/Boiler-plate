"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesServices = void 0;
const product_model_1 = require("../product/product.model");
const sales_model_1 = require("./sales.model");
const createSaleIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    if (payload.quantityOfSold > product.productQuantity) {
        throw new Error('Insufficient quantity');
    }
    const sellProduct = yield product_model_1.Product.findByIdAndUpdate(productId, {
        $inc: { productQuantity: -payload.quantityOfSold },
    }, { new: true });
    if ((sellProduct === null || sellProduct === void 0 ? void 0 : sellProduct.productQuantity) <= 0) {
        yield product_model_1.Product.findByIdAndDelete(productId);
    }
    const result = yield sales_model_1.Sale.create(payload);
    return result;
});
const salesHistory = (period) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (period === 'daily') {
        result = yield sales_model_1.Sale.aggregate([
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
        result = yield sales_model_1.Sale.aggregate([
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
        result = yield sales_model_1.Sale.aggregate([
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
        result = yield sales_model_1.Sale.aggregate([
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
});
exports.salesServices = {
    createSaleIntoDB,
    salesHistory,
};
