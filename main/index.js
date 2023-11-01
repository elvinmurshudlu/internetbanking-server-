const express = require("express")
const app = express()
//!Router
const loginRegister = require("./routes/loginRegister")
const requireCards = require("./routes/requestCards")
const recipients = require("./routes/recipients")
const transactions = require("./routes/transactions")


//!Sql management
//!Sequelize model
const Transactions = require("./models/Transactions")
//!WebSocket
const WebSocket = require("ws")

const jsonWeb = require("jsonwebtoken")
const secretKey = require("./data/jsonWebToken")

const path = require('path');
const fileupload = require("express-fileupload");




app.get('/api/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../', 'images', imageName);
  
  res.sendFile(imagePath);
}); 




app.use(fileupload())

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.get("/",(req,res)=>{
  res.send("Nothing for you there")
})

app.use(recipients)
app.use(loginRegister)

app.use(requireCards)
app.use(transactions)

let server = app.listen(3200, () => {
  console.log("Server started 3200")
})

//!WebSocket for realTime transfers

const wss = new WebSocket.Server({ server: server })

wss.on("connection", async (ws, req) => {
  console.log("WebSocket connected")

  let cookie = req.url.split("=")[1]

  let user = jsonWeb.verify(cookie, secretKey)

  //! userId ile deyisiklik olan transaktion user id yoxla eynidise gonder
  //  let user = await UserControl.findUserBySession(cookie.split("=")[1])

  Transactions.afterCreate((transaction, options) => {
    const message = JSON.stringify({
      type: "transaction_created",
      data: transaction,
    })

    if (user.id == transaction.userId) {
      ws.send(message)
    }
  })

  //   Transactions.afterUpdate(async (transaction, options) => {
  //   console.log('A transaction was updated:', transaction);

  //   let userTransactions = await UserControl.findUserTransactions(user.id)

  //   const message = JSON.stringify({ type: 'transaction_updated', data: userTransactions });

  //   if(user.id == transaction.fromUserId || user.id == transaction.toUserId){
  //     ws.send(message);
  //   }
  // });

  let transactions = await Transactions.findAll({
    where: {
      userId: user.id,
    },
  })

  console.log(transactions.length)
  ws.send(JSON.stringify(transactions))

  ws.on("close", () => {
    console.log("WebSocket disconnected")
  })
})
