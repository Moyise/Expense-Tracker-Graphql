import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import EditableRow from "../../components/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import "./home.scss";
import { GET_EXPENSES } from "../../graphql/queries";
import { ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_EXPENSE } from "../../graphql/mutations";

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_EXPENSES);
  const [addExpense] = useMutation(ADD_EXPENSE);
  const [updateExpense] = useMutation(UPDATE_EXPENSE);
  const [deleteExpense] = useMutation(REMOVE_EXPENSE);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: "",
  });

  const [editExpenseId, setEditExpenseId] = useState(null);

  const subTotal = data?.getExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  const taxTotal = data?.getExpenses.reduce(
    (acc, expense) => acc + expense.amount * 0.15,
    0
  );

  // -- Close new expense form -- //
  const closeHandler = () => {
    setOpen(false);
    setName("");
    setAmount("");
  };

  // -- Submit new expense -- //
  const submitHandler = (e) => {
    e.preventDefault();
    addExpense({
      variables: { name, amount: Number(amount) },
      refetchQueries: [{ query: GET_EXPENSES }],
    });
    setOpen(false);
    setName("");
    setAmount("");
  };

  // -- Edit expense -- //
  const editExpenseHandler = (expense) => {
    setEditExpenseId(expense.id);
    setEditFormData({
      name: expense.name,
      amount: expense.amount,
      updatedAt: expense.updatedAt,
    });
  };

  // -- Handle form input  -- //
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  // -- Submit edited expense -- //
  const editFormSubmitHandler = (e) => {
    e.preventDefault();
    updateExpense({
      variables: {
        id: editExpenseId,
        name: editFormData.name,
        amount: Number(editFormData.amount),
      },
      refetchQueries: [{ query: GET_EXPENSES }],
    });
    setEditExpenseId(null);
  };

  // -- Cancel expense edit --//
  const cancelFormEditHandler = () => {
    setEditExpenseId(null);
  };

  // -- Delete expense -- //
  const deleteExpenseHandler = (expenseId) => {
    deleteExpense({
      variables: { id: expenseId },
      refetchQueries: [{ query: GET_EXPENSES }],
    });
  };

  return (
    <>
      <div className="homeContainer">
        <h1 className="title">Expense tracker</h1>
        <div className="descWrap">
          <div className="desc">
            <p>
              The sub-total of expenses is <strong>{subTotal}$</strong>
            </p>
            <p>
              The total with taxes is <strong>{subTotal + taxTotal}$</strong>
            </p>
          </div>
          <div className="addExpenseWrap">
            <button onClick={() => setOpen(true)} className="addButton">
              Add new expense
            </button>
            <div className={open ? "expenseAdd open" : "expenseAdd"}>
              <form className="expenseForm" onSubmit={submitHandler}>
                <div className="FormGroup">
                  <label className="formLabel">Expense Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="formInput"
                    required
                    placeholder="Enter a name"
                    autoComplete="off"
                    maxLength={40}
                  />
                </div>
                <div className="FormGroup">
                  <label className="formLabel">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="formInput"
                    required
                    placeholder="Enter an amount"
                    autoComplete="off"
                    max="1000"
                  />
                </div>

                <div className="buttonsWrap">
                  <button type="submit" className="formSubmit">
                    Save
                  </button>
                  <div className="cancel" onClick={closeHandler}>
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {loading ? (
          <i className="fas fa-spinner"></i>
        ) : error ? (
          <p>{error}</p>
        ) : (
          data && (
            <form onSubmit={editFormSubmitHandler}>
              <table className="table">
                <thead>
                  <tr className="trTest">
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Taxes (15%)</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.getExpenses.map((expense) => (
                    <Fragment key={expense.id}>
                      {editExpenseId === expense.id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          cancelFormEditHandler={cancelFormEditHandler}
                        />
                      ) : (
                        <ReadOnlyRow
                          expense={expense}
                          editExpenseHandler={editExpenseHandler}
                          deleteExpenseHandler={deleteExpenseHandler}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          )
        )}
      </div>
    </>
  );
};

export default HomeScreen;
