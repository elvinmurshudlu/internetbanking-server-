const sequelize = require("../data/db")
const {DataTypes} = require("sequelize")

const Cards = sequelize.define("Cards",{
    id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey:true
    }
    ,
    cardNumber:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    currency:{
        type:DataTypes.STRING,
        defaultValue:"AZN"
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1000
    },
    cvv:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expireDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        defaultValue:"Debit"
    }
    
})


async function createCard(){
    await Cards.sync({force:true})

    await Cards.bulkCreate([
        {
           
            cardNumber:"4146763952104222",
            currency:"AZN",
            userId:1,
            amount:3000,
            cvv:321,
            expireDate:"12/34",
            type:"Virtual"

        },
        {
            
            cardNumber:"5240809893438567",
            currency:"USD",
            userId:1,
            cvv:321,
            expireDate:"12/34",
            type:"Virtual"

        },
        {
            
            cardNumber:"4292570350861523",
            currency:"EUR",
            userId:1,
            
            cvv:321,
            expireDate:"12/34",
            type:"Debit"

        },
        {
            
            cardNumber:"5235415323584025",
            currency:"AZN",
            userId:1,
            
            cvv:321,
            expireDate:"12/34",
            type:"Credit"

        },
    ])
}

createCard()

module.exports = Cards