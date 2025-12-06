const userRepository = require("../repository/userRepository");

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }

    async saveUser(userData) {
        return await this.userRepository.create(userData);
    }

    async findUserById(id) {
        return await this.userRepository.findById(id);
    }

    async findUserByEmail(email) {
        return await this.userRepository.findUserByEmail(email);
    }

    async isUserVerified(id) {
        return await this.userRepository.getIsVerified(id);
    }

    async isUserPhoneVerified(id) {
        return await this.userRepository.getIsPhoneVerified(id);
    }

    async getUserByVerificationToken(token) {
        return await this.userRepository.findUserByEmail(token);
    }

    async updateUser(id, updateData) {
        if (updateData.profileUrl === null) {
            delete updateData.profileUrl;
        }
        return await this.userRepository.update(id, updateData);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }
}

module.exports = { UserService };