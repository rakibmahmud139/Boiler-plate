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
exports.productControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield product_service_1.productServices.createProductIntoDB(user, req.body);
    res.status(201).json({
        success: true,
        message: 'product created successfully',
        data: result,
    });
}));
const getAllProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const user = req.user;
    const result = yield product_service_1.productServices.getAllProductFromDB(user, query);
    res.status(200).json({
        success: true,
        message: 'product retrieved successfully',
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const result = yield product_service_1.productServices.getSingleProductFromDB(productId);
    res.status(200).json({
        success: true,
        message: 'Single product retrieved successfully',
        data: result,
    });
}));
const updateProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const result = yield product_service_1.productServices.updateProductIntoDB(productId, req.body);
    res.status(200).json({
        success: true,
        message: 'product updated successfully',
        data: result,
    });
}));
const duplicateProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const result = yield product_service_1.productServices.duplicateProduct(productId, req.body);
    res.status(200).json({
        success: true,
        message: 'product duplicate successfully',
        data: result,
    });
}));
const deleteManyProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds } = req.body;
    yield product_service_1.productServices.deleteManyProductsFromDB(productIds);
    res.status(200).json({
        success: true,
        message: 'products deleted successfully',
        data: null,
    });
}));
const deleteSingleProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    yield product_service_1.productServices.deleteSingleProductsFromDB(productId);
    res.status(200).json({
        success: true,
        message: 'product deleted successfully',
        data: null,
    });
}));
exports.productControllers = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    duplicateProduct,
    deleteManyProduct,
    deleteSingleProduct,
};
