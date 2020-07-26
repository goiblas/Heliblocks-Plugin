import { dispatch } from "@wordpress/data";
import Explore from "../componets/explore";
import Inspector from "../componets/inspector/";
import ErrorBoundary from "../componets/errorBoundary";
import Styles from "./../componets/styles";
import Parser, { getProcessors, getCurrentVersion, Store } from "./../componets/parser";
import { SlotFillProvider } from "./../componets/slotfill";

const Edit = ({ attributes, setAttributes, className, clientId }) => {
  if (!attributes.isChoosed) {
    return (
      <Explore
        onClose={() => dispatch("core/block-editor").removeBlock(clientId)}
        onChoose={({ html, css, variables, wrapperClassname }) => {
          const { parser, processors} = getCurrentVersion();
          setAttributes({
            parser,
            processors,
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
  const setStore = store => setAttributes({ store });
  const store = new Store(attributes.store, setStore);
  
  const setVariables = newVariables =>
    setAttributes({
      variables: newVariables
    });

  return (
    <ErrorBoundary>
      <SlotFillProvider id={clientId}>
        <Inspector
          variables={attributes.variables}
          setVariables={setVariables}
        />
        <div className={className}>
          <Styles
            css={attributes.css}
            variables={attributes.variables}
            root={attributes.wrapperClassname}
          />

          <div className={attributes.wrapperClassname}>
            <Parser
                version={attributes.parser}
                store={store}
                processors={getProcessors(attributes.processors)}
                html={attributes.html}
                environment="edit"
              />
          </div>
        </div>
        </SlotFillProvider>
    </ErrorBoundary>
  );
};

export default Edit;
