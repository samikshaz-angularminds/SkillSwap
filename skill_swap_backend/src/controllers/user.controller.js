import cloudinary from "../config/cloudinaryConfig.js";
import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendResponse from "../responses/sendResponse.js"; // Adjust the path as needed
import { v4 as uuidv4 } from "uuid";
import { envConfig } from "../config/envConfig.js";

let refreshTokens = [];

//geenerate 
const generateAccessToken = (user) => {
    console.log("user in access token: ", user);

    const payload = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    };

    return jwt.sign(payload, envConfig.access_token_secret, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    console.log("user in refresh token: ", user);
    const payload = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
    };
    const token = jwt.sign(payload, envConfig.refresh_token_secret, { expiresIn: '7d' });
    refreshTokens.push(token);
    return token;
}

// Upload Image Utility
export const uploadImage = async (filePath) => {
    const response = await cloudinary.uploader.upload(filePath, {
        folder: "SkillSwap",
    });

    return {
        public_id: response.public_id,
        url: response.url,
    };
};

// Register New User
export const userSignUp = catchAsync(async (req, res) => {
    const { name, username, bio, location, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Email already in use.",
        });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    let avatar = { public_id: "", url: "" };
    if (req.file?.path) {
        avatar = await uploadImage(req.file.path);
    }

    const newUser = await User.create({
        uid: uuidv4(),
        name,
        username,
        bio,
        location,
        email,
        password,
        avatar,
    });

    sendResponse(res, {
        statusCode: 201,
        message: "User created successfully",
        data: { userId: newUser._id },
    });
});

// Login User
export const userLogin = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/refresh-token'
    });

    sendResponse(res, {
        message: "Login successful",
        data: {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        },
    });
});

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

// Update User
export const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const { name, username, bio, location, email } = req.body;

    let avatarUpdate = {};
    if (req.file?.path) {
        avatarUpdate = await uploadImage(req.file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            name,
            username,
            bio,
            location,
            email,
            ...(avatarUpdate.public_id && { avatar: avatarUpdate }),
        },
        { new: true }
    );

    if (!updatedUser) {
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found",
        });
    }

    sendResponse(res, {
        message: "User updated successfully",
        data: updatedUser,
    });
});

// Delete User
export const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found",
        });
    }

    // Optional: delete image from Cloudinary
    if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    sendResponse(res, {
        message: "User deleted successfully",
    });
});

// get logged in user
export const getUser = catchAsync(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found",
        });
    }

    sendResponse(es, {
        statusCode: 200,
        success: true,
        message: "User found successfully",
    })
})