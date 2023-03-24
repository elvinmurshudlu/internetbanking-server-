const express = require("express")
const app = express()
const loginRegister = require("./routes/loginRegister")
const requireCards = require("./routes/requestCards")

const session = require('express-session');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }); 

app.use(session({
  secret: 'güvenli bir anahtar',
  resave: false,
  saveUninitialized: true
}));


// app.use(express.json())

app.use(loginRegister)

app.use(requireCards)

app.listen(3200,()=>{
    console.log("Server started 3200")
})