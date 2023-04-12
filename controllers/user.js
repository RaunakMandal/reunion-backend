const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "User created successfully",
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        // Search for a user with this email else throw an error
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Check if the password is correct else throw an error
        const isPasswordMatch = await user.authenticate(password);
        if (!isPasswordMatch) {
            throw new Error("Incorrect password");
        }

        // Generate a token
        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        ); // The token will expire in 24 hours

        return res.status(200).json({
            message: "User authenticated successfully",
            success: true,
            token,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.getUser = async (req, res) => {
    const { auth } = req;
    try {
        const user = await User.findOne({ _id: auth._id });
        if (!user) {
            throw new Error("User not found");
        }

        const userObject = {
            _id: user._id,
            name: user.name,
            followers: user.followers.length,
            following: user.following.length,
        };

        return res.status(200).json({
            message: "User found",
            success: true,
            user: userObject,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.follow = async (req, res) => {
    const { id } = req.params;

    try {
        const currentUser = await User.findOne({ _id: req.auth._id });
        if (!currentUser) {
            throw new Error("Current user not found");
        }

        const userToFollow = await User.findOne({ _id: id });
        if (!userToFollow) {
            throw new Error("User you are trying to follow is not found");
        }

        if (currentUser._id.toString() === userToFollow._id.toString()) {
            throw new Error("You cannot follow yourself");
        }

        // Check if the current user is already following the user to follow
        const isFollowing = currentUser.following.find(
            (user) => user.toString() === userToFollow._id.toString()
        );
        if (isFollowing) {
            throw new Error("You are already following this user");
        }

        // Add the user to follow to the current user's following list
        currentUser.following.push(userToFollow._id);
        await currentUser.save();

        // Add the current user to the user to follow's followers list
        userToFollow.followers.push(currentUser._id);
        await userToFollow.save();

        return res.status(200).json({
            message: "User followed successfully",
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.unfollow = async (req, res) => {
    const { id } = req.params;

    try {
        const currentUser = await User.findOne({ _id: req.auth._id });
        if (!currentUser) {
            throw new Error("Current user not found");
        }

        const userToUnFollow = await User.findOne({ _id: id });
        if (!userToUnFollow) {
            throw new Error("User you are trying to unfollow is not found");
        }

        // Check if the current user is not following the user
        const isFollowing = currentUser.following.find(
            (user) => user.toString() === userToUnFollow._id.toString()
        );
        if (!isFollowing) {
            throw new Error("You are not following this user");
        }

        // Remove the user to unfollow from the current user's following list
        currentUser.following = currentUser.following.filter(
            (user) => user.toString() !== userToUnFollow._id.toString()
        );
        await currentUser.save();

        // Remove the current user from the user to unfollow's followers list
        userToUnFollow.followers = userToUnFollow.followers.filter(
            (user) => user.toString() !== currentUser._id.toString()
        );
        await userToUnFollow.save();

        return res.status(200).json({
            message: "User unfollowed successfully",
            success: true,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

