import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import hash from "../../utils/hash.js";
import { User } from "./user.model.js";

const registerUser = asyncHandler(async (req, res) => {

  const { username, password, contact, email } = req.body;

  if (!username || !password || !email || !contact) {
    throw new ApiError(400, "All the fields are required.")
  }

  const existingUser = await User.findOne({
    $or: [{ email, contact }]
  })

  if (existingUser) {
    throw new ApiError(409, "User with this email or number already exist.")
  }

  const hashedPassword = hash(password, 10);
  await User.create({ username, password: hashedPassword, contact, email })

  return res.json(new ApiResponse(200, {}, "User Registered Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {

  const { contact, password } = req.body;
  console.log(contact, password)

  if (!contact || !password) {
    throw new ApiError(400, "All the fields are necessary");
  }

  // when the contact number 

  const user = await User.findOne({ contact })
  console.log(user)
  if (!user) {
    throw new ApiError(404, "User not found.")
  }

  const isPasswordCorrect = hash.compare(password, user.password)

  if (!isPasswordCorrect) throw new ApiError(402, "Password is incorrect.")
  // token generation and stuff
  return res.json(new ApiResponse(200, {}, "Login successfully"))
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


export const userControllers = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword
};
