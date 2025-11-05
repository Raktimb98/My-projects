import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import apiResponse from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new apiError(404, 'User not found');
    }
    if (
      typeof user.generateAccessToken !== 'function' ||
      typeof user.generateRefreshToken !== 'function'
    ) {
      throw new apiError(500, 'User token methods not defined on model');
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
    return { user };
  } catch (error) {
    throw new apiError(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

const validateRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      // 400: missing token
      return next(apiError(400, 'Refresh token is required'));
    }

    // Decode & verify token validity and expiration
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    } catch (error) {
      // Handle expired/invalid token
      if (error.name === 'TokenExpiredError') {
        return next(apiError(401, 'Refresh token expired'));
      }
      return next(apiError(401, 'Invalid refresh token'));
    }

    const userId = decoded.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(apiError(400, 'Invalid user ID in token'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(apiError(404, 'User not found'));
    }

    // If using single active refresh token per user:
    if (user.refreshToken !== refreshToken) {
      return next(apiError(401, 'Refresh token does not match'));
    }

    req.user = user;
    next();
  } catch (error) {
    // 500: Server-side error
    console.error('[validateRefreshToken]', error);
    next(apiError(500, 'Something went wrong while validating refresh token'));
  }
};

export { generateAccessTokenAndRefreshToken, validateRefreshToken };
