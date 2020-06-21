import React from "react";

export const orphanLinkProcessor = {
  priority: 0,
  test: function(node) {
    return node.name && node.name === "a";
  },
  edit: ({ attributes, value, setValue }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={ev => setValue(ev.target.value)}
        {...attributes}
      />
    );
  },
  save: (node, children, index) => {
    return (
      <div key={index} data-testid="save-text">
        {children}
      </div>
    );
  }
};
