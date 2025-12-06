const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
}

if (!process.env.JWT_TIMEOUT) {
    throw new Error("JWT_TIMEOUT environment variable is not set");
}

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiration = process.env.JWT_TIMEOUT;

class JwtService {
    constructor() {}

    generateToken(email, role, userId) {
        return jwt.sign({ email, role, userId }, jwtSecretKey, {
            expiresIn: jwtExpiration,
        });
    }
}

module.exports = { JwtService };