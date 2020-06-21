import React from "react";
import parse from "..";
import { render, screen } from "@testing-library/react";
import processor from "./__mocks__/processor";
import mockStore from "./__mocks__/store";

describe("Html2Blocks", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("should return valid html", () => {
    const Result = parse({
      store: mockStore,
      html: "<p>Hello World!</p>",
      processors: []
    });
    render(<Result.Edit />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });

  test("should call methods from edit", () => {
    processor.test.mockReturnValueOnce(true);
    processor.edit.mockReturnValueOnce(null);

    mockStore.get.mockReturnValueOnce({
      value: "Hello World!",
      attributes: { "data-test": "attribute-value" }
    });
    const Result = parse({
      store: mockStore,
      html: "<p data-test='attribute-value'>Hello World!</p>",
      processors: [processor]
    });
    render(<Result.Edit />);

    // store methods
    expect(mockStore.has).toBeCalledWith(0);
    expect(mockStore.set).toBeCalledWith(0, {
      attributes: { "data-test": "attribute-value" },
      value: "Hello World!"
    });

    // Processor methods
    expect(processor.test).toBeCalled();
    expect(processor.edit).toBeCalledWith(
      expect.objectContaining({
        attributes: { "data-test": "attribute-value" },
        value: "Hello World!",
        setAttribute: expect.any(Function),
        setValue: expect.any(Function),
        name: "p",
        id: expect.any(Number)
      })
    );
  });

  test("should call methods from save", () => {
    processor.test.mockReturnValueOnce(true);
    processor.save.mockReturnValueOnce(null);

    mockStore.get.mockReturnValueOnce({
      value: "Hello World!",
      attributes: { "data-test": "attribute-value" }
    });
    const Result = parse({
      store: mockStore,
      html: "<p data-test='attribute-value'>Hello World!</p>",
      processors: [processor]
    });
    render(<Result.Save />);

    // store methods
    expect(mockStore.has).toBeCalledWith(0);
    expect(mockStore.set).toBeCalledWith(0, {
      attributes: { "data-test": "attribute-value" },
      value: "Hello World!"
    });

    // Processor methods
    expect(processor.test).toBeCalled();
    expect(processor.save).toBeCalledWith(
      expect.objectContaining({
        attributes: { "data-test": "attribute-value" },
        value: "Hello World!",
        setAttribute: expect.any(Function),
        setValue: expect.any(Function),
        name: "p",
        id: expect.any(Number)
      })
    );
  });

  test("should prioritize processers", () => {
    const processor1 = {
      priority: 1,
      test: jest.fn().mockReturnValue(true),
      edit: jest.fn().mockReturnValue(null)
    };

    const processor2 = {
      priority: 2,
      test: jest.fn().mockReturnValue(true),
      edit: jest.fn().mockReturnValue(null)
    };
    mockStore.has.mockReturnValue(false);
    mockStore.get.mockReturnValue({
      value: "",
      attributes: {}
    });

    const Result = parse({
      store: mockStore,
      html: "<p>Hello World!</p>",
      processors: [processor1, processor2]
    });

    render(<Result.Edit />);

    expect(processor2.edit).toBeCalled();
    expect(processor1.edit).not.toBeCalled();
  });
});
