import React from "react";
import { RichText } from "@wordpress/block-editor";
import { restoreClassnameLinks } from "../../../utils";
import { everyNodeText, isInlineTag } from "./shared";

export const textlineProcessor = {
    priority: 2,
    name: "textline@v1",
    test: function(node) {
      return (
        !isInlineTag(node.name) && everyNodeText(node.children)
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