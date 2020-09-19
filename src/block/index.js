import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import save from "./save";
import icon from "./icon";

registerBlockType("heliblocks/heliblocks", {
  title: "Heliblocks",
  icon,
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
    store: {
      type: "string",
      default: "[]"
    },
    parser: {
      type: "string",
      default: ""
    },
    processors: {
      type: "array",
      default: []
    },
    encapsulated: {
      type: "boolean",
      default: false
    },
    id: {
      type: "string",
      default: "undefined"
    }
  },
  edit,
  save
});
