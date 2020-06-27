import HtmlParser from "../services/htmlParser";
import { RichText } from "@wordpress/block-editor";
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
    delete node.attribs.src;
    return <iframe src={store.get(counterId++)} {...node.attribs} />;
  });

  htmlParser.replaceTextLineBy((node, children, index) => {
    return createElement(RichText.Content, {
      value: store.get(counterId++),
      tagName: node.name === "a" ? "div" : node.name,
      className: node.name === "a" ? null : node.attribs.class
    });
  });

  htmlParser.replaceImageBy((node, children, index) => {
    return <img {...store.get(counterId++)} />;
  });

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
