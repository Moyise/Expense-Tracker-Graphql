import React from "react";
import { timeFunc } from "../timeFunc";

const EditableRow = ({ editFormData, handleEditFormChange, cancelFormEditHandler }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter a name"
          className="editInput"
          value={editFormData.name}
          onChange={handleEditFormChange}
          autoComplete="off"
          maxLength={40}
        />
      </td>
      <td>
        <input
          type="number"
          name="amount"
          required
          placeholder="Enter an amount"
          className="editInput"
          value={editFormData.amount}
          onChange={handleEditFormChange}
          autoComplete="off"
          max="1000"
        />
      </td>
      <td>{(editFormData.amount * 0.15).toFixed(2)}</td>
      <td>{timeFunc(editFormData)}</td>
      <td>
        <div className="buttons">
          <button type="submit" className="save">
            Save
          </button>
          <div className="cancel" onClick={cancelFormEditHandler}>
            Cancel
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EditableRow;
