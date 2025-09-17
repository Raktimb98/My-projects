import { asyncHandler } from '../Utils/asyncHandler.js';
import apiError from '../Utils/apiError.js';
import { User } from '../Models/User/user.models.js';
import { uploadToCloudinary } from '../Utils/cloudinary.js';
import ApiResponse from '../Utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  //* These are logic building.
  //TODO: Get user details from frontend
  //TODO: validation - not empty
  //TODO: check if user already exists (NOTE: Check with username or email)
  //TODO: Check for images ,avatar
  //TODO: Upload them to cloudinary (NOTE: Avatar)
  //TODO: Create user object - Create entry in db
  //FIXME: Remove password and refresh token field from response
  //TODO: Check for user creation
  //TODO: Send response

  const { username, email, fullname, password } = req.body;
  console.log(
    'Username:',
    username,
    'Email:',
    email,
    'Fullname:',
    fullname,
    'Password:',
    password
  );
  if ([username, email, fullname, password].includes('')) {
    throw new apiError(400, 'All fields are required');
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, 'User already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, 'Avatar is required');
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new apiError(500, 'Error uploading avatar');
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    username: username.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new apiError(500, 'Something went wrong from server side');
  }
  return res.status(201).json(
    new ApiResponse(201, createdUser, 'User created successfully')
  )
});

export default registerUser;
