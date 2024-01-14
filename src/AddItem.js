import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form onSubmit={handleSubmit} className="addForm">
      <label htmlFor="addItem">Add Item</label>
      <input
      ref={inputRef}
        type="text"
        autoFocus
        id="addItem"
        placeholder="Add item"
        value={newItem}
        onChange={(e)=>setNewItem(e.target.value)}
        required
      />
      <button type="submit" onClick={()=>inputRef.current.focus()} aria-label="Add item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
