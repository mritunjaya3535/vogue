const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { JwtService } = require("./jwtService");
const { UserService } = require("./UserService");
const { oauth2Client } = require("../config/GoogleAuthConfig");
const axios = require("axios");
const { Message } = require("../utils/Message");
const transporter = require("../config/NodeMailer");

class AuthService {
    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async signUp(userRequest) {
        if (!userRequest.email || !userRequest.password || !userRequest.name) {
            throw new Error(`Missing required fields: \n name: ${!!userRequest.name}, email: ${!!userRequest.email}, or password: ${!!userRequest.password}`);
        }

        const user = await this.userService.findUserByEmail(userRequest.email);

        if (user) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(userRequest.password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');


        const createdUser = await this.userService.saveUser({
            name: userRequest.name,
            email: userRequest.email,
            password: hashedPassword,
            phone: userRequest.phone,
            rollno: userRequest.rollno,
            course: userRequest.course,
            verificationToken
        });

        if (!createdUser) {
            throw new Error("Unable to create new User!");
        }

        const token = this.jwtService.generateToken(createdUser.email, "User", createdUser.id);

        const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${createdUser.verificationToken}`;
        try {
            await transporter.sendMail({
                from: `no reply <${process.env.EMAIL_ID}>`,
                to: createdUser.email,
                subject: 'Verify Your Email',
                html: Message(verificationUrl),
            });
        } catch (error) {
            console.error("Email sending failed:", error);
        }

        return { token: token, email: createdUser.email, name: createdUser.name, verificationToken };
    }

    async signIn(signInRequest) {
        const { email, password } = signInRequest.body;

        if (!email || !password) {
            throw new Error(`Following details not defined!\n Please provide following to proceed:\n email: ${!!email}, password: ${!!password}`);
        }

        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = this.jwtService.generateToken(user.email, "User", user.id);
        return { token: token, email: user.email, name: user.name };
    }

    async getUserById(patientId) {
        const user = await this.userService.findUserById(patientId);

        if (!user) {
            throw new Error("User not found");
        }

        const userObj = user.toObject();
        return userObj;
    }

    async signInByGoogle(code, role) {
        try {
            const googleResponse = await oauth2Client.getToken(code);
            const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

            const { email, name, verified_email, picture } = userResponse.data;

            let userInfo = await this.userService.findUserByEmail(email);

            if (!userInfo) {
                userInfo = await this.userService.saveUser({
                    name,
                    email,
                    password: '',
                    isVerified: verified_email,
                    profileUrl: picture,
                    isOAuth: true
                });
            }

            if (!userInfo || !userInfo.id) {
                throw new Error('Unable to save user in the database');
            }

            const token = this.jwtService.generateToken(email, role, userInfo.id);
            return { token, email, name, profile: userInfo.profileUrl || '' };
        } catch (error) {
            console.error("Google authentication failed:", error);
            throw new Error("Google authentication failed");
        }
    }

    async verifyToken(token) {
        const user = await this.userService.getUserByVerificationToken(token);

        if (!user) {
            throw new Error("Invalid verification token");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        return true;
    }
}

module.exports = { AuthService };