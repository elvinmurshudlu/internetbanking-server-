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
        type:DataTypes.STRING,
        allowNull:false
    },
    fromUserId:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    toUserId:{
      
      type:DataTypes.STRING,
      allowNull:false
    }
    ,
    fromCard:{
      type:DataTypes.STRING,
      allowNull:false
    }
    ,
    toCard:{
      type:DataTypes.STRING,
      allowNull:true
    },
    currency:{
      type:DataTypes.STRING,
      allowNull:false
    }
    



    
})

async function create(){
    await Transactions.sync({force:true})

   await Transactions.bulkCreate([


    {
      amount:"-200",
      fromUserId:1,
      fromCard:"1234567812345678",
      toCard:"789798",
      toUserId:2 ,
      currency:"AZN"
    },
    {
        amount:"-123",
        fromUserId:1,
        fromCard:"1234567812345678",
        toCard:"789798",
        toUserId:2  
        ,
      currency:"AZN"
      },
      {
        amount:"-6743",
        fromUserId:1,
        fromCard:"1234567812345678",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-200",
        fromUserId:1,
        fromCard:"4169653478906776",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-200",
        fromUserId:1,
        fromCard:"4169653478906776",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-865",
        fromUserId:1,
        fromCard:"4169653478906776",
        toCard:"789798",
        toUserId:2
        ,
      currency:"USD"
      },
      {
        amount:"-90",
        fromUserId:1,
        fromCard:"7865785423097865",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"1000000",
        fromUserId:2,
        fromCard:"7865785423097865",
        toCard:"789798",
        cardId:3  ,
        toUserId:1
        ,
      currency:"AZN"
      },
      {
        amount:"-1000000",
        fromUserId:2,
        fromCard:"7865785423097865",
        toCard:"789798",
        cardId:3  ,
        toUserId:1
        ,
      currency:"AZN"
      },
      

   ])
}


create()

module.exports = Transactions