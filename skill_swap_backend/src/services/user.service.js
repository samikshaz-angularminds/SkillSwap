import User from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { envConfig } from '../config/envConfig.js';

const cloudinaryV2 = cloudinary.v2;

/**
 * Handles user signup logic.
 *
 * @param {Object} userDetails - User details including email, password, name, etc.
 * @returns {Object} The newly created user object.
 * @throws {Error} If a user with the provided email already exists.
 */
// const { name, username, bio, location, email, password } = req.body;

export const userSignUpService = async (userDetails) => {
  const { email, avatar, ...otherDetails } = userDetails;

  // Check if user with the given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  let avatarUrl = null;
  if (avatar) {
    const avatarPublicId = uuidv4();
    avatarUrl = await uploadImageUtil(avatar, avatarPublicId);
  }

  // Create new user
  const newUser = await User.create({ uid:uuidv4(),email, avatar: avatarUrl, ...otherDetails });

  return newUser;
};

/**
 * Handles user login logic.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} An object containing access and refresh tokens if login is successful, or null otherwise.
 */
export const userLoginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null; // User not found
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return null; // Password doesn't match
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

/**
 * Retrieves a user by their ID.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Object|null} The user object if found, or null if not found.
 */
export const getUserService = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

/**
 * Deletes a user by their ID.
 *
 * @param {string} userId - The ID of the user to delete.
 * @returns {Object|null} The deleted user object if found and deleted, or null if not found.
 */
export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (user && user.avatar?.public_id) {
    try {
      await deleteImage(user.avatar.public_id);
    } catch (error) {
      console.error(`Failed to delete avatar for user ${userId}:`, error);
      // Optionally re-throw or handle the error differently
    }
  }

  return user;
};


/**
 * Generates a JWT access token for a user.
 *
 * @param {Object} user - The user object.
 * @returns {string} The generated access token.
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    envConfig.ACCESS_TOKEN_SECRET,
    { expiresIn: envConfig.ACCESS_TOKEN_EXPIRY }
  );
};

/**
 * Generates a JWT refresh token for a user.
 *
 * @param {Object} user - The user object.
 * @returns {string} The generated refresh token.
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    envConfig.REFRESH_TOKEN_SECRET,
    { expiresIn: envConfig.REFRESH_TOKEN_EXPIRY }
  );
};

/**
 * Uploads an image using the Cloudinary configuration.
 *
 * @param {string} filePath - The path to the image file.
 * @returns {Promise<Object>} An object containing the public_id and url of the uploaded image.
 */
export const uploadImage = async (filePath) => {
  return uploadImageUtil(filePath);
};

// This is the user service file.
// Add your user-related functions and logic here.
// This is the user service file.
// Add your user-related functions and logic here.