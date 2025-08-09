"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post('/cart/add-cart/:productId', (0, auth_1.auth)('manager', 'salesman'), cart_controller_1.cartControllers.addProductIntoCart);
router.get('/cart/my-cart', (0, auth_1.auth)('manager', 'salesman'), cart_controller_1.cartControllers.getCartProduct);
router.patch('/cart/update-cart-quantity/:productId', (0, auth_1.auth)('manager', 'salesman'), cart_controller_1.cartControllers.updateCartProductQuantity);
router.delete('/cart/:id', (0, auth_1.auth)('manager', 'salesman'), cart_controller_1.cartControllers.deleteCart);
exports.cartRoute = router;
