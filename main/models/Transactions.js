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
      // allowNull:false
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
    },
    transferType:{
      type:DataTypes.STRING,
      defaultValue:"Bank Transfer"
    }
    ,
    transferHeader:{
      type:DataTypes.STRING,
      defaultValue:"Money Transfer to Elvin"
    }



    
})

async function create(){
    await Transactions.sync({force:true})

   await Transactions.bulkCreate([


    {
      amount:"-200",
      fromUserId:1,
      fromCard:"4146763952104222",
      toCard:"789798",
      toUserId:2 ,
      currency:"AZN"
    },
    {
        amount:"-123",
        fromUserId:1,
        fromCard:"4146763952104222",
        toCard:"789798",
        toUserId:2  
        ,
      currency:"AZN"
      },
      {
        amount:"-6743",
        fromUserId:1,
        fromCard:"4146763952104222",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-200",
        fromUserId:1,
        fromCard:"5240809893438567",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-200",
        fromUserId:1,
        fromCard:"5240809893438567",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"-865",
        fromUserId:1,
        fromCard:"4292570350861523",
        toCard:"789798",
        toUserId:2
        ,
      currency:"USD"
      },
      {
        amount:"-90",
        fromUserId:1,
        fromCard:"4292570350861523",
        toCard:"789798",
        toUserId:2
        ,
      currency:"AZN"
      },
      {
        amount:"1000000",
        fromUserId:2,
        fromCard:"5235415323584025",
        toCard:"789798",
        cardId:3  ,
        toUserId:1
        ,
      currency:"AZN"
      },
      {
        amount:"-1000000",
        fromUserId:3,
        fromCard:"5235415323584025",
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