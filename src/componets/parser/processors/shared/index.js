const inlineTags = new Set(["span", "em", "i", "u", "strong", "a", "label" ]);

export function isInlineTag(tag) {
  return inlineTags.has(tag);
}

export function everyNodeText(children = []) {
  return (
    children.length > 0 &&
    children.every(
      node =>
        (node.type && node.type === "text") ||
        (node.name && inlineTags.has(node.name))
    )
  );
}

export function everyIs (children = [], tag) {
  return children.length > 0 && children.every(child => child?.name === tag);
} 