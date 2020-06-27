import { sortBy, restoreClassnameLinks } from ".";

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

describe('sortBy', () => {
    test('should sort by property', () => {
        const origin = [
            { priority: 10 },
            { priority: 20 },
            { withOutPrioriy: 100 },
            { priority: 20, other: 1 }
        ]
        const expected = [
            { priority: 20 },
            { priority: 20, other: 1 },
            { priority: 10 },
            { withOutPrioriy: 100 }
        ]
        expect( sortBy(origin, 'priority') ).toStrictEqual( expected )
    });
})