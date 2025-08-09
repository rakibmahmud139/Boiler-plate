"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modulers/auth/auth.route");
const product_route_1 = require("../modulers/product/product.route");
const sales_route_1 = require("../modulers/sales/sales.route");
const cart_route_1 = require("../modulers/cart/cart.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/auth',
        route: auth_route_1.authRoute,
    },
    {
        path: '/',
        route: product_route_1.productRoute,
    },
    {
        path: '/',
        route: sales_route_1.saleRoute,
    },
    {
        path: '/',
        route: cart_route_1.cartRoute,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
