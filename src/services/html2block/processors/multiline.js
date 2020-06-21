import React from "react";
import { RichText } from "@wordpress/block-editor";

export const multilineProcessor = {
  priority: 10,
  test: function(node) {
    return (
      node.name &&
      node.children.length > 0 &&
      (node.children.every(child => child.name === "p") ||
        node.children.every(child => child.name === "li"))
    );
  },
  edit: ({ attributes, value, setValue, name, id }) => {
    return (
      <RichText
        key={id}
        value={value}
        onChange={setValue}
        tagName={"div"}
        className={attributes.class}
        multiline={"p"}
      />
    );
  },
  save: ({ attributes, value, setValue, name, id }) => {
    return <div key={id}>{value}</div>;
  }
};
