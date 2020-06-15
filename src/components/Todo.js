import React, { useState } from "react";

export default ({ toggleComplete, todo, onDelete, onEdit }) => {
  const [isEditting, setIsEditting] = React.useState(false);

  const setEdit = () => {
    setIsEditting(!isEditting);
  };

  const editComplete = (e) => {
    if (e.key === "Enter") {
      setIsEditting(!isEditting); 
    }
  };

  return (
      <li className="todo">
        <span
          onDoubleClick={() => setEdit()}
          onClick={() => toggleComplete()}
          style={{
            display: isEditting ? "none" : " block",
            textDecoration: todo.complete ? "line-through" : ""
          }}
        >
          {todo.text}
        </span>
        <input
          className="todo__edit"
          type="text"
          value={todo.text}
          onChange={(e) => onEdit(e)}
          onKeyDown={(e) => editComplete(e)}
          style={{
            display: isEditting ? "block" : " none",
          }}
        />
        <span className="todo__btnDelete" onClick={onDelete}><i class="fa fa-trash-alt"></i></span>
      </li>
  );
};
