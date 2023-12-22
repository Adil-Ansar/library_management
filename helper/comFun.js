const jwt = require("jsonwebtoken");

const jwtToken = async function (body) {
    const token = jwt.sign(body, process.env.SECRET_KEY, { expiresIn: "1w" });
    return token;
};

module.exports = {
    jwtToken
};