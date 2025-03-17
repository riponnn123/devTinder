const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://kalitaripon2:XzLmvt53MtxeG1Xo@cluster0.ddclb.mongodb.net/"
    );
};

module.exports = connectDB;