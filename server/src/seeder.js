// add or remove data from database

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenses = require("./data/expenses");
const Expense = require("./models/expenseModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Expense.deleteMany();

    await Expense.insertMany(expenses);

    console.log("Data Imported");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Expense.deleteMany();

    console.log("Data Destroyed");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
