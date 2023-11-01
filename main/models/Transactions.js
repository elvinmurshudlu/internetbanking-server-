const sequelize = require("../data/db")
const { DataTypes } = require("sequelize")

const Transactions = sequelize.define("Transactions", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  currency: {
    type: DataTypes.STRING,
  },
  connectedCard: {
    type: DataTypes.STRING,
  },
  connectedUser: {
    type: DataTypes.STRING,
  },
  notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  ownerCard:{
    type:DataTypes.STRING,

  }
})

// Transactions.afterUpdate((instance, options) => {
//   console.log('afterUpdate hook called');
// });

async function create() {
  await Transactions.sync({ force: true })

  await Transactions.bulkCreate([
    {
      id: 1,
      amount: "2000000",
      currency: "AZN",
      userId: 1,
      type: "Bank Transfer",
      connectedCard: "4146763952104222",
      connectedUser: "Elvin Murshudlu",
      ownerCard:"5235415323584025"
    },
    {
      id: 2,
      amount: "3000",
      currency: "AZN",
      userId: 1,
      type: "Bank Transfer",
      connectedCard: "4146763952104222",
      connectedUser: "Elvin Murshudlu",
      ownerCard:"5235415323584025"

    },
    {
      id: 3,
      amount: "1000",
      currency: "AZN",
      userId: 1,
      type: "Bank Transfer",
      connectedCard: "4146763952104222",
      connectedUser: "Elvin Murshudlu",
      ownerCard:"5235415323584025"

    },
    {
      id: 4,
      amount: "200",
      currency: "AZN",
      userId: 1,
      type: "Bank Transfer",
      connectedCard: "4146763952104222",
      connectedUser: "Elvin Murshudlu",
      ownerCard:"5235415323584025"

    },
  ])
}

// create()

module.exports = Transactions
