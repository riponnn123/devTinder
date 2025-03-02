const express = require("express");

const app = express();

app.use((req,res)=> {
    res.send("Hello from the server!!!");
});

app.listen(3000 , ()=> {
    console.log("Sever is succesfully lisening on port 3000...");
});

