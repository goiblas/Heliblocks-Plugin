import React from "react";
import { shallow } from "enzyme";
import HtmlParser from "./htmlParser";

describe("Parser", () => {
    const TextInline = ({ children }) => < div data - testid = "line" > { children } < /div>;
    const TextMultiline = ({ children }) => ( <
        div data - testid = "multiline" > { children } < /div>
    );
    const Image = ({ src }) => < div data - testid = "image" > { src } < /div>;
    const Link = props => < a data - testid = "link" {...props }
    />;

    const htmlParser = new HtmlParser();
    htmlParser.replaceTextLineBy((node, children, index) => ( <
        TextInline key = { index } > { children } < /TextInline>
    ));
    htmlParser.replaceMultilineBy((node, children, index) => ( <
        TextMultiline key = { index } > { children } < /TextMultiline>
    ));
    htmlParser.replaceImageBy((node, children, index) => ( <
        Image key = { index }
        src = { node.attribs.src }
        />
    ));
    htmlParser.replaceOrphanLinks((node, children, index) => ( <
        Link key = { index } {...node.attribs } > { children } <
        /Link>
    ));

    test("should replace text", () => {
        const origin = "<div>hi</div>";
        const Component = htmlParser.parser(origin);
        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe('<div data-testid="line">hi</div>');
    });

    test("should replace multiline", () => {
        const origin = "<div><p>1</p><p>2</p></div>";
        const Component = htmlParser.parser(origin);
        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe(
            '<div data-testid="multiline"><p>1</p><p>2</p></div>'
        );
    });

    test("should replace ul", () => {
        const origin = "<ul><li>hello</li><li>world!</li></ul>";
        const Component = htmlParser.parser(origin);
        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe(
            '<div data-testid="multiline"><li>hello</li><li>world!</li></div>'
        );
    });

    test("should replace img", () => {
        const Component = htmlParser.parser('<img src="photo.jpg">');
        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe('<div data-testid="image">photo.jpg</div>');
    });

    test("should replace img & paragraphs", () => {
        const Component = htmlParser.parser(
            '<div class="wrapper"><div class="image"><img src="https://source.unsplash.com/random" width="500"></div><div class="content"><h2>hola mundo</h2><p>lorem</p><p>lorem</p></div></div>'
        );
        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe(
            '<div class="wrapper"><div class="image"><div data-testid="image">https://source.unsplash.com/random</div></div><div class="content"><div data-testid="line">hola mundo</div><div data-testid="line">lorem</div><div data-testid="line">lorem</div></div></div>'
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

    test("should replace orphan link", () => {
        const Component = htmlParser.parser(
            '<div><div><p>lorem<p></div><a href="#">download</a></div>'
        );
        const htmlExpected =
            '<div><div data-testid="multiline"><p>lorem</p><p></p></div><a data-testid="link" href="#">download</a></div>';

        const wrapper = shallow(Component);
        expect(wrapper.html()).toBe(htmlExpected);
    });
});