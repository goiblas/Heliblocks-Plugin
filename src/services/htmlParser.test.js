import React from "react";
import { shallow } from "enzyme";
import HtmlParser from "./htmlParser";

describe("Parser", () => {
  const TextInline = ({ children }) => <div data-testid="text">{children}</div>;
  const Image = ({ src }) => <div data-testid="image">{src}</div>;
  const Iframe = ({ src }) => <div data-testid="iframe">{src}</div>;
  const Label = ({ children }) => <div data-testid="label">{children}</div>;

  const htmlParser = new HtmlParser();
  htmlParser.replaceTextLineBy((node, children, index) => (
    <TextInline key={index}>{children}</TextInline>
  ));
  htmlParser.replaceImageBy((node, children, index) => (
    <Image key={index} src={node.attribs.src} />
  ));
  htmlParser.replaceIframeBy((node, children, index) => (
    <Iframe key={index} src={node.attribs.src} />
  ));
  htmlParser.replaceLabelBy((node, children, index) => (
    <Label key={index}>{children}</Label>
  ));

  test('should replace iframe', () => {
    const html = "<iframe src='helloworld.html'/>";
    const htmlExpected = '<div data-testid="iframe">helloworld.html</div>'
    const Component = htmlParser.parser(html);
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(htmlExpected);
  });

  test("should replace text", () => {
    const origin = "<div>hi</div>";
    const Component = htmlParser.parser(origin);
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe('<div data-testid="text">hi</div>');
  });

  test("should replace several texts", () => {
    const html = "<div><p>hello</p><p>world<a href='#'><em>!</em></a></p></div>";
    const htmlExpected = "<div><div data-testid=\"text\">hello</div><div data-testid=\"text\">world<a href=\"#\"><em>!</em></a></div></div>";

    const Component = htmlParser.parser(html);
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(htmlExpected);
  });

  test("should replace orphan link", () => {
    const html = "<div><p>hello</p><a href='#'>Orphan link</a></div>";
    const htmlExpected = "<div><div data-testid=\"text\">hello</div><div data-testid=\"text\">Orphan link</div></div>";

    const Component = htmlParser.parser(html);
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(htmlExpected);
  });

  test("should replace img", () => {
    const Component = htmlParser.parser('<img src="photo.jpg">');
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(
      '<div data-testid="image">photo.jpg</div>'
    );
  });

  test("should replace img & paragraphs", () => {
    const Component = htmlParser.parser(
      '<div class="wrapper"><div class="image"><img src="https://source.unsplash.com/random" width="500"></div><div class="content"><h2>hola mundo</h2><p>lorem</p><p>lorem</p></div></div>'
    );
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(
      '<div class="wrapper"><div class="image"><div data-testid="image">https://source.unsplash.com/random</div></div><div class="content"><div data-testid="text">hola mundo</div><div data-testid="text">lorem</div><div data-testid="text">lorem</div></div></div>'
    );
  });

  test("should render svg", () => {
    const Component = htmlParser.parser(
      '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><g><path d="M12.9" /></g></svg>'
    );
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><g><path d="M12.9"></path></g></svg>'
    );
  });

  test("should replace label tag", () => {
    const Component = htmlParser.parser(
      '<div><label>Label</label></div>'
    );
    const wrapper = shallow(Component);
    expect(wrapper.html()).toBe(
      '<div><div data-testid="label">Label</div></div>'
    );
  });
});