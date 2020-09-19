import { dispatch } from "@wordpress/data";
import Explore from "../componets/explore";
import Inspector from "../componets/inspector/";
import ErrorBoundary from "../componets/errorBoundary";
import Parser, {
  getProcessors,
  getCurrentVersion,
  Store,
} from "./../componets/parser";
import { SlotFillProvider } from "./../componets/slotfill";
import Global from "./../componets/global";

const Edit = ({ attributes, setAttributes, className, clientId }) => {
  if (!attributes.isChoosed) {
    return (
      <Explore
        onClose={() => dispatch("core/block-editor").removeBlock(clientId)}
        onChoose={({ html, css, variables, wrapperClassname }) => {
          const { parser, processors } = getCurrentVersion();
          setAttributes({
            parser,
            processors,
            html,
            css,
            variables: variables.map((variable) => ({
              ...variable,
              default: variable.value,
            })),
            wrapperClassname: wrapperClassname,
            isChoosed: true,
            encapsulated: true,
            id: clientId
          });
        }}
      />
    );
  }
  const setStore = (store) => setAttributes({ store });
  const store = new Store(attributes.store, setStore);

  const setVariables = (newVariables) =>
    setAttributes({
      variables: newVariables,
    });

  return (
    <ErrorBoundary>
      <SlotFillProvider id={attributes.id}>
        <Inspector
          variables={attributes.variables}
          setVariables={setVariables}
        />
        <div className={className}>
          <Global
            id={`hb-${attributes.id}`}
            encapsulated={attributes.encapsulated}
            css={attributes.css}
            wrapperClassname={attributes.wrapperClassname}
            variables={attributes.variables}
          >
            <Parser
              version={attributes.parser}
              store={store}
              processors={getProcessors(attributes.processors)}
              html={attributes.html}
              environment="edit"
            />
          </Global>
        </div>
      </SlotFillProvider>
    </ErrorBoundary>
  );
};

export default Edit;
