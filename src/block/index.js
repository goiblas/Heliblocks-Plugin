import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import save from "./save";

import { TEXT_DOMAIN } from "./../config";

registerBlockType("lab-heliblock-builder/lab-heliblock-builder", {
  title: __("Heliblock Builder", TEXT_DOMAIN),
  icon: "lock",
  category: "layout",
  supports: {
    align: true
  },
  attributes: {
    isChoosed: {
      type: "boolean",
      default: false
    },
    html: {
      type: "string",
      default: ""
    },
    css: {
      type: "string",
      default: ""
    },
    variables: {
      type: "array",
      default: []
    },
    wrapperClassname: {
      type: "string",
      default: ""
    },
    // alignment: {
    //   type: "string",
    //   default: "normal"
    // },
    store: {
      type: "string",
      default: "[]"
    }
  },
  edit,
  save
});
