const express = require("express")
const router = express.Router()

const UserControl = require("../UserControl/UserControl")

router.post("/getRecipients", (req, res) => {
  let session = []
  // req.send(true)
  req.on("data", (chunk) => {
    session.push(chunk)
  })
  req.on("end", async () => {
    let parsedSession = Buffer.concat(session).toString()
    let user = await UserControl.findUserBySession(parsedSession)
    let recipients = await UserControl.findUserRecipients(user.id)

    res.send(recipients)
    // res.send(true)
  })
})

router.post("/moneyTransfer", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let parsedData = JSON.parse(Buffer.concat(data).toString())
    await UserControl.moneyTransfer(parsedData)
    res.send()
  })
})

router.post("/addRecipient", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let parsedData = JSON.parse(Buffer.concat(data).toString())
    console.log("PArsed DAta =======================", parsedData)
    await UserControl.addRecipient(parsedData)
    res.send()
  })
})

router.post("/deleteRecipient", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })

  req.on("end", async () => {
    let parsedData = Buffer.concat(data).toString()

    await UserControl.deleteRecipientById(parsedData)
    res.send()
  })
})
module.exports = router
