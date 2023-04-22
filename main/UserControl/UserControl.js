const Users = require("../models/Users")
const Sessions = require("../models/Sessions")
const Cards = require("../models/Cards")
const Transactions = require("../models/Transactions")
const Recipients = require("../models/Recipients")

const { Op } = require('sequelize');




class UserControl{
    static async findCurrentUser(session){
        return await this.authorizedSession(session)

    }

    static async  findUser(userInformation){    
        const searchResult = (await Users.findOne({where:{email:userInformation.email}}))
        // console.log("Istifadeci melumati",searchResult)
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
        // console.log("User Elave olundu ::::::")
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

        
        if(session ){
            let sessionUser = await this.authorizedSession(session)
            let user = await Users.findByPk(sessionUser.dataValues.userId)       

            return user.dataValues
        }
        
        // let user  = this.findUser(sessionUser)
        
        // console.log("Session gelen user melumati-------------",user.dataValues)

    }

    static async findUserCards(id){
        return await Cards.findAll({where:{userId:id}})

    }
    static async findUserTransactions(id){
        return await Transactions.findAll({where:{
            [Op.or]: [
              { fromUserId: id },
              { toUserId: id }
            ]
          }})

        

    }
    static async addUserTransaction(amount,fromUserId,fromCard,toCard,currency,toUserId,senderName,recipientName,transferType){
        
        await Transactions.create({
            amount:amount,
            fromUserId:fromUserId,
            fromCard:fromCard,
            toCard:toCard,
            toUserId:toUserId ,
            currency:currency,
            senderName:senderName,
            recipientName:recipientName,
            transferType:transferType
          })
    }

    static async findUserCard(data){
        let user = await UserControl.findUserBySession(data.session)
        let card = await Cards.findOne({where:{"id":data.cardId}})
        if(card && card.userId == user.id){
            return card
        }
        return false      

    }


    static async addNewCard(dataIncludeSession){
        let user = await this.findUserBySession(dataIncludeSession.session)
        await Cards.create({
            cardNumber:dataIncludeSession.number,
            userId:user.id,
            cvv:dataIncludeSession.cvv,
            expireDate:dataIncludeSession.date
        })

    }


    static async setUserCardAvailability(message){
        await Cards.update({ isAvailable: message.boolean }, {
            where: {
              id: message.cardId
            }
          });
    }


    static async findUserRecipients(userId){
        return await Recipients.findAll({where:{userId:userId}})
    }


    static async findCardByCardNumber(cardNumber){
        return await Cards.findOne({where:{cardNumber:cardNumber}})
    }

    static async findRecipientByCardNumber(cardNumber){
        return await Recipients.findOne({where:{accountNumber:cardNumber}})

    }


    static async moneyTransfer(data){

        let toUserAvailable = false

        let fromUser = await this.findUserBySession(data.session) //!Transfer edən useri tapmaq üçün
        let fromUserCard = await this.findCardByCardNumber(data.fromCard) //! trasfer edənin card hesabını tapmaq üçün
        let toUserCard = await this.findCardByCardNumber(data.toCard)  //! transfer olunanın card hesabini tapmaq üçün
        if(toUserCard){
             toUserAvailable = toUserCard.userId
             await Cards.update({ amount:(+toUserCard.amount - + data.amount).toString() }, {
                where: {
                  cardNumber: data.toCard
                }
              });

        } //! transfer olunanın userini tapmaq üçün
        let currency = fromUserCard.currency

        let recipient = await this.findRecipientByCardNumber(data.toCard)
        console.log("REcipient Sequized================",recipient);
        
        await this.addUserTransaction(data.amount,fromUser.id,data.fromCard,data.toCard,currency,toUserAvailable,fromUser.name,recipient.recipientName,data.transferType)
        await Cards.update({ amount:(+fromUserCard.amount + + data.amount).toString() }, {
            where: {
              cardNumber: data.fromCard
            }
          });

        //! create transaction for sender 
        
        

    }

    static async addRecipient(data){
        console.log("addrecipiant========",data);
        let user = await this.findUserBySession(data.session)
        let recipientCard = this.findCardByCardNumber(data.cardNumber)

        await Recipients.create({
            userId: user.id,
            recipientName:data.recipientName,
            currency:recipientCard ? recipientCard.currency : "AZN",
            accountNumber: data.cardNumber

        })

    }


    static async markAsRead(id){
        let date = new Date()
        // await Transactions.update({notification:false,updateAt:date.getDate()},{where:{
        //     id:id
        // }})


        const transaction = await Transactions.findOne({ where: { id: id } });
        console.log(transaction);
        transaction.notification = false; // yaxud dəyişənlərə uyğun olaraq digər məlumatlar
        await transaction.save(); // dəyişiklikləri bazada saxlamaq üçün update işlədikdən sonra save funksiyasını işlətməlisiniz


    }

    static async markAllread(cookie){
      let user =   await this.findUserBySession(cookie)
      let transactions = await Transactions.findAll({where:{toUserId:user.id}})
      
      transactions.map(async (transaction)=>{
        transaction.notification = false
        await transaction.save()
      })

      

    }

    
    
}

module.exports = UserControl