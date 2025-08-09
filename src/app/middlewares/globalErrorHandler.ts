/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod';
import zodErrorHandle from '../errorHandler/zodErrorHandler';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import validationErrorHandle from '../errorHandler/validationErrorHandler';
import duplicateErrorHandle from '../errorHandler/duplicateErrorHandler';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500 || err.statusCode;
  let message = 'some thing went wrong';
  let errorMessage = '';
  let errorDetails = {};

  if (err instanceof ZodError) {
    const zodError = zodErrorHandle(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorMessage = zodError.errorMessage;
    errorDetails = zodError.errorDetails;
  } else if (err instanceof mongoose.Error.ValidationError) {
    const validationError = validationErrorHandle(err);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessage = validationError.errorMessage;
    errorDetails = validationError.errorDetails;
  } else if (err?.code === 11000) {
    const duplicateError = duplicateErrorHandle(err);
    statusCode = duplicateError.statusCode;
    message = duplicateError.message;
    errorMessage = duplicateError.errorMessage;
    errorDetails = duplicateError.errorDetails;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: errorDetails,
  });
};
