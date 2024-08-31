import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item._id)}
        checked={item.Checked}
      />
      <label
        style={item.Checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item._id)}
      >
        {item.Item}
      </label>
      <FaTrashAlt
        role="button"
        onClick={() => handleDelete(item._id)}
        tabIndex="0"
        aria-label={`Delete ${item.Item}`}
      />
    </li>
  )
}

export default LineItem