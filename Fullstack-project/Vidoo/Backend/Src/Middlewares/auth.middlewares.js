// src/Middlewares/auth.middlewares.js
import ApiError from '../Utils/apiError.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../Models/User/user.models.js';

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // 1) Read token from cookie or Bearer header (unchanged behavior, just robust slice)
  const token =
    req.cookies?.accessToken ||
    (req.header('Authorization')?.startsWith('Bearer ')
      ? req.header('Authorization').slice(7)
      : null);

  if (!token) {
    throw new ApiError(401, 'Unauthorized: No token provided');
  }

  // 2) Verify token
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // 3) Use id from payload signed in the model; fallback to _id if older tokens exist
  const userId = decodedToken.id || decodedToken._id;
  const user = await User.findById(userId).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(401, 'Unauthorized: User not found');
  }

  // 4) Attach and continue
  req.user = user;
  next();
});
