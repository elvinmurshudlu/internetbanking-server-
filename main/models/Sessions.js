const sequelize = require("../data/db")
const { DataTypes } = require("sequelize")

const Sessions = sequelize.define("Sessions", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  sessionCode: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

async function create() {
  await Sessions.sync({ force: true })
  console.log("Session Yaradildi")

  await Sessions.create({
    sessionCode: "sldjfhlskjdfhskjdbflksjdf",
    userId: 1,
  })

  console.log("istifadeci elave-----------------------")
}

// create()

module.exports = Sessions
