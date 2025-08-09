"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const sales_controller_1 = require("./sales.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const sales_validation_1 = require("./sales.validation");
const router = express_1.default.Router();
router.post('/sale/:id', (0, auth_1.auth)('manager', 'salesman'), (0, validationRequest_1.validationRequest)(sales_validation_1.salesValidation.salesValidationSchema), sales_controller_1.saleControllers.createSale);
router.get('/sale/history/:period', (0, auth_1.auth)('manager', 'salesman'), sales_controller_1.saleControllers.salesHistory);
exports.saleRoute = router;
