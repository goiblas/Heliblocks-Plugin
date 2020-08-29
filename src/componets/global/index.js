import Styles from "./styles";

const Global = ({ children,  variables, css, wrapperClassname, encapsulated, id }) => {
  return (
    <>
        <Styles
        css={css}
        variables={variables}
        root={encapsulated ? id : wrapperClassname}
        />
        <div className={encapsulated ? `${wrapperClassname} ${id}` : wrapperClassname}>
        {children}
        </div>
    </>
  );
};

export default Global;
