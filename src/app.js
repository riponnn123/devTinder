const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User= require("./models/user");

app.use(express.json()); //middleware to convert JSON to js object
// app.use((req,res)=> {
//     res.send("Hello from the server!!!");
// });

// app.listen(3000 , ()=> {
//     console.log("Sever is succesfully lisening on port 3000...");
// });
app.post("/signup",async (req, res) => {
    //creating a new instance of the user model
    const user = new User (req.body);

    try{
    await user.save();
    res.send("User added succesfully!");
    } catch(err){
    res.status(400).send("Error saving user: " + err.message);
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

