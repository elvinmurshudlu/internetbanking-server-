const { json } = require("body-parser");
const express = require("express")
const router = express.Router()
const Users = require("../models/Users")


const db = require("../data/db")


async function findUser(userInformation){
    
    const searchResult = (await Users.findOne({where:{email:userInformation.email}})).dataValues
    console.log("Istifadeci melumati",searchResult)
    if(searchResult == null){
        return false
    }

    console.log("Passwd----------",searchResult.password)

    if(userInformation.password != searchResult.password){
        return false
    }
    return true
    

}





router.get("/login",(req,res)=>{
    // console.log(req.body)
    res.json({ message: "Hello from server!" });
    // res.end()
})

router.post("/login",(req,res)=>{
    console.log("Data from React")
    let data = []
    req.on("data",(chunk)=>{
        data.push(chunk)
        
    })
    
    req.on("end",async ()=>{
       
        let result  = Buffer.concat(data).toString()
        let userInformation = JSON.parse(result).info
        console.log(userInformation)
        let response = await findUser(userInformation)
        res.send(response)
        console.log(response)

    })
    
    
})

router.get("/",(req,res)=>{
 
    console.log("Home page")
    
    // res.end()
})



module.exports = router