import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteItem, setItem] = useState({
    title: props.title,
    content: props.content
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  async function handleSave(event) {
    event.preventDefault();
    try {
      await props.onSave(props.id, noteItem);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <form className="edit-note">
          <input
            name="title"
            onChange={handleChange}
            value={noteItem.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={noteItem.content}
            placeholder="Take a note..."
            rows={3}
          />
          <div className="">
            <button  onClick={handleSave}>
              Save
            </button>
            <button
              
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h4>{props.title}</h4>
          <p>{props.content}</p>
          <div className="note__actions">
            <button className="note__action" onClick={() => setIsEditing(true)}>
              <EditOutlinedIcon />
            </button>
            <button className="note__action" onClick={() => props.onDelete(props.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
