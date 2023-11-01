const { DataTypes } = require("sequelize")
const sequelize = require("../data/db")

const Recipients = sequelize.define("Recipients", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  recipientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "AZN",
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

async function create() {
  await Recipients.sync({ force: true })

  await Recipients.bulkCreate([
    {
      accountNumber: "4146763952104222",
      userId: 1,
      recipientName: "Elvin Murshudlu",
    },
    {
      accountNumber: "5240809893438567",
      userId: 1,
      recipientName: "Elvin Murhudlu 123",
    },
    {
      accountNumber: "4578364739305179",
      userId: 1,
      recipientName: "Test",
    },
  ])
}

// create()

module.exports = Recipients
