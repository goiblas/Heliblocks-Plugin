import React, { useState } from "react";
import throttle from "lodash.throttle";
import { RichText } from "@wordpress/block-editor";

const inlineTags = new Set(["span", "em", "i", "u", "strong", "a"]);

function everyNodeText(children = []) {
  return (
    children.length > 0 &&
    children.every(
      node =>
        (node.type && node.type === "text") ||
        (node.name && inlineTags.has(node.name))
    )
  );
}
function isSvg(node) {
  if (node.name && node.name === "svg") {
    return true;
  }
  if (node.parent) {
    return isSvg(node.parent);
  }
  return false;
}
export const textProcessor = {
  priority: 1,
  test: function(node) {
    return (
      !isSvg(node) &&
      node.children &&
      everyNodeText(node.children) &&
      node.name &&
      !inlineTags.has(node.name)
    );
  },
  edit: ({ attributes, value, setValue, id }) => {
    return (
      <RichText
        key={id}
        value={value}
        onChange={throttle(content => setValue(content), 1000, {
          trailing: false
        })}
        tagName={"div"}
        className={attributes.class}
      />
    );
  },
  save: ({ attributes, value, id }) => {
    return (
      <div style={{ border: "2px solid red" }} key={id}>
        {value}
      </div>
    );
  }
};
