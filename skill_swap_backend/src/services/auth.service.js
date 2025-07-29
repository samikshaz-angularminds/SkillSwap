import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import { envConfig } from '../config/envConfig.js';
import ApiError from '../errors/ApiError.js';

let verifyOtp = "";


export const userSignUpService = async (userDetails) => {
  // console.log("user details-- ",userDetails.email);
  const newUser = await User.create({ uid: uuidv4(), ...userDetails });

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

export const resetPasswordService = async (email) => {
  const otp = String(Math.floor(1000 + Math.random() * 9000));
  console.log("email in service: ", email);
  verifyOtp = otp;

  const foundedUser = await User.findOne({ email });

  if (!foundedUser) {
    throw new ApiError("User with this email id not found.")
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: envConfig.sender_email,
      pass: envConfig.sender_email_password
    }
  })

  let mailOptions = {
    from: envConfig.sender_email,
    to: email,
    subject: 'Password Reset',
    text: `The otp is - ${otp}`
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      console.log(mailOptions);

      if (error) { return reject(new ApiError("Error occurred while sending an email")) }
      resolve(info)

    })
  })

  return otp;
}

export const verifyOtpService = async (otp) => {
  console.log("request object otp: ",otp);
  console.log("verifying otp: ",verifyOtp);
  
  if(otp === verifyOtp){
    return true;
  }
  return false
}