import React from "react";
import { Fill } from "react-slot-fill";

export const imageProcessor = {
  priority: 8,
  test: function(node) {
    return node.name && node.name === "iframe";
  },
  edit: ({ attributes, setAttribute }) => {
    return (
      <>
        <img
          style={{ outline: "2px solid red" }}
          src={attributes.src}
          alt={attributes.alt}
        />
        <Fill name="Inspector.media">
          <input
            type="text"
            value={attributes.src}
            onChange={ev => setAttribute({ src: ev.target.value })}
          />
        </Fill>
      </>
    );
  },
  save: ({ attributes }) => {
    return (
      <img
        style={{ outline: "2px solid green" }}
        src={attributes.src}
        alt={attributes.alt}
      />
    );
  }
};
