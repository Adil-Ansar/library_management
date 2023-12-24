const { userModel } = require("./userModel");
const { jwtToken, hashPassword, comparePasswords } = require("../../helper/comFun");

const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const findUser = await userModel.findOne({
            email,
            role
        })
        if (findUser) {
            return res.status(409).json({
                meta: { msg: "User already exists. Please use a different email or username.", status: false },
            });
        }

        const hashpassword = await hashPassword(password);
        const userObj = {
            name,
            email,
            password: hashpassword,
            role
        }

        const userdata = await userModel.create(userObj);
        if (userdata) {
            return res.status(201).json({
                meta: { msg: "User created.", status: true },
                data: userdata
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Something went wrong.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password ||!role) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const userdata = await userModel.findOne({
            email,
            role
        })

        if (userdata) {
            const isCorrectPassword = await comparePasswords(password, userdata.password)
            if (!isCorrectPassword) {
                return res.status(200).json({
                    meta: { msg: "Invalid email or password. Please check your credentials and try again.", status: false }
                });
            }
            const token = await jwtToken({
                userId: userdata.userId,
                name: userdata.name,
                email: userdata.email
            });
            return res.status(200).json({
                meta: { msg: "User signIn successfully.", status: true },
                data: userdata,
                token
            });
        } else {
            return res.status(400).json({
                meta: { msg: "User not found", status: false },
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
    signUp,
    signIn
};