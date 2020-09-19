import Global from "./../componets/global";
import Parser, { getProcessors, Store } from "./../componets/parser";

const Save = ({ attributes, setAttributes, className }) => {
  if (!attributes.isChoosed) {
    return null;
  }

  const setStore = (store) => setAttributes({ store });
  const store = new Store(attributes.store, setStore);

  return (
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
          environment="save"
        />
      </Global>
    </div>
  );
};

export default Save;
