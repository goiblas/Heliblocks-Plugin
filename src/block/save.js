import HtmlParser from "../services/htmlParser";
import { RichText } from "@wordpress/block-editor";
import ReactDOMServer from "react-dom/server";
import Store from "../services/store";
import Styles from "./../componets/styles";

const Save = ({ attributes, setAttributes, className }) => {
  if (!attributes.isChoosed) {
    return null;
  }

  let counterId = 0;
  const setStore = store => setAttributes({ store });
  const store = new Store(attributes.store, setStore);
  const htmlParser = new HtmlParser();

  htmlParser.replaceIframeBy((node, children, index) => {
    const id = "iframe-" + counterId++;
    if (!store.has(id)) {
      store.set(id, node.attribs.src);
    }

    delete node.attribs.src;
    return <iframe src={store.get(id)} {...node.attribs} />;
  });

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
  // htmlParser.replaceOrphanLinks((node, children, index) => {
  //   const result = ReactDOMServer.renderToStaticMarkup(node);
  //   const id = "link-" + counterId++;
  //   if (!store.has(id)) {
  //     store.set(id, result);
  //   }
  //   return createElement(RichText.Content, {
  //     value: store.get(id),
  //     tagName: "div"
  //   });
  // });

  const htmlParsed = htmlParser.parser(attributes.html);
  return (
    <div className={className}>
      <Styles
        css={attributes.css}
        variables={attributes.variables}
        root={attributes.wrapperClassname}
      />
      <div className={`${attributes.wrapperClassname}`}>{htmlParsed}</div>
    </div>
  );
};

export default Save;
