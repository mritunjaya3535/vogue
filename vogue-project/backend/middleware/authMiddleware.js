const { verify } = require("jsonwebtoken");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

if(!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY environment variable is not set');
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || "random-secret-key";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(403).json({
                error: "Access denied. No token provided.",
                message: "Please provide a valid Bearer token in the Authorization Header.",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        if(err instanceof TokenExpiredError) {
            return res.status(401).json({
                error: "Access denied. Token expired. " + err,
                message: "Please login again to get a new token.",
            });
        } else if(err instanceof JsonWebTokenError) {
            return res.status(401).json({
                error: "Access denied. Invalid token. " + err,
                message: "Please provide a valid Bearer token in the Authorization Header.",
            });
        } else {
            return res.status(500).json({
                error: "Token verification failed. " + err,
                message: "Internal server error during token verification.",
            });
        }
    }
}

const requireAdmin = (req, res, next) => {
    if(!req.user) {
        return res.status(500).json({
            error: "Token verification failed.",
            message: "Internal server error during token verification.",
        });
    }
    if(req.user.role !== "Admin") {
        return res.status(403).json({
            error: "Admin access required.",
            message: "You do not have permission to access this resource.",
        });
    }
    next();
}

const requireAdminRoleOrDoctorRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            error: "Token verification failed.",
            message: "Internal server error during token verification.",
        });
    }
    if (req.user.role !== "Admin" && req.user.role !== "Doctor") {
        return res.status(401).json({
            error: "Admin/Doctor access required.",
            message: "Please connect with your administrator to access this resource.",
        });
    }
    next();
}

module.exports = { verifyToken, requireAdmin, requireAdminRoleOrDoctorRole };