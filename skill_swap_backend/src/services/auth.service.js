import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";


export const userSignUpService = async (userDetails) => {
  // console.log("user details-- ",userDetails.email);
   const newUser = await User.create({uid: uuidv4(),...userDetails});

  //  console.log("new user == ",newUser);

  // let avatarUrl = null;
  // if (avatar) {
  //   const avatarPublicId = uuidv4();
  //   avatarUrl = await uploadImageUtil(avatar, avatarPublicId);
  // }

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