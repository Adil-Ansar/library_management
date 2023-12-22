const { userModel } = require("./userModel");
const { jwtToken } = require("../../helper/comFun");

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const userObj = {
            name,
            email,
            password
        }

        const userdata = await userModel.create(userObj);
        console.log("userdata", userdata)
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
        const { email, password } = req.body;
        const userdata = await userModel.findOne({ email })
        if (userdata) {
            const token = await jwtToken({
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