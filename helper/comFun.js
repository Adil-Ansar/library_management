const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const jwtToken = async function (body) {
    const token = jwt.sign(body, process.env.JWT_KEY, { expiresIn: "1w" });
    return token;
};

const hashPassword = async (plainPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

const comparePasswords = async (userProvidedPassword, storedHashedPassword) => {
    try {
        const result = await bcrypt.compare(userProvidedPassword, storedHashedPassword);
        return result;
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

module.exports = {
    jwtToken,
    hashPassword,
    comparePasswords
};