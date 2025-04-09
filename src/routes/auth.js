const express = require("express");
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation");
const User= require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup",async (req, res) => {
    try{
    validateSignUpData(req);
    const {firstName,lastName,emailId,password} = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //creating a new instance of the user model
    const user = new User({
        firstName, 
        lastName, 
        emailId, 
        password: passwordHash,
    });
    await user.save();
    res.send("User added succesfully!");
    } catch(err){
    res.status(400).send("ERROR: " + err.message);
}
});

authRouter.post("/login", async(req, res) => {
  try{
      const{emailId, password} =req.body;

      const user = await User.findOne({emailId: emailId});
      if(!user){
          return res.status(404).send("User not found.");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){

          //Create a JWT token
          const token =await user.getJWT();
          console.log(token);
          //set the cookie
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8* 3600000),
          });
          
          res.send("Logged in successfully!");
          return;
      }else{
          return res.send("Failed to Login!");
      }
  }catch(err){
      res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout",async(req,res) => {
  res.cookie("token",null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout succesfull!!!");
});

module.exports = authRouter;

