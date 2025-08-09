"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const duplicateErrorHandle = (err) => {
    const statusCode = 400;
    const message = 'duplicate error';
    let errorMessage = '';
    const match = err.message.match(/"(.*?)"/);
    if (match) {
        errorMessage = match[1];
    }
    const errorDetails = err;
    return {
        statusCode,
        message,
        errorMessage,
        errorDetails,
    };
};
exports.default = duplicateErrorHandle;
