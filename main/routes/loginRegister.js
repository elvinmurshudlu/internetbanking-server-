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
    req.on("end",async ()=>{
        let result = JSON.parse(Buffer.concat(data).toString())
        console.log("RegisteredACcount ----",result)
        // addUser(result)

        const isAdded = await UserControl.addUser(result)

        res.send(isAdded)
    })
    
})

router.post("/login",(req,res)=>{
    console.log("İstek atan cihaz---------------------",req.headers['user-agent'])
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
        console.log("response---------------------",response)
        res.send(response ? response.sessionCode : response)
        // res.send(response)
        

    })
    
})

router.post("/logged",(req,res)=>{
    let session = []
    req.on("data",(chunk)=>{
        session.push(chunk)

    })
    req.on("end",async ()=>{
        session = Buffer.concat(session).toString()
        let isAuthorized =  await UserControl.authorizedSession(session)
        console.log(session)
        res.send(isAuthorized ? isAuthorized.sessionCode  : isAuthorized)
    })

})

router.post("/getdata",(req,res)=>{
    let cookie = []
    req.on("data",(chunk)=>{
        cookie.push(chunk)
        
    })
    
    req.on("end",async ()=>{       
        cookie = Buffer.concat(cookie).toString()      

        if(cookie){
            let data = await UserControl.findUserBySession(cookie.trim() != "" && cookie) 
            res.send({name:data.name,surname:data.surname})
        }else{
            res.send()
        } 
        
        // res.end()
        

    })

})


module.exports = router