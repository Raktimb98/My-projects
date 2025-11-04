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

export {
    generateAccessTokenAndRefreshToken
}