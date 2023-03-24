const sequelize  = require("../data/db")
const {DataTypes} = require("sequelize")



 const Transactions = sequelize.define("Transactions",{
    id:{
        autoIncrement:true,
        type:DataTypes.INTEGER,
        primaryKey:true
    }
    ,
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cardId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false

    }


    
})

async function create(){
    await Transactions.sync({force:true})

   await Transactions.bulkCreate([


    {
      amount:200,
      userId:1,
      cardId:1  
    },
    {
        amount:123,
        userId:1,
        cardId:1  
      },
      {
        amount:6743,
        userId:1,
        cardId:1  
      },
      {
        amount:200,
        userId:1,
        cardId:2  
      },
      {
        amount:200,
        userId:1,
        cardId:2  
      },
      {
        amount:865,
        userId:1,
        cardId:3  
      },
      {
        amount:90,
        userId:1,
        cardId:3  
      },
      {
        amount:21,
        userId:2,
        cardId:3  
      },

   ])
}


create()

module.exports = Transactions