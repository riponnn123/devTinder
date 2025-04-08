const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); //middleware to convert JSON to js object
app.use(cookieParser()); //middleware to use cookie

const authRouter =  require("./routes/auth");
const profileRouter =  require("./routes/profile");
const requestRouter =  require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// app.use((req,res)=> {}
//     res.send("Hello from the server!!!");
// });

// app.listen(3000 , ()=> {
//     console.log("Sever is succesfully lisening on port 3000...");
// });

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

