"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../errorHandler/zodErrorHandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const validationErrorHandler_1 = __importDefault(require("../errorHandler/validationErrorHandler"));
const duplicateErrorHandler_1 = __importDefault(require("../errorHandler/duplicateErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500 || err.statusCode;
    let message = 'some thing went wrong';
    let errorMessage = '';
    let errorDetails = {};
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, zodErrorHandler_1.default)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorMessage = zodError.errorMessage;
        errorDetails = zodError.errorDetails;
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        const validationError = (0, validationErrorHandler_1.default)(err);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorMessage = validationError.errorMessage;
        errorDetails = validationError.errorDetails;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const duplicateError = (0, duplicateErrorHandler_1.default)(err);
        statusCode = duplicateError.statusCode;
        message = duplicateError.message;
        errorMessage = duplicateError.errorMessage;
        errorDetails = duplicateError.errorDetails;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: errorDetails,
    });
};
exports.globalErrorHandler = globalErrorHandler;
