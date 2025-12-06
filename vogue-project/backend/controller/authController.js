const express = require("express");
const { VerificationPage } = require("../utils/Message");
const { AuthService } = require("../services/authService");

const authService = new AuthService();

const signup = async (req, res) => {
    try {
        const createdUser = await authService.signUp(req.body);

        if (!createdUser) {
            return res.status(400).json({ success: false, message: "Email already exists or unable to create user!" });
        }

        const responseUser = {
            token: createdUser.token,
            email: createdUser.email,
            name: createdUser.name,
            profile: createdUser.profile
        }

        return res.status(201).json({ success: true, message: "User is created successfully!", user: responseUser });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

const signin = async (req, res) => {
    try {
        const userDetails = await authService.signIn(req);

        if (!userDetails) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, message: "User is logged in successfully!", user: userDetails });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

const signInByGoogle = async (req, res) => {
    const { code, role } = req.body;

    try {
        const userDetails = await authService.signInByGoogle(code, role);

        if (!userDetails) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, message: "User is logged in successfully!", user: userDetails });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(403).json({ success: false, message: "verificationToken is required!" });
        }

        const verified = await authService.verifyToken(token);

        if (verified) {
            res.status(200).send(VerificationPage());
        } else {
            return res.status(403).json({ success: false, message: "Invalid or expired token." });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

const me = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ success: false, message: "No user found!" });
        }

        if (!user.userId) {
            return res.status(401).json({ success: false, message: "No userId found!" });
        }

        const getUser = await authService.getUserById(user.userId);
        if (!getUser) {
            return res.status(404).json({ success: false, message: "Patient not found!" });
        }
        return res.status(200).json({ success: true, user: getUser });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
};

module.exports = { signup, signin, signInByGoogle, verifyUser, me };