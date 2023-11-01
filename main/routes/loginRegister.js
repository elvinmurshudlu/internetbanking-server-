const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
const secretKey = require("../data/jsonWebToken")
const UserControl = require("../UserControl/UserControl")
const Auth = require("../middlevare/Auth")

const jsonWeb = require("jsonwebtoken")

const path = require('path');


router.post("/register", (req, res) => {
  let data = []

  req.on("data", (chunk) => {
    data.push(chunk)
  })
  req.on("end", async () => {
    let userInformation = JSON.parse(Buffer.concat(data).toString())
    console.log(
      "RegisteredACcount -------------------------------------------------------",
      userInformation
    )

    let user = await Users.findOne({ where: { email: userInformation.email } })
    console.log(user)
    if (user) {
      res.status(409).send()
    } else {
      await Users.create({
        name: userInformation.name,
        surname: userInformation.surname,
        email: userInformation.email,
        password: userInformation.passwordRegister,
      })
      res.status(200).send()
    }
  })
})

router.post("/login", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })
  req.on("end", async () => {
    let userINformations = JSON.parse(Buffer.concat(data).toString())

    let user = await Users.findOne({ where: { email: userINformations.email } })

    if (user) {
      if (user.password == userINformations.password) {
        let token = jsonWeb.sign({ id: user.id, email: user.email }, secretKey)
        res.status(200).send(token)
      } else {
        res.status(404).send()
      }
    } else {
      res.status(404).send()
    }
  })
})

router.get("/logged", async (req, res) => {
  if (req.headers.authendication) {
    try {
      jsonWeb.verify(req.headers.authendication, secretKey)
      res.status(200).send()
    } catch (err) {
      res.status(401).send()
    }
    res.status(200).send()
  } else {
    res.status(401).send()
  }
})

// router.post("/getdata", (req, res) => {
//   let cookie = []
//   req.on("data", (chunk) => {
//     cookie.push(chunk)
//   })

//   req.on("end", async () => {
//     cookie = Buffer.concat(cookie).toString()

//     if (cookie) {
//       let data = await UserControl.findUserBySession(
//         cookie.trim() != "" && cookie
//       )
//       res.send({ name: data.name, surname: data.surname })
//     } else {
//       res.send()
//     }

//     // res.end()
//   })
// })

router.post("/currentUserId", (req, res) => {
  let data = []
  req.on("data", (chunk) => {
    data.push(chunk)
  })
  req.on("end", async () => {
    let parsedData = Buffer.concat(data).toString()
    let userId = (await UserControl.findCurrentUser(parsedData)).userId
    res.send({ userId: userId })
  })
})

router.get("/userDetails",Auth,async(req,res)=>{

  let user = await Users.findOne({where:{id:req.userId}})

  const {password,...rest} = user.dataValues

  res.status(200).send(rest)


})

router.post("/changeDetails",Auth,async(req,res)=>{


  let data = []

  req.on("data",(chunk)=>{
    data.push(chunk)
  })

  req.on("end",async()=>{
    let message = JSON.parse(Buffer.concat(data).toString())
    
    await Users.update(message,{where:{
      id:req.userId
    }})
    
    res.status(200).send(true)
  })

  

})


router.post("/profPic",Auth,async(req,res)=>{
  const newpath = path.join(__dirname,"../../images/")

  const file = req.files.file;

  const filename = Math.random()*100+"." + file.name.split(".")[1];


  await Users.update({profilePicture:filename},{where:{id:req.userId}})

  file.mv(`${newpath}${filename}`)

  res.send()
  
})



module.exports = router
