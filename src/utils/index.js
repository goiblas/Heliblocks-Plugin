import { __ } from "@wordpress/i18n";

/**
 * i18n 
 * 
 * @param {string} text Text to internationalize
 */
export const i18n = text => __(text, "heliblocks");

/**
 * Restore classname links from backup
 * 
 * @param {sring} backup Before html
 * @param {string} content Current html
 */
export function restoreClassnameLinks(backup, content) {
  const backupDOM = parseString(backup);
  const contentDOM = parseString(content);
  const backupLinks = getLinks(backupDOM);
  const contentLinks = getLinks(contentDOM);

  if (backupLinks.length !== contentLinks.length) {
    return content;
  }

  backupLinks.forEach((backupLink, index) => {
    contentLinks[index].className = backupLink.classList.toString();
  });

  return contentDOM.body.innerHTML;
}

const parser = new DOMParser();
const parseString = string => parser.parseFromString(string, "text/html");
const getLinks = dom => dom.querySelectorAll("a");

/**
 * 
 * @param {string} tag Tag html
 * @return {boolean}
 */
export function isInlineTag(tag) {
    return inlineTags.has(tag);
}

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

