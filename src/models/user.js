const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Gender should be either Male, Female or Other");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
    },
    about: {
        type: String,
        default:"This is the default value of the user!",
    },
    skills: {
        type: [String],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);