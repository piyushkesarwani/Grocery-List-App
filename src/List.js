import React from "react";

export default function List({ items, removeItem, editItem }) {
  return (
    <div className="groceryList">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="singleList">
            <div className="listHeader">
              <p className="listTitle">{title}</p>
              <div className="btnGroup">
                <button className="btn edit" onClick={() => editItem(id)}>Edit</button>
                <button className="btn delete" onClick={() => removeItem(id)}>Delete</button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
