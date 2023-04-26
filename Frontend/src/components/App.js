import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Create from "./createArea";

function App() {
  const [notesItem, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/posts")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  async function addItem(noteItem) {
    const response = await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteItem),
    });
    noteItem = await response.json();
    setItems((prevItems) => {
      return [...prevItems, noteItem];
    });
  }

  async function editItem(id, updatedItem) {
    const response = await fetch(`/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    if (response.ok) {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item._id === id) {
            return { ...item, ...updatedItem };
          }
          return item;
        })
      );
      setSelectedItem(null);
    } else {
      throw new Error("Failed to edit item");
    }
  }

  function deleteItem(id) {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((error) => console.error(error));
  }

  function handleEdit(id) {
    setSelectedItem(id);
  }

  function handleCancelEdit() {
    setSelectedItem(null);
  }

  return (
    <div>
      <Header />
      <main>
        <Create onAdd={addItem} />
        <div className="container">
          {notesItem.map((item, index) => (
            <Note
              key={item._id}
              id={item._id}
              title={item.title}
              content={item.content}
              onDelete={deleteItem}
              onEdit={handleEdit}
              isEditing={selectedItem === item._id}
              onSave={editItem}
              onCancelEdit={handleCancelEdit}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
