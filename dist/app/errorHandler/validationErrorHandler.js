"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationErrorHandle = (err) => {
    const statusCode = 400;
    const message = 'Validation error';
    const errorMessage = Object.values(err.errors)
        .map((issue) => issue.message)
        .join('. ');
    const issues = err.errors;
    const errorDetails = {
        issues,
        name: err.name,
    };
    return {
        statusCode,
        message,
        errorMessage,
        errorDetails,
    };
};
exports.default = validationErrorHandle;
