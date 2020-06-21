import HtmlParser from "../services/htmlParser";
import { RichText } from "@wordpress/block-editor";
import ReactDOMServer from "react-dom/server";
import Store from "../services/store";
import Styles from "./../componets/styles";

const Save = ({ attributes, setAttributes, className }) => {
  return null;
  if (!attributes.isChoosed) {
    return null;
  }
  // cuando lo tengo seleccionado lo parseo
  const initialStore = JSON.parse(attributes.store);
  const setStore = store => setAttributes({ store });

  const store = new Store(initialStore, setStore);
  const htmlParser = new HtmlParser();

  let counterId = 0;
  htmlParser.replaceMultilineBy((node, children, index) => {
    const result = ReactDOMServer.renderToStaticMarkup(children);
    const id = "multiline-" + counterId++;

    if (!store.has(id)) {
      store.set(id, result);
    }
    return createElement(RichText.Content, {
      value: store.get(id),
      tagName: node.name,
      className: node.attribs.class
    });
  });
  htmlParser.replaceTextLineBy((node, children, index) => {
    const result = ReactDOMServer.renderToStaticMarkup(children);
    const id = "line-" + counterId++;

    if (!store.has(id)) {
      store.set(id, result);
    }
    return createElement(RichText.Content, {
      value: store.get(id),
      tagName: node.name,
      className: node.attribs.class
    });
  });

  htmlParser.replaceImageBy((node, children, index) => {
    const id = "image-" + counterId++;
    if (!store.has(id)) {
      const imageAttribs = {
        src: node.attribs.src,
        alt: node.attribs.alt || ""
      };
      store.set(id, imageAttribs);
    }
    return <img {...store.get(id)} />;
  });
  const htmlParsed = htmlParser.parser(attributes.html);
  return (
    <>
      <Styles
        css={attributes.css}
        variables={attributes.variables}
        root={attributes.wrapperClassname}
      />
      <div className={`${attributes.wrapperClassname}`}>{htmlParsed}</div>
    </>
  );
};

export default Save;
