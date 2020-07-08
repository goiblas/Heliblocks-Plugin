import { restoreClassnameLinks } from ".";

describe("Restore classname links", () => {
  test("should restore classnames from backup content", () => {
    const old = "<a href='#' class='hello world'>content</a>";
    const newContent = "<a href='https://google.com'>new content</a>";

    const contentExpected =
      '<a href="https://google.com" class="hello world">new content</a>';
    expect(restoreClassnameLinks(old, newContent)).toContain(contentExpected);
  });
  test("should return content when remove link ", () => {
    const old =
      "<a href='#' class='hello'>content</a><a href='#' class='world'>content</a>";
    const newContent = "<a href='#' class='hello'>content</a>";
    expect(restoreClassnameLinks(old, newContent)).toContain(newContent);
  });
});