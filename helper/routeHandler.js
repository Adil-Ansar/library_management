const baseRouter = require("express").Router();

const basePath = "/library";

const userRoutes = require("../modules/user/userRoutes");

baseRouter.use("/user", userRoutes);

module.exports = {
    baseRouter,
    basePath
}