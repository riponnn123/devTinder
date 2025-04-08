const validator = require('validator');

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;

  // Validate firstName and lastName
  if (!firstName || typeof firstName !== "string" || typeof lastName !== "string") {
    return "Invalid firstName or lastName";
  }
  else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email!");
  }
  else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password");
  } 
};

module.exports = {validateSignUpData,};