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
exports.productServices = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const product_model_1 = require("./product.model");
const createProductIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userEmail = user.email;
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProductFromDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (query.userEmail && query.userEmail !== user.email) {
        throw new Error('You are not authorized user');
    }
    const productQuery = new queryBuilder_1.default(product_model_1.Product.find(), query).filter();
    const result = yield productQuery.modelQuery;
    return {
        products: result,
    };
});
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
const updateProductIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, payload, {
        runValidators: true,
        new: true,
    });
    return result;
});
const duplicateProduct = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(productId);
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
    const result = yield product_model_1.Product.create(duplicateData);
    return result;
});
const deleteManyProductsFromDB = (productIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteMany({ _id: { $in: productIds } });
    return result;
});
const deleteSingleProductsFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.productServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    duplicateProduct,
    deleteManyProductsFromDB,
    deleteSingleProductsFromDB,
};
