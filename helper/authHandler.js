const jwt = require("jsonwebtoken");

const isAuthenticatedUSer = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(400).json({
                meta: { msg: "Unauthorized access.", status: false },
            });
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        if (decodedData) {
            next()
        } else {
            return res.status(400).json({
                meta: { msg: "Unauthorized access.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}


module.exports = {
    isAuthenticatedUSer
};