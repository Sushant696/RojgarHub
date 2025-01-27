import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, _, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    console.log(err);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      success: false,
      message: [err.message] | "An unexpected error occurred",
      errors: [err.message],
    });
  }
};
