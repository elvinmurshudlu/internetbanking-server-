const jsonWeb = require("jsonwebtoken")
const secretKey = require("../data/jsonWebToken")

module.exports = (req,res,next)=>{
    let token = req.headers.authorization

    try{

        let verified = jsonWeb.verify(token,secretKey)
        req.userId = verified.id
        next()

    }catch{
        res.status(404).send()

    }


}