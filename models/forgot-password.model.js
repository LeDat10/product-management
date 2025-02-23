const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const forgotPasswordchema = new mongoose.Schema(
    {
        emai: String,
        otp: String,
        expireAt: {
            type: Date, 
            expires: 180
        }
    },
    {
        timestamps: true
    }
);

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordchema, "forgot-password");
module.exports = ForgotPassword;