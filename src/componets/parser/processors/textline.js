import React from "react";
import { RichText } from "@wordpress/block-editor";
import { restoreClassnameLinks } from "../../../utils";
const inlineTags = new Set(["span", "em", "i", "u", "strong", "a", "label" ]);

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

export const textlineProcessor = {
    priority: 2,
    name: "textline@v1",
    test: function(node) {
      return (
        node.children &&
        everyNodeText(node.children) &&
        node.name &&
        !inlineTags.has(node.name)
      );
    },
    edit: ({ attributes, value, setValue, id, name }) => {
      const onChange = content => {
        setValue(restoreClassnameLinks(value, content));
      };

      return (
          <RichText
          value={value}
          onChange={onChange}
          tagName={name}
          key={id}
          {...attributes}

        />
      );
    },
    save: ({ attributes, value, id, name }) => {
      return (    
          <RichText.Content value={value} tagName={name} key={id} {...attributes} />
      );
    }
  };