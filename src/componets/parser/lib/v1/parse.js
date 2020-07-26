import React from "react";
import HtmlToReact, { Parser } from "html-to-react";

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const defaultProcess = {
  shouldProcessNode: function () {
    return true;
  },
  processNode: processNodeDefinitions.processDefaultNode,
};

function isValidNode() {
  return true;
}

const parser = new Parser();

/**
 * 
 * @param {Object} config - Object config parse
 * @param {String} config.html - Html string to parse
 * @param {Array} config.processes - Instructions to parse html
 * @param {Array} config.preprocessing - Instructions before parse
 */
export const parse = ({ html, processes, preprocessing }) => {
  return parser.parseWithInstructions(
    html,
    isValidNode,
    [...processes, defaultProcess],
    preprocessing
  );
};
