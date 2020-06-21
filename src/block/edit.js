import { dispatch } from "@wordpress/data";
import HtmlParser from "../services/htmlParser";
import { RichText } from "@wordpress/block-editor";
import ReactDOMServer from "react-dom/server";
import Store from "../services/store";
import Explore from "../componets/explore";
import Image from "../componets/image";
import Inspector from "../componets/inspector/";
import ErrorBoundary from "../componets/errorBoundary";
import Styles from "./../componets/styles";
import { useEffect, useState, useCallback } from "@wordpress/element";
import Parse from "../services/html2block";
import {
  textProcessor,
  multilineProcessor,
  imageProcessor,
  orphanLinkProcessor
} from "../services/html2block/processors";

const Edit = ({ attributes, setAttributes, className, clientId }) => {
  if (!attributes.isChoosed) {
    return (
      <Explore
        onClose={() => dispatch("core/block-editor").removeBlock(clientId)}
        onChoose={({ html, css, variables, alignment, wrapperClassname }) => {
          setAttributes({
            html,
            css,
            variables: variables.map(variable => ({
              ...variable,
              default: variable.value
            })),
            wrapperClassname,
            isChoosed: true
          });
        }}
      />
    );
  }

  const initialStore = JSON.parse(attributes.store);
  const setStore = store => setAttributes({ store });
  const store = new Store(initialStore, setStore);

  const Result = Parse({
    html: attributes.html,
    store: store,
    processors: [textProcessor, multilineProcessor, imageProcessor]
  });
  // const htmlParser = new HtmlParser();

  // let counterId = 0;
  // const initialStore = JSON.parse(attributes.store);
  // const setStore = store => setAttributes({ store });
  // const store = new Store(initialStore, setStore);

  // htmlParser.replaceImageBy((node, children, index) => {
  //   const id = "image-" + counterId++;
  //   if (!store.has(id)) {
  //     const imageAttribs = {
  //       src: node.attribs.src,
  //       alt: node.attribs.alt || ""
  //     };
  //     store.set(id, imageAttribs);
  //   }

  //   const onChange = attribs => store.set(id, attribs);
  //   const props = store.get(id);
  //   return <Image {...props} onChange={onChange} />;
  // });

  // htmlParser.replaceMultilineBy((node, children, index) => {
  //   const result = ReactDOMServer.renderToStaticMarkup(children);
  //   const id = "multiline-" + counterId++;

  //   if (!store.has(id)) {
  //     store.set(id, result);
  //   }

  //   const onChange = content => store.set(id, content);
  //   return (
  //     <RichText
  //       value={store.get(id)}
  //       onChange={onChange}
  //       tagName={node.name}
  //       className={node.attribs.class}
  //       multiline={node.children[0].name}
  //     />
  //   );
  // });

  // htmlParser.replaceTextLineBy((node, children, index) => {
  //   const result = ReactDOMServer.renderToStaticMarkup(children);
  //   const id = "line-" + counterId++;
  //   if (!store.has(id)) {
  //     store.set(id, result);
  //   }

  //   const onChange = content => store.set(id, content);
  //   return (
  //     <RichText
  //       value={store.get(id)}
  //       onChange={onChange}
  //       tagName={node.name}
  //       className={node.attribs.class}
  //     />
  //   );
  // });

  // const htmlParsed = htmlParser.parser(attributes.html);

  const setVariables = newVariables =>
    setAttributes({
      variables: newVariables
    });

  return (
    <ErrorBoundary>
      <Inspector variables={attributes.variables} setVariables={setVariables} />
      <Styles
        css={attributes.css}
        variables={attributes.variables}
        root={attributes.wrapperClassname}
      />

      <div className={attributes.wrapperClassname}>
        <Result.Edit />
      </div>
    </ErrorBoundary>
  );
};

export default Edit;
