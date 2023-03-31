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
        let header = req.headers
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

        console.log(header);
})

// router.post("/getTransactions",(req,res)=>{
//         let data = []
//         req.on("data",(chunk)=>{
//                 data.push(chunk)

//         })

//         req.on("end",async ()=>{
//                 let currentUser = Buffer.concat(data).toString()
//                 let userId = (await UserControl.findUserBySession(currentUser)).id
//                 let transactions = await UserControl.findUserTransactions(userId)
//                 res.send(transactions)
//         })
// })



module.exports = router