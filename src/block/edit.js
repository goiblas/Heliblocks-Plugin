import { dispatch } from "@wordpress/data";
import HtmlParser from "../services/htmlParser";
import { RichText } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import ReactDOMServer from "react-dom/server";
import Store from "../services/store";
import Explore from "../componets/explore";
import Inspector from "../componets/inspector/";
import ErrorBoundary from "../componets/errorBoundary";
import Styles from "./../componets/styles";
import ImageUpload from "./../componets/imageUpdoad";
import { restoreClassnameLinks } from "./../utils";


const Edit = ({ attributes, setAttributes, className, clientId }) => {
  if (!attributes.isChoosed) {
    return (
      <Explore
        onClose={() => dispatch("core/block-editor").removeBlock(clientId)}
        onChoose={({ html, css, variables, wrapperClassname }) => {
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

  let counterId = 0;

  const setStore = store => setAttributes({ store });
  const store = new Store(attributes.store, setStore);
  const htmlParser = new HtmlParser();

  const inspectorMedia = [];

  htmlParser.replaceImageBy((node, children, index) => {
    const id = counterId++;
    if (!store.has(id)) {
      const imageAttribs = {
        src: node.attribs.src,
        alt: node.attribs.alt || ""
      };
      store.set(id, imageAttribs);
    }

    const onChange = attribs => store.set(id, attribs);
    const props = store.get(id);

    inspectorMedia.push(
      <ImageUpload alt={props.alt} src={props.src} onChange={onChange} />
    );
    return <img {...props} />;
  });

  htmlParser.replaceIframeBy((node, children, index) => {
    const id = counterId++;
    if (!store.has(id)) {
      store.set(id, node.attribs.src);
    }

    inspectorMedia.push(
      <TextControl
        label="Iframe"
        value={store.get(id)}
        onChange={src => store.set(id, src)}
      />
    );
    delete node.attribs.src;

    return <iframe src={store.get(id)} {...node.attribs} />;
  });


  htmlParser.replaceTextLineBy((node, children, index) => {
    const id = counterId++;
    const tagName = node.name === "a" ? "div" : node.name;
    const className = node.name === "a" ? null : node.attribs.class;
    
    if (!store.has(id)) {
      let content = null;
      if (node.name === "a") {
        content = ReactDOMServer.renderToStaticMarkup(<a href="#" className={node.attribs.class}>{children}</a>);
      } else {
        content = ReactDOMServer.renderToStaticMarkup(children);
      }
      store.set(id, content);
    }

    const onChange = content => {
      const oldContent = store.get(id);
      store.set(id, restoreClassnameLinks(oldContent, content));
    };

    return (
      <RichText
        value={store.get(id)}
        onChange={onChange}
        tagName={tagName}
        className={className}
      />
    );
  });

  const setVariables = newVariables =>
    setAttributes({
      variables: newVariables
    });

  return (
    <ErrorBoundary>
      <Inspector
        variables={attributes.variables}
        setVariables={setVariables}
        media={inspectorMedia}
      />
      <div className={className}>
        <Styles
          css={attributes.css}
          variables={attributes.variables}
          root={attributes.wrapperClassname}
        />

        <div className={attributes.wrapperClassname}>
          {htmlParser.parser(attributes.html)}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Edit;
