import cloudinary from "../config/cloudinaryConfig.js";
import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.model.js";
import sendResponse from "../responses/sendResponse.js"; // Adjust the path as needed



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

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User found successfully",
    })
})

export const getAllUsers = catchAsync(async (req, res) => {
    console.log("req.user--- ", req.user);
    const users = await getAllUsersService(req.user._id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users found successfully!",
        data: users
    })
})