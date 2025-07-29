import { v4 as uuidv4 } from "uuid";
import { envConfig } from "../config/envConfig.js";
import { userSignUpService, resetPasswordService, verifyOtpService } from "../services/auth.service.js"
import catchAsync from "../middlewares/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendResponse from "../responses/sendResponse.js"
import ApiError from "../errors/ApiError.js";

let refreshTokens = [];

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    path: '/refresh-token'
}

//geenerate 
const generateAccessToken = (user) => {
    // console.log("user in access token: ", user);

    const payload = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    };

    return jwt.sign(payload, envConfig.access_token_secret, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    // console.log("user in refresh token: ", user);
    const payload = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    };
    const token = jwt.sign(payload, envConfig.refresh_token_secret, { expiresIn: '7d' });
    refreshTokens.push(token);
    return token;
}

// refresh access token
export const refreshAccessToken = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token || !refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, envConfig.refresh_token_secret, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken(user);

        sendResponse(res,
            {
                statusCode: 200,
                success: true,
                message: "Access token refreshed successfully",
                data: { accessToken }
            }
        );

    })
}

// Register New User
export const userSignUp = catchAsync(async (req, res) => {
    const { email } = req.body;
    // console.log("email here-- ", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const signUpUser = await userSignUpService({ ...req.body });

    // const hashedPassword = await bcrypt.hash(password, 12);

    // let avatar = { public_id: "", url: "" };
    // if (req.file?.path) {
    //     avatar = await uploadImage(req.file.path);
    // }

    // console.log("signup user: ",signUpUser);


    sendResponse(res,
        {
            statusCode: 201,
            message: "User created successfully",
            data: { userId: signUpUser._id },
        });
});

// Login User
export const userLogin = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // console.log("login request object-- ", req.body);


    const user = await User.findOne({ email, password });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    if (!user) {

        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Invalid credentials",
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // console.log("access token-- ",accessToken);
    // console.log("refresh token-- ",refreshToken);

    res.cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return sendResponse(res, {
        statusCode: 200,
        message: "Login successful88",
        data: {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        },
        success: true
    });
});

export const userLogout = catchAsync(async (req, res) => {
    res.clearCookie("refreshToken", REFRESH_TOKEN_COOKIE_OPTIONS)
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
    })
})

export const resetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;

    const sendEmail = await resetPasswordService(email);

    return sendResponse(res, {
        statusCode: 200,
        message: "Email sent successfully",
        success: true
    });
})

export const verifyOtpPassword = catchAsync(async (req,res) => {
    const {otpInput} = req.body;
    
    const isVerified = await verifyOtpService(otpInput);

    if(!isVerified){
        return sendResponse(res, {
        statusCode: 400,
        message: "otp verification has failed.",
        success: false
    });
    }

    return sendResponse(res, {
        statusCode: 200,
        message: "Email verified successfully!",
        success: true
    });

    console.log("otp input-- ",otpInput);
    
})

