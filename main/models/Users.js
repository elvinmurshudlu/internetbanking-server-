const {DataTypes} = require("sequelize")
const sequelize = require("../data/db")

const Users = sequelize.define("Users",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,
    surname:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,


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


    await Users.bulkCreate([
        {
        name:"Elvin",
        surname:"Murshudlu",
        email:"elvin@gmail.com",
        password:"elvin2001"
    },
    {
        name:"Elvin",
        surname:"Murshudlu",
        email:"elvin2001@gmail.com",
        password:"elvin2001"
    },
    {
        name:"Elvin",
        surname:"Murshudlu",
        email:"elvin20012001@gmail.com",
        password:"elvin2001"
    },
    {
        name:"Elvin",
        surname:"Murshudlu",
        email:"murshudlu@gmail.com",
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