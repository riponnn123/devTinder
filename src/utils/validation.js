const validator = require("validator");

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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

const isEditAllowed = Object.keys(req.body).every((field)=>
  allowedEditFields.includes(field)
);

return isEditAllowed;
};

module.exports = {validateSignUpData,
                  validateEditProfileData,
};