import React from "react";
import { TextControl } from "@wordpress/components";
import { MediaFill } from "./../../slotfill";

export const iframeProcessor = {
  priority: 5,
  name: "iframe@v1",
  test: function(node) {
    return node.name && node.name === "iframe";
  },
  edit: ({ attributes, setAttribute, id }) => {
    return (
      <>
        <iframe key={id} {...attributes}/>
        <MediaFill>
            <TextControl
                label="Iframe"
                value={attributes.src}
                onChange={src => setAttribute({src})}
            />
        </MediaFill>
      </>
    );
  },
  save: ({ attributes, id }) => {
    return (
        <iframe key={id} {...attributes}/>
    );
  }
};