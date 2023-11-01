const express = require("express")
const router = express.Router()

const UserControl = require("../UserControl/UserControl")
const Auth = require("../middlevare/Auth")
const Cards = require("../models/Cards")
const Users = require("../models/Users")

router.get("/getCards", Auth, async (req, res) => {
  let cards = await Cards.findAll({ where: { userId: req.userId } })

  // setTimeout(()=>{
  res.status(200).send(cards)

  // },4000)
})

router.post("/addNewCard", Auth ,(req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let result = Buffer.concat(data).toString()
    let parsedData = JSON.parse(result)
    console.log("newCard",parsedData);
    
    let card = await Cards.findOne({where:{cardNumber:parsedData.cardNumber}})

    if(card){
      res.status(404).send()

    }else{

      await Cards.create({
      cardNumber: parsedData.cardNumber,
      currency: "AZN",
      userId: req.userId,
      amount: 3000,
      cvv: parsedData.cvv,
      expireDate: parsedData.date,
      })

      res.status(200).send(true)

    }

  })
})

router.post("/getCardDetails", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let result = Buffer.concat(data).toString()
    let parsedData = JSON.parse(result)
    let response = await UserControl.findUserCard(parsedData)


    res.send(response)
  })
})

router.post("/setCardUsage",Auth, (req, res) => {
  let message = []
  req.on("data", (chunk) => {
    message.push(chunk)
  })

  req.on("end", async () => {
    let parsedMessage = JSON.parse(Buffer.concat(message).toString())

    const user = await Users.findOne({where:{id:req.userId}})

    if(user.password === parsedMessage.password){
      await Cards.update(
        { isAvailable: parsedMessage.value },
        {
          where: {
            cardNumber: parsedMessage.cardNumber,
          },
        }
      )
      res.status(200).send(true)

    }else{
      res.status(404).send()
    }

    
  })
})

router.post("/markAsRead", (req, res) => {
  let message = []
  req.on("data", (chunk) => {
    message.push(chunk)
  })

  req.on("end", async () => {
    let parsedMessage = JSON.parse(Buffer.concat(message).toString())
    UserControl.markAsRead(parsedMessage)
    console.log(parsedMessage)
    res.send(true)
  })
})

router.post("/markAllRead", (req, res) => {
  let message = []
  req.on("data", (chunk) => {
    message.push(chunk)
  })

  req.on("end", async () => {
    let parsedMessage = Buffer.concat(message).toString()
    UserControl.markAllread(parsedMessage)
    console.log(parsedMessage)
    res.send(true)
  })
})

module.exports = router
