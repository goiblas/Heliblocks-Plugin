import React from "react";
import { textProcessor } from "..";
import { render } from "@testing-library/react";

import parse from "../..";
import Store from "../../../store";

describe("Text", () => {
  test("should process text edit", () => {
    const store = new Store([], () => {});
    const Result = parse({
      html: "<p>Hello World!</p>",
      store,
      processors: [textProcessor]
    });
    const { container } = render(<Result.Edit />);
    expect(container).toMatchSnapshot();
  });
});
