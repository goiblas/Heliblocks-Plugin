import { Parser } from "html-to-react";
import ReactDOMServer from "react-dom/server";
import { sortByPriotiy, defaultProcess, isValidNode } from "./utils";
import { useEffect, useState, useCallback } from "@wordpress/element";

const PROPERTY_ID = "hb-id";

function Html2Block({ store, html, processors }) {
  const nodesProcessed = new Set();
  const parser = new Parser();
  let counter = 0;

  function hasBeenProcessed(node) {
    if (nodesProcessed.has(node)) {
      return true;
    }
    return node.parent && hasBeenProcessed(node.parent);
  }

  function mapProcessorToInstruction(process, environment) {
    return {
      shouldProcessNode: function(node) {
        if (!hasBeenProcessed(node) && process.test(node)) {
          nodesProcessed.add(node);
          return true;
        }
        return false;
      },
      processNode: function(node, children) {
        const id = node[PROPERTY_ID];

        if (!store.has(id)) {
          const initialStoreValue = {
            attributes: node.attribs,
            value: ReactDOMServer.renderToStaticMarkup(children)
          };
          store.set(id, initialStoreValue);
        }

        const setAttribute = newAttribute => {
          const { value, attributes } = store.get(id);
          store.set(id, {
            value,
            attributes: {
              ...attributes,
              ...newAttribute
            }
          });
        };
        const setValue = value => {
          const { attributes } = store.get(id);
          store.set(id, {
            value,
            attributes
          });
        };

        const { value, attributes } = store.get(id);
        return process[environment]({
          value,
          setValue,
          attributes,
          setAttribute,
          name: node.name,
          id
        });
      }
    };
  }

  const processorsSorted = processors.sort(sortByPriotiy);
  const editInstructions = processorsSorted.map(process =>
    mapProcessorToInstruction(process, "edit")
  );
  const saveInstructions = processorsSorted.map(process =>
    mapProcessorToInstruction(process, "save")
  );

  const preprocessingInstructions = [
    {
      shouldPreprocessNode: function() {
        return true;
      },
      preprocessNode: function(node) {
        node[PROPERTY_ID] = counter++;
      }
    }
  ];

  return {
    Edit: () =>
      parser.parseWithInstructions(
        html,
        isValidNode,
        [...editInstructions, defaultProcess],
        preprocessingInstructions
      ),
    Save: () =>
      parser.parseWithInstructions(
        html,
        isValidNode,
        [...saveInstructions, defaultProcess],
        preprocessingInstructions
      )
  };
}
export default Html2Block;
