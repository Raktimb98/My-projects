import { asyncHandler } from '../Utils/asyncHandler.js';
import apiError from '../Utils/apiError.js';
import { User } from '../Models/User/user.models.js';
import { uploadToCloudinary } from '../Utils/cloudinary.js';
import ApiResponse from '../Utils/apiResponse.js';

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, 'Error generating tokens');
  }
};

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
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User created successfully'));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  //TODO: Get user details from frontend
  //TODO: validation - not empty(username, email, password)
  //TODO: check if user already exists (NOTE: Check with username or email)
  //TODO: Check for password correctness
  //TODO: Generate accessToken and refreshToken
  //TODO: Send secure cookies (NOTE: refreshToken)

  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new apiError(400, 'Username or Email is required to login');
  }
  if (!password) {
    throw new apiError(400, 'Password is required to login');
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new apiError(404, 'User not found, Invalid login credentials');
  }
  const isPasswordValid = await user.comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new apiError(401, 'Invalid login credentials');
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged in successfully'
      )
    );
});

export { registerUser, loginUser };
