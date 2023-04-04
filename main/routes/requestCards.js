const express = require("express")
const router = express.Router()

const Cards = require("../models/Cards")
const Transactions = require("../models/Transactions")

const UserControl = require("../UserControl/UserControl")



router.post("/getCards",(req,res)=>{
        let data = []
        req.on("data",(chunk)=>{
                data.push(chunk)

        })

        req.on("end",async ()=>{
           let currentUser = Buffer.concat(data).toString()
                let userId = (await UserControl.findUserBySession(currentUser)).id
                let cards = await UserControl.findUserCards(userId)
                res.send(cards)
                cards.forEach((card)=>console.log("Card New",card.dataValues))
                // console.log(cards)
        })
})


router.post("/addNewCard", (req,res)=>{
      
        let data = []
        req.on("data",(chunk)=>{
                data.push(chunk)
        })

        req.on("end",async()=>{
                let result = Buffer.concat(data).toString()
                let parsedData = JSON.parse(result)
                // let user = await UserControl.findUserBySession(parsedData.session)
                await UserControl.addNewCard(parsedData)

                // console.log(result,user.id);

        })
        res.send(true)

      
})

router.post("/getCardDetails",(req,res)=>{
        let data = []
        req.on("data",(chunk)=>{
                data.push(chunk)
        })

        req.on("end",async()=>{
                // console.log("-----------------------------------------------------------------------------+++++++++++++++++++++++++++++++++++++++++++++++=");
                let result = Buffer.concat(data).toString()
                let parsedData = JSON.parse(result)
                // console.log("ParsedDAta =====================",parsedData);
                let response = await UserControl.findUserCard(parsedData)
                
                

                // console.log(result,user.id);

                res.send(response)
        })

})

router.post("/setCardUsage",(req,res)=>{
        let message = []
        req.on("data",(chunk)=>{
                message.push(chunk)
        })

        req.on("end",async ()=>{
                let parsedMessage = JSON.parse(Buffer.concat(message).toString())
                await UserControl.setUserCardAvailability(parsedMessage)
                res.send(true)

        })
        
})




module.exports = router