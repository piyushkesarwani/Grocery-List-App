import React, { useState } from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";

function App() {
  //useState Elements
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Item cannot be empty')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Edited Successfully');
    } else {
      showAlert(true, 'success', 'Item Added Successfully')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearItems = () => {
    showAlert(true, 'danger', 'All Items are removed')
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item is Deleted')
    setList(list.filter((listItem) => listItem.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg});
  }

  return (
    <>
      <section className="groceryContainer">
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h1 className="title">Grocery List Application</h1>
        <form onSubmit={handleSubmit} className="formGroup">
          <div className="header">
            <input
              type="text"
              placeholder="Enter any list Item"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn">
              {isEditing ? 'Edit Item' : "Add Item"}
            </button>
          </div>
          <List items={list} removeItem = {removeItem} editItem={editItem} />
        </form>

        {list.length > 0 && (
            <button className="btn clearBtn" onClick={clearItems}>Clear All Items</button>
        )}
      </section>
    </>
  );
}

export default App;
