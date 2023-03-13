const Users = require("../models/Users")
const Sessions = require("../models/Sessions")


class UserControl{

    static async  findUser(userInformation){    
        const searchResult = (await Users.findOne({where:{email:userInformation.email}}))
        console.log("Istifadeci melumati",searchResult)
        if(searchResult == null){
            return false //!istifadeci tapilmadI bununla bagli geri mesaj gonder
        }    
        let user = searchResult.dataValues

        if(userInformation.password != user.password){
            return false //! Sifre ve ya email yanlistir melumati gonder
        }        
        
        // return this.sessionGenerator(searchResult.id)  //!istifadeci tapildi cookie gonder
        return {user:searchResult,sessionCode: await this.sessionGenerator(searchResult.id)}  //!istifadeci tapildi cookie gonder
        // return true  //!ILkin hisse
        
    
    }
    
    static async  addUser(userInformation){

        let user = await Users.findOne({where:{email:userInformation.email}})

        if(user != null) return false
        await Users.create({
            name:userInformation.name,
            surname:userInformation.surname,
            email:userInformation.email,
            password:userInformation.password
        })
        console.log("User Elave olundu ::::::")
        return true
    
    }

    static async sessionGenerator(userId){
        const symbols = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM"
        let keyLength = 16
        let result = ""
        for(let a = 0 ;a<keyLength;a++){
            let random = Math.floor((Math.random()*symbols.length))
            // console.log("random",random)
            result += symbols[random]
        }


        await Sessions.create({
            sessionCode:result,
            userId:userId
        })


        return result

    }

    static async authorizedSession(session){
       let authorized =  await Sessions.findOne({where:{sessionCode:session}}) //! Gelen deyer ya null olacaq ya da melumat olacaq ,
       //! null deyer gelse null == false eks halda true deyer
    //    let authorized =  await Sessions.findOne({where:{sessionCode:"session"}})       

       return  authorized ? authorized : false 

    }

    static async findUserBySession(session){

        console.log("session^^^^^^^^^^^^^^^",session)
        if(session ){
            let sessionUser = await this.authorizedSession(session)

            let user = await Users.findByPk(sessionUser.dataValues.userId)

             console.log("Sesiion User +++++++++++++++=============&&&&&&",user.dataValues)

            return user.dataValues
        }
        
        // let user  = this.findUser(sessionUser)
        
        // console.log("Session gelen user melumati-------------",user.dataValues)

    }

    

    
    
}

module.exports = UserControl