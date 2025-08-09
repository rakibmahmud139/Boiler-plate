"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandle = (err) => {
    const statusCode = 400;
    const message = 'Validation error';
    const error = err.message;
    const errorStr = JSON.parse(error);
    const errorMs = errorStr
        .map((er) => `${er.path[1]} is ${er.message}`)
        .join('. ');
    const errorMessage = errorMs;
    const issues = err.issues;
    const errorDetails = { issues, name: err.name };
    return {
        statusCode,
        message,
        errorMessage,
        errorDetails,
    };
};
exports.default = zodErrorHandle;
