import convert from "react-attr-converter";

const inlineTags = new Set([
  "span",
  "strong",
  "a",
  "em",
  "i",
  "sub",
  "sup",
  "abbr",
  "acronym",
  "code",
  "time",
  "var",
  "samp",
  "kbd",
  "code",
  "tt",
  "b",
  "big",
  "small",
  "cite",
  "dfn",
  "bdo"
]);
const multilineTag = new Set(["p", "li"]);

export function isInlineTag(tag) {
  return inlineTags.has(tag);
}

export function everyNodeText(children) {
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
export function isWhiteSpace(str) {
  return str.replace(/\s/g, "") === "";
}

export function isMultilineTag(tag) {
  return multilineTag.has(tag);
}

export function sortBy(arr, property) {
  return arr.sort((a, b) => {
    if (a.hasOwnProperty(property) && b.hasOwnProperty(property)) {
      return a[property] > b[property] ? -1 : 1;
    }

    if (a.hasOwnProperty(property)) return -1;
    if (b.hasOwnProperty(property)) return 1;

    return 0;
  });
}

export function attrsToProps(attrs) {
  return attrs.map(attribute => {
    let result = {};
    Object.keys(attribute).forEach(key => {
      const keyConverted = convert(key);
      result[keyConverted] = attribute[key];
    });
    return result;
  });
}
