import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import hash from "../../utils/hash.js";
import { User } from "../auth/auth.model.js"


const registerUser = asyncHandler(async (req, res) => {

  const { username, password, contact, email, currentUser } = req.body;

  if (!username || !password || !email || !contact) {
    throw new ApiError(400, "All the fields are required.")
  }

  const existingUser = await User.findOne({ contact })
  if (existingUser) {
    throw new ApiError(409, "User with this email or number already exist.")
  }
  const hashedPassword = await hash.generate(password, 12);

  await User.create({ username, password: hashedPassword, role: currentUser, contact, email })

  return res.json(new ApiResponse(200, {}, "User Registered Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {

  const { contact, password } = req.body;
  if (!contact || !password) {
    throw new ApiError(400, "All the fields are necessary");
  }
  const user = await User.findOne({ contact })
  if (!user) {
    throw new ApiError(404, "User not found.")
  }
  const isPasswordCorrect = await hash.compare(password, user.password)
  if (!isPasswordCorrect) throw new ApiError(statusCodes.unauthorized, "Password is incorrect.")

  return res.json(new ApiResponse(200, { user }, "Login successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {

  return res.json(new ApiResponse(201, {}, "Logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  return res.json(new ApiResponse(201, {}, "Tokens refreshed successfully "))
})

const forgotPassword = asyncHandler(async (req, res) => {
  return res.json(201, {}, "Password changed successfully")
  // logout user
})


export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword
}; 
