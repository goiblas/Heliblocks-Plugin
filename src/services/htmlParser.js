import React from "react";
import HtmlToReact, { Parser } from "html-to-react";
import {
  everyNodeText,
  isWhiteSpace,
  isInlineTag,
  isMultilineTag,
  sortBy
} from "./utils";

class HtmlParser {
  constructor() {
    this.htmlToReactParser = new Parser();
    this.processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.instructions = [];
    this.defaultProcess = {
      shouldProcessNode: info => {
        console.log(info);
        return true;
      },
      processNode: this.processNodeDefinitions.processDefaultNode
    };
  }
  replaceImageBy(processNode) {
    const processImage = {
      priority: 10,
      shouldProcessNode: node => {
        return node.name && node.name === "img";
      },
      processNode
    };
    this.instructions.push(processImage);
  }
  replaceTextLineBy(processNode) {
    const processTextLine = {
      priority: 9,

      shouldProcessNode: node => {
        if (this.isSvg(node)) {
          return false;
        }
        if (node.parent && this.isMultiline(node.parent)) {
          return false;
        }
        return (
          node.children &&
          everyNodeText(node.children) &&
          node.name &&
          !isInlineTag(node.name)
        );
      },
      processNode
    };

    this.instructions.push(processTextLine);
  }

  isMultiline(node) {
    return (
      node.children &&
      node.children.every(child => child.name && isMultilineTag(child.name))
    );
  }
  replaceMultilineBy(processNode) {
    const processTextLine = {
      priority: 8,
      shouldProcessNode: node => {
        if (this.isSvg(node)) {
          return false;
        }
        if (node.parent && this.isMultiline(node.parent)) {
          return false;
        }

        return (
          node.children &&
          (node.children.every(child => child.name && child.name === "p") ||
            node.children.every(child => child.name && child.name === "li"))
        );
      },
      processNode
    };
    this.instructions.push(processTextLine);
  }

  isValidNode(node) {
    if (
      node.type &&
      node.type === "text" &&
      node.data &&
      isWhiteSpace(node.data)
    ) {
      return false;
    }
    return true;
  }
  isSvg(node) {
    if (node.name && node.name === "svg") {
      return true;
    }
    if (node.parent) {
      return this.isSvg(node.parent);
    }
    return false;
  }
  getInstructions() {
    const instructionsSorted = sortBy(this.instructions, "priority");
    return [...instructionsSorted, this.defaultProcess];
  }

  parser(htmlInput) {
    const result = this.htmlToReactParser.parseWithInstructions(
      htmlInput,
      this.isValidNode,
      this.getInstructions()
    );
    return <div>{result}</div>;
  }
}

export default HtmlParser;
