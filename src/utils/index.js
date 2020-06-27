import { __ } from "@wordpress/i18n";
import { TEXT_DOMAIN } from "./../config";

/**
 * i18n 
 * 
 * @param {string} text Text to internationalize
 */
export const i18n = text => __(text, TEXT_DOMAIN);

/**
 * Sorty array by property
 * 
 * @param {array} arr Anordered array
 * @param {string} property Property to sort 
 */
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

