import React from "react";
import HtmlToReact, { Parser } from "html-to-react";
import { isInlineTag } from "./../utils";

function isWhiteSpace(str) {
    return str.replace(/\s/g, "") === "";
}
function everyNodeText(children) {
    return (
        children &&
        children.length > 0 &&
        children.every(
            node =>
                (node.type && node.type === "text") ||
                (node.name && isInlineTag(node.name))
        )
    );
}
class HtmlParser {
    constructor() {
        this.htmlToReactParser = new Parser();
        this.processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
        this.instructions = [];
        this.defaultProcess = {
            shouldProcessNode: () => {
                return true;
            },
            processNode: this.processNodeDefinitions.processDefaultNode,
        };
    }
    replaceIframeBy(processNode) {
        const processIframe = {
            shouldProcessNode: (node) => {
                return node.name && node.name === "iframe";
            },
            processNode,
        };
        this.instructions.push(processIframe);
    }
    replaceImageBy(processNode) {
        const processImage = {
            shouldProcessNode: (node) => {
                return node.name && node.name === "img";
            },
            processNode,
        };
        this.instructions.push(processImage);
    }

    replaceLabelBy(processNode) {
        const processLabel = {
            shouldProcessNode: (node) => {
                if (this.isSvg(node)) {
                    return false;
                }
                return node.name && node.name === "label"
            },
            processNode,
        };

        this.instructions.push(processLabel);
    }
    replaceTextLineBy(processNode) {
        const processTextLine = {
            shouldProcessNode: (node) => {
                if (this.isSvg(node)) {
                    return false;
                }
                if (node.name && node.name === "label") {
                    return false
                }
                if (node.parent && everyNodeText(node.parent.children)) {
                    return false
                }
                return everyNodeText(node.children)
            },
            processNode,
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
        return [...this.instructions, this.defaultProcess];
    }

    parser(htmlInput) {
        return this.htmlToReactParser.parseWithInstructions(
            htmlInput,
            this.isValidNode,
            this.getInstructions()
        );
    }
}

export default HtmlParser;