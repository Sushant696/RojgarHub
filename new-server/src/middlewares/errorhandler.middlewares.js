import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, _, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || responseMessage.OTHER.SERVER_ERROR;

    err = new ApiError(statusCode, message);
  }

  return res.status(err.statusCode).json({ message: err.message });
};
