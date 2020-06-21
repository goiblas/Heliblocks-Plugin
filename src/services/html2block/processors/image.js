import React from "react";
import { Fill } from "react-slot-fill";

export const imageProcessor = {
  priority: 3,
  test: function(node) {
    return node.name && node.name === "img";
  },
  edit: ({ attributes, setAttribute }) => {
    return (
      <>
        <img
          style={{ outline: "2px solid red" }}
          src={attributes.src}
          alt={attributes.alt}
        />
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
