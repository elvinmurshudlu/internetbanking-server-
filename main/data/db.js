const mysql = require("mysql2")
const config = require("../config")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.db.db,config.db.user,config.db.password,{
    host:config.db.host,
    dialect:"mysql"
})


async function connect(){

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    


}

connect()

module.exports = sequelize