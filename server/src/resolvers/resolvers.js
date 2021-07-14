const Expense = require("../models/expenseModel");

const resolvers = {
  // Queries
  Query: {
    getExpenses: async () => {
      try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        return expenses;
      } catch (error) {
        throw new Error("No expenses found");
      }
    },
  },

  // Mutations
  Mutation: {
    addExpense: async (_, { name, amount }) => {
      try {
        const expense = new Expense({
          name,
          amount,
        });

        const createdExpense = await expense.save();
        if (createdExpense) {
          return createdExpense;
        } else {
          throw new Error("Expense not Added");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updateExpense: async (_, { id, name, amount }) => {
      try {
        const expense = await Expense.findById(id);

        if (expense) {
          expense.name = name || expense.name;
          expense.amount = amount || expense.amount;

          const updatedExpense = await expense.save();
          return updatedExpense;
        } else {
          throw new Error("Expense not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteExpense: async (_, { id }) => {
      try {
        const expense = await Expense.findById(id);
        if (expense) {
          await expense.remove();
          return true;
        } else {
          throw new Error("Expense not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;
