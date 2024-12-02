import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

// Error handling middleware
export const errorHandler = (
  err,
  _,
  res,
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      errors: [err.message],
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
};


