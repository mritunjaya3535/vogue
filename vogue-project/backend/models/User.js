const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    isOAuth: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked', 'suspended', 'deleted'],
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: function () {
            return !this.isVerified;
        },
    },
    profileUrl: {
        type: String,
        default: '/images/user-default.jpg',
    },
    phone: {
        type: String,
        required: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const User = model('Users', userSchema);

module.exports = User;