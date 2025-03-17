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

