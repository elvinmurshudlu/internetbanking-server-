const express = require("express")

const router = express.Router()

const Auth = require("../middlevare/Auth")
const Cards = require("../models/Cards")
const Transactions = require("../models/Transactions")
const Users = require("../models/Users")

router.post("/transferMoney", Auth, (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let information = Buffer.concat(data).toString()

    let parsedInformation = JSON.parse(information)

    let senderUserId = req.userId

    let senderCardNumber = parsedInformation.fromCardNumber

    let targetCardNumber = parsedInformation.toCardNumber

    let amount = parsedInformation.amount

    const senderCard = await Cards.findOne({
      where: { cardNumber: senderCardNumber },
    })

    const targetCard = await Cards.findOne({
      where: { cardNumber: targetCardNumber },
    })

    const senderUser = await Users.findOne({ where: { id: senderUserId } })

    let targetUser = false

    await Cards.update(
      { amount: (+senderCard.amount - +amount).toString() },
      { where: { cardNumber: senderCardNumber } }
    )

    if (targetCard) {
      await Cards.update(
        { amount: (+targetCard.amount + +amount).toString() },
        { where: { cardNumber: targetCardNumber } }
      )
      targetUser = await Users.findOne({ where: { id: targetCard.userId } })
      await Transactions.create({
        userId: targetUser.id,
        amount: amount.toString(),
        type: "Money Transfer",
        currency: "AZN",
        connectedCard: senderCardNumber,
        connectedUser: senderUser.name + senderUser.surname,
        notification: true,
        ownerCard:targetCard.cardNumber
      })
    }

    await Transactions.create({
      userId: senderUserId,
      amount: (-amount).toString(),
      type: "Money Transfer",
      currency: "AZN",
      connectedCard: targetCardNumber,
      connectedUser: parsedInformation.cardHolder,
      ownerCard:senderCard.cardNumber
    })

    res.status(200).send()
  })
})

module.exports = router
