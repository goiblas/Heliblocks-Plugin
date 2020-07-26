import ReactDOMServer from "react-dom/server";
import { parse } from "./parse";
import { attributesToProps, isSvg } from "./utils";

const PROPERTY_ID = "hb-id";

const Parser = ({ store, html, processors, environment }) => {
  let counter = 0;
  const nodesProcessed = new Set();

  function hasBeenProcessed(node) {
    if (nodesProcessed.has(node)) {
      return true;
    }
    return node.parent && hasBeenProcessed(node.parent);
  }

  function mapProcessorToInstruction(process) {
    return {
      shouldProcessNode: function (node) {
        if (isSvg(node)) {
          return false;
        }
        if (!hasBeenProcessed(node) && process.test(node)) {
          nodesProcessed.add(node);
          return true;
        }
        return false;
      },
      processNode: function (node, children) {
        const id = node[PROPERTY_ID];

        if (!store.has(id)) {
          const initialStoreValue = {
            attributes: attributesToProps(node.attribs),
            value: ReactDOMServer.renderToStaticMarkup(children),
          };
          store.set(id, initialStoreValue);
        }

        const setAttribute = (newAttribute) => {
          const { value, attributes } = store.get(id);
          store.set(id, {
            value,
            attributes: {
              ...attributes,
              ...newAttribute,
            },
          });
        };

        const setValue = (value) => {
          const { attributes } = store.get(id);
          store.set(id, {
            value,
            attributes,
          });
        };

        const { value, attributes } = store.get(id);
        return process[environment]({
          value,
          setValue,
          attributes,
          setAttribute,
          name: node.name,
          id,
        });
      },
    };
  }

  const preprocessing = [
    {
      shouldPreprocessNode: () => true,
      preprocessNode: (node) => {
        node[PROPERTY_ID] = counter++;
      },
    },
  ];

  const instructions = processors
    .sort((a, b) => b.priority - a.priority)
    .map(mapProcessorToInstruction);

  return parse({html, processes: instructions, preprocessing: preprocessing })
};

export default Parser;