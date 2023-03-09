const express = require("express")
const app = express()
const router = require("./routes/login")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
 

// app.use(express.json())

app.use(router)

app.listen(3200,()=>{
    console.log("Server started 3200")
})