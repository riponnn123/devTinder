const jwt = require("jsonwebtoken");
const User = require("../models/user");
 

const userAuth = async (req, res, next) => {
  try{
    const {token} = req.cookies;
    if(!token){
      throw new Error("No token, authorization denied!");
    }
    
    const decodedObj = await jwt.verify(token, "Ripon@123");

    const {_id} = decodedObj;
    const user = await User.findById(_id);
    
    if(!user){
      throw new Error("User not found, authorization denied!");
    }

    req.user = user;
    next();
  } catch(err){
    res.status(401).send({error: "Unauthorized, please authenticate!"});
  }
};

module.exports = {userAuth};