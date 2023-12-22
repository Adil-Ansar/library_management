const mongoose = require("mongoose");

const dbConnect = async ()  => {
    try {
        console.log("Establishing Mongo DB Connection...");
        await mongoose.connect(process.env.DB_URL)    
        console.log("Connection established.")
    } catch (error) {
        console.log("==== DB Connection Error ====", error.message);
        throw error;
    }
}

module.exports = {
    dbConnect
};