function renderValue(variable) {
  switch (variable.type) {
    case "size":
      return variable.value + variable.unit;

    default:
      return variable.value;
  }
}

function renderVariables(variables, root) {
  const variablesRendered = variables.reduce(
    (accumulator, variable) =>
      accumulator + `${variable.variable}: ${renderValue(variable)};`,
    ""
  );

  return `.${root} {${variablesRendered}}`;
}

const Styles = ({ css, variables, root }) => (
  <style>
    {renderVariables(variables, root)}
    {css}
  </style>
);

export default Styles;
