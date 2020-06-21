import React from "react";
import HtmlToReact from "html-to-react";
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

export function sortByPriotiy(a, b) {
  if (a.priority < b.priority) {
    return 1;
  }
  if (a.priority > b.priority) {
    return -1;
  }
  return 0;
}

export function isValidNode() {
  return true;
}

export const defaultProcess = {
  shouldProcessNode: function() {
    return true;
  },
  processNode: processNodeDefinitions.processDefaultNode
};
