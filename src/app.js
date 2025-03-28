const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User= require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json()); //middleware to convert JSON to js object
// app.use((req,res)=> {
//     res.send("Hello from the server!!!");
// });

// app.listen(3000 , ()=> {
//     console.log("Sever is succesfully lisening on port 3000...");
// });
app.post("/signup",async (req, res) => {
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
app.post("/login", async(req, res) => {
    try{
        const{emailId, password} =req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            return res.status(404).send("User not found.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send("Incorrect password.");
        }else{
            res.send("Logged in successfully!");
        }
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId: userEmail});
        if (!user) {
         return res.status(404).send("User not found.");
        }else{
        res.send(user);
    }
    } catch(err){
    res.status(500).send("Something went wrong");
    }
});
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err){
    res.status(500).send("Something went wrong");
    }
});
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }else{
            res.send("User deleted successfully.");
        }
    } catch(err){
        res.status(500).send("Something went wrong");
        }
});  
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWED_UPDATES = [
        "userId","photoUrl", "about","gender","age","skills"
    ]

    const isUpdateAllowed = Object.keys(data).every((k) =>
     (ALLOWED_UPDATES).includes(k)
    );
    if(!isUpdateAllowed) {
        res.status(403).send("Invalid");
    }

    try{
        await User.findByIdAndUpdate( {_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
    });
            console.log(userId);
            res.send("User updated successfully.");
    }catch(err){
        res.status(500).send("Something went wrong");
        }
    });

connectDB()
.then(() =>{
    console.log("DB connection established");
    app.listen(7777, () =>{
        console.log("Server is succesfully listening on port 7777..");
    });
})
.catch((err) => {
    console.log("DB cannot connected");
});

