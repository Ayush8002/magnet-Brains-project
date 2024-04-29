import { validationResult } from "express-validator";
import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { sendToken } from "../utils/features.js";
import { cookieOptions } from "../utils/features.js";

// ========================================================================
const createUser = async (req, res) => {
    // if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { email, password, name } = req.body;
    
    try {
        let user = await User.findOne({ email })
        // Check email already exist or not in db
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exist" })
        }
        // when you want to hash your password 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)

        // create a new user in db
        user = await User.create({ name, email, password: secPass });

        // it's a custom module to send token 
        sendToken(res, user, 201, "User created");

    } catch (error) {
        res.status(500).send("some errors occured")
    }
}

// =========================================================================
const login = async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // it's a custom module to send token 
        sendToken(res, user, 200, `Welcome Back, ${user.name}`);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

}

// =========================================================================
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("magnet-brains", "", { ...cookieOptions, maxAge: 0 })
            .json({
                success: true,
                message: "Logged out successfully",
            });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

}


export { login, createUser, getMyProfile, logout };