import React from "react";
import { timeFunc } from "../timeFunc";

const ReadOnlyRow = ({ expense, editExpenseHandler, deleteExpenseHandler }) => {
  return (
    <tr>
      <td data-label="Description">{expense.name}</td>
      <td data-label="Amount">{expense.amount}</td>
      <td data-label="Taxes (15%)">{(expense.amount * 0.15).toFixed(2)}</td>
      <td data-label="Date">{timeFunc(expense)}</td>
      <td>
        <div className="buttons">
          <button className="edit" onClick={() => editExpenseHandler(expense)}>
            Edit
          </button>
          <div className="delete" onClick={() => deleteExpenseHandler(expense.id)}>
            Delete
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
