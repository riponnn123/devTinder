const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid password: " + value);
            }
        }
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
         default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value){
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value);
            }
        }
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

userSchema.methods.getJWT = async function(){
    const user = this; //this doesn't use arrow function. It is a special key-word

    const token = await jwt.sign({_id: user._id},"Ripon@123",{
        expiresIn: "7d"});
return token;
};

module.exports = mongoose.model("User", userSchema);