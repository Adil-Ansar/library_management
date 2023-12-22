const mongoose = require("mongoose");

const userModel = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            //user
            userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String },
            email: { type: String },
            password: { type: String },
            lateReturnFine: { type: Number },
            role: {
                type: String, enum: ["user", "admin"]
            },

            createdAt: Number,
            updatedAt: Number,
        },
        { timestamps: true }
    )
);

module.exports = { userModel };