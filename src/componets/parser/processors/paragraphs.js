import React, { useEffect } from "react";
import { RichText } from "@wordpress/block-editor";
import { restoreClassnameLinks } from "../../../utils";
import { everyNodeText, everyIs } from "./shared";

const isEmpty = obj => Object.entries(obj).length === 0; 

export const paragraphsProcessor = {
    priority: 10,
    name: "paragraphs@v1",
    test: function(node) {
      return everyIs(node.children, "p") &&
                node.children.every( child => isEmpty(child.attribs)) &&
                node.children.every( child => everyNodeText(child.children) )
          
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
            multiline="p"
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