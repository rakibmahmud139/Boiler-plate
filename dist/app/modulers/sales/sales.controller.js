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
exports.saleControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sales_service_1 = require("./sales.service");
const createSale = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const result = yield sales_service_1.salesServices.createSaleIntoDB(productId, req.body);
    res.status(201).json({
        success: true,
        message: 'Sale Successfully',
        data: result,
    });
}));
const salesHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period } = req.params;
    const result = yield sales_service_1.salesServices.salesHistory(period);
    res.status(200).json({
        success: true,
        message: 'Sales history retrieved Successfully',
        data: result,
    });
}));
exports.saleControllers = {
    createSale,
    salesHistory,
};
