const express = require("express")
const app = express()
//!Router
const loginRegister = require("./routes/loginRegister")
const requireCards = require("./routes/requestCards")
const session = require('express-session');
//!Sql management
const UserControl = require("./UserControl/UserControl")
//!Sequelize model
const Transactions = require("./models/Transactions")
//!WebSocket
const WebSocket = require("ws")

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
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

let server = app.listen(3200,()=>{
    console.log("Server started 3200")
})



//!WebSocket for realTime transfers

const wss = new WebSocket.Server({ server: server });

wss.on('connection', async (ws, req) => {
  console.log('WebSocket connected');


  console.log("Test Sequelize--------------------------------")
  let data = await UserControl.findUserTransactions(1)
  console.log(JSON.stringify(data))
  console.log("Test Sequelize--------------------------------")

  // let cookie = req.headers.cookie
  let cookie = req.url
  console.log("Cookie",req.url);
  let user = await UserControl.findUserBySession(cookie.split("=")[1])

  Transactions.afterCreate((transaction, options) => {
    const message = JSON.stringify({ type: 'transaction_created', data: transaction });
    ws.send(message);
  });


  ws.on('message',async  (message) => {
    const decryptedMessage = message.toString('utf-8');
    const parsedMessage = JSON.parse(decryptedMessage);
    
    // console.log("Gelen data -------------",parsedMessage.data);

    await Transactions.create({
      amount:+parsedMessage.data,
      fromUserId:1,
      fromCard:"234273",
      toCardL:"495809",
      toUserId:3

    })
    
  });  

  // let tr = await Transactions.findAll({where:{fromUserId:user.id}})
  let tr = await UserControl.findUserTransactions(user.id)
  ws.send(JSON.stringify(tr))

  ws.on('close', () => {
    console.log('WebSocket disconnected');
  });
});




