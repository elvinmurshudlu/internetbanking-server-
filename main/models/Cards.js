const sequelize = require("../data/db")
const { DataTypes } = require("sequelize")

const Cards = sequelize.define("Cards", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "AZN",
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "1000",
  },
  cvv: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expireDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "Debit",
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  security: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pin: {
    type: DataTypes.STRING,
    defaultValue: "1234",
  },
  accountNumber: {
    type: DataTypes.STRING,
    defaultValue: "UKC000000000000001200642",
  },
  cardHolder: {
    type: DataTypes.STRING,
    defaultValue: "Elvin Murshudlu",
  },
})

async function createCard() {
  await Cards.sync({ force: true })

  await Cards.bulkCreate([
    {
      cardNumber: "4146763952104222",
      currency: "AZN",
      userId: 2,
      amount: 3000,
      cvv: 321,
      expireDate: "12/34",
      type: "Virtual",
    },
    {
      cardNumber: "5240809893438567",
      currency: "USD",
      userId: 2,
      cvv: 321,
      expireDate: "12/34",
      type: "Virtual",
    },
    {
      cardNumber: "4292570350861523",
      currency: "EUR",
      userId: 1,

      cvv: 321,
      expireDate: "12/34",
      type: "Debit",
    },
    {
      cardNumber: "5235415323584025",
      currency: "AZN",
      userId: 1,

      cvv: 321,
      expireDate: "12/34",
      type: "Credit",
    },
  ])
}

// createCard()

module.exports = Cards
