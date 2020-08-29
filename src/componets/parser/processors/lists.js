import React from "react";
import { RichText } from "@wordpress/block-editor";
import { restoreClassnameLinks } from "../../../utils";

export const listsProcessor = {
    priority: 10,
    name: "lists@v1",
    test: function(node) {
        return node.name === "ol" || node.name === "ul"          
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
            multiline="li"
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