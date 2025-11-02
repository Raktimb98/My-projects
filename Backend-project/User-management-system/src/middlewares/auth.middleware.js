import { ApiError } from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    (req.headers('Authorization')?.startsWith('Bearer ')
      ? req.headers('Authorization').slice(7)
      : null);

  if (!token) {
    return next(
      new ApiError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const userId = decodedToken.id || decodedToken._id;
  const currentUser = await User.findById(userId).select(
    '-password -refreshToken'
  );
  if (!currentUser) {
    return next(
      new ApiError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  req.user = currentUser;
  next();
});
