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
exports.cartControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const cart_service_1 = require("./cart.service");
const addProductIntoCart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const user = req.user;
    const result = yield cart_service_1.cartServices.addProductIntoCart(productId, user, req.body);
    res.status(201).json({
        success: true,
        message: 'product created successfully',
        data: result,
    });
}));
const getCartProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const user = req.user;
    const result = yield cart_service_1.cartServices.getCartProductFromDB(user, query);
    res.status(200).json({
        success: true,
        message: 'My cart product retrieved successfully',
        data: result,
    });
}));
const updateCartProductQuantity = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield cart_service_1.cartServices.updateCartProductQuantityIntoDB(productId, req.body);
    res.status(200).json({
        success: true,
        message: 'Update cart product quantity successfully',
        data: result,
    });
}));
const deleteCart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    yield cart_service_1.cartServices.deleteCartFromDB(cartId);
    res.status(200).json({
        success: true,
        message: 'cart deleted successfully',
        data: null,
    });
}));
exports.cartControllers = {
    addProductIntoCart,
    getCartProduct,
    updateCartProductQuantity,
    deleteCart,
};
