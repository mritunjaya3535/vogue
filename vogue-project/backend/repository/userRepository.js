const User = require("../models/User");

const userRepository = {
    create: async (userData) => {
        const newUser = new User(userData);
        return await newUser.save();
    },

    findById: async (id) => {
        return await User.findById(id).select('-password');
    },

    findUserByEmail: async (email) => {
        return await User.findOne({ email });
    },

    getIsVerified: async (id) => {
        const user = await User.findById(id).select('isVerified').lean().exec();
        return user?.isVerified || null;
    },

    getIsPhoneVerified: async (id) => {
        const user = await User.findById(id).select('isPhoneVerified').lean().exec();
        return user?.isPhoneVerified || false;
    },

    update: async (id, updateData) => {
        return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true, select: '-password' });
    },

    findAll: async () => {
        return await User.find();
    },

    delete: async (id) => {
        await User.findByIdAndDelete(id);
    }
};

module.exports = userRepository;