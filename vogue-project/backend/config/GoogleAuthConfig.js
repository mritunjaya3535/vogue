const { google } = require("googleapis");

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.REDIRECT_URI) {
    throw new Error('Google OAuth environment variables are missing. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and REDIRECT_URI');
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
);

module.exports = { oauth2Client };