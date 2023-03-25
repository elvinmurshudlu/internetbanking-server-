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
    }



    
})

async function create(){
    await Transactions.sync({force:true})

   await Transactions.bulkCreate([


    {
      amount:"200",
      fromUserId:1,
      fromCard:"12345678",
      toCard:"789798",
      toUserId:2 
    },
    {
        amount:"123",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2  
      },
      {
        amount:"6743",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2
      },
      {
        amount:"200",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2
      },
      {
        amount:"200",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2
      },
      {
        amount:"865",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2
      },
      {
        amount:"90",
        fromUserId:1,
        fromCard:"12345678",
        toCard:"789798",
        toUserId:2
      },
      {
        amount:"00000000",
        fromUserId:2,
        fromCard:"12345678",
        toCard:"789798",
        cardId:3  ,
        toUserId:1
      },
      

   ])
}


create()

module.exports = Transactions