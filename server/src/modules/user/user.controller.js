import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("register user")
  return res.json(new ApiResponse(200, {}, "User Registered Successfully"))

})

export const userControllers = {
  registerUser,
};
