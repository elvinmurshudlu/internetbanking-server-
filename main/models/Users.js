const {DataTypes} = require("sequelize")
const sequelize = require("../data/db")

const Users = sequelize.define("Users",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false


    }
})


async function createUser(){
    await Users.sync({force:true})
    console.log("Users yaradildi")


    await Users.bulkCreate([{
        id:1,
        email:"elvin@gmail.com",
        password:"elvin2001"
    },
    {
        id:2,
        email:"elvin2001@gmail.com",
        password:"elvin2001"
    },
    {
        id:3,
        email:"elvin20012001@gmail.com",
        password:"elvin2001"
    }])
    // await Users.create({

        
    //     id:1,
    //     email:"elvin2001@gmail.com",
    //     password:"elvin2001"
    

    // })

    console.log("Melumat elave olundu")

}
createUser()

module.exports = Users