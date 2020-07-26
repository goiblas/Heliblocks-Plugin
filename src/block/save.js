import Styles from "./../componets/styles";
import Parser, { getProcessors, Store } from "./../componets/parser";

const Save = ({ attributes, setAttributes, className }) => {
  if (!attributes.isChoosed) {
    return null;
  }

  const setStore = store => setAttributes({ store });
  const store = new Store(attributes.store, setStore);
  
  return (
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
            environment="save"
          />
        </div>
    </div>
  );
};

export default Save;
