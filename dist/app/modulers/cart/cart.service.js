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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartServices = void 0;
const cart_model_1 = require("./cart.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const product_model_1 = require("../product/product.model");
const addProductIntoCart = (productId, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    payload.userEmail = user.email;
    payload.productId = productId;
    const result = yield cart_model_1.Cart.create(payload);
    return result;
});
const getCartProductFromDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query.userEmail && query.userEmail !== user.email) {
        throw new Error('You are not authorized user');
    }
    const productQuery = new queryBuilder_1.default(cart_model_1.Cart.find(), query).filter();
    const result = yield productQuery.modelQuery;
    return result;
});
const updateCartProductQuantityIntoDB = (cartProductId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndUpdate(cartProductId, {
        productQuantity: payload.productQuantity,
    }, { runValidators: true, new: true });
    return result;
});
const deleteCartFromDB = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndDelete(cartId);
    return result;
});
exports.cartServices = {
    addProductIntoCart,
    getCartProductFromDB,
    updateCartProductQuantityIntoDB,
    deleteCartFromDB,
};
