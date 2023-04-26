import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [noteItem, setItem] = useState({
    title: "",
    content: ""
  });
  const [isChange, setChange] = useState(false);
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);


  useEffect(() => {
    if (isChange && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isChange]);

  function hanldeClick() {
    setChange(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

 function handleKeyDown(event) {
  if (isChange) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      titleInputRef.current.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      contentInputRef.current.focus();
    }
  }
}

  function submit(event) {
    props.onAdd(noteItem);
    event.preventDefault();
    setItem({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="create-note">
        {isChange && (
          <input
            name="title"
            onChange={handleChange}
            value={noteItem.title}
            placeholder="Title"
            ref={titleInputRef}
          />
        )}
        <textarea
  name="content"
  onChange={handleChange}
  onClick={hanldeClick}
  onKeyDown={handleKeyDown}
  value={noteItem.content}
  placeholder="Take a note..."
  rows={isChange ? 3 : 1}
  ref={contentInputRef}
/>

        {isChange && (
          <Zoom in={isChange}>
            <Fab onClick={submit}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;

