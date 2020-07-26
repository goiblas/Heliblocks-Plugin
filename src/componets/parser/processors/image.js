import React from "react";
import ImageUpload from "../../imageUpdoad"
import { MediaFill } from "./../../slotfill";

export const imageProcessor = {
  priority: 3,
  name: "image@v1",
  test: function(node) {
    return node.name && node.name === "img";
  },
  edit: ({ attributes, setAttribute, id }) => {
    return (
      <>
        <img key={id} {...attributes}/>
        <MediaFill>
          <ImageUpload 
            src={attributes.src}
            onChange={setAttribute}
          />
        </MediaFill>
      </>
    );
  },
  save: ({ attributes, id }) => {
    return (
      <img key={id} {...attributes}/>
    );
  }
};
