const { json } = require("body-parser");
const express = require("express")
const router = express.Router()
// const Users = require("../models/Users")
const Sessions = require("../models/Sessions")

const UserControl = require("../UserControl/UserControl")

const db = require("../data/db")


router.post("/register",(req,res)=>{
    
    let data = []

    req.on("data",(chunk)=>{
        data.push(chunk)
    })
    req.on("end",()=>{
        let result = JSON.parse(Buffer.concat(data).toString())
        console.log("RegisteredACcount ----",result)
        // addUser(result)

        UserControl.addUser(result)
    })
    
})

router.post("/login",(req,res)=>{
    console.log("Data from React")
    let data = []
    req.on("data",(chunk)=>{
        data.push(chunk)
        
    })
    
    req.on("end",async ()=>{
       
        let result  = Buffer.concat(data).toString()
        let userInformation = JSON.parse(result)
        console.log(userInformation)
        // let response = await findUser(userInformation)
        let response = await UserControl.findUser(userInformation)  

        res.send(response)
        

    })
    
})

router.post("/logged",(req,res)=>{
    let session = []
    req.on("data",(chunk)=>{
        session.push(chunk)

    })
    req.on("end",async ()=>{
        session = Buffer.concat(session).toString()
         let isAuthorized=  await UserControl.authorizedSession(session)
        console.log(session)
        res.send(isAuthorized)
    })

})


module.exports = router