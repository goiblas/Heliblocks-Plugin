const parser = new DOMParser();
const parseString = string => parser.parseFromString(string, "text/html");
const getLinks = dom => dom.querySelectorAll("a");

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
