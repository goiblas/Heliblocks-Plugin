import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  TextControl,
  Button,
  Icon,
} from "@wordpress/components";
import { MediaSlot } from "./../slotfill";

import ColorSelector from "./colorSelector";

const ResetButton = ({ disabled, onClick, style }) => (
  <Button
    style={{
      flexShrink: 0,
      minWidth: "32px",
      height: "30px",
      marginBottom: "10px",
      marginLeft: "2px",
      ...style
    }}
    disabled={disabled}
    onClick={onClick}
  >
    <Icon icon="backup" label="Reset" size={16} />
  </Button>
);
const VariableControl = props => {
  if (props.type === "color") {
    return (
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <ColorSelector
          label={props.label}
          color={props.value}
          onChange={props.onChange}
        />
        <ResetButton
          style={{ marginBottom: "18px" }}
          disabled={props.value === props.default}
          onClick={() => props.onChange(props.default)}
        />
      </div>
    );
  } else if (props.type === "value" || props.type === "size") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <RangeControl
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          min={props.min}
          max={props.max}
          step={props.max - props.min >= 10 ? 1 : 0.1}
        />
        <ResetButton
          disabled={props.value === props.default}
          onClick={() => props.onChange(props.default)}
        />
      </div>
    );
  } else if (props.type === "text") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextControl
          label={props.label}
          value={props.value}
          onChange={props.onChange}
        />
        <ResetButton
          disabled={props.value === props.default}
          onClick={() => props.onChange(props.default)}
        />
      </div>
    );
  }
  return null;
};
const Inspector = ({ variables, setVariables }) => {
  const setVariable = (name, value) => {
    const variablesUpdated = variables.map(currentVariable => {
      if (currentVariable.variable === name) {
        return { ...currentVariable, value: value };
      }
      return currentVariable;
    });
    setVariables(variablesUpdated);
  };

  return (
    <InspectorControls>
      <PanelBody title="Settings" initialOpen={true}>
        {variables.map((variable, index) => (
          <VariableControl
            {...variable}
            key={index}
            onChange={value => setVariable(variable.variable, value)}
          />
        ))}
      </PanelBody>
      <PanelBody title="Media" initialOpen={false}>
        <div style={{ marginBottom: "16px" }}>
          <MediaSlot />
        </div>
      </PanelBody>
    </InspectorControls>
  );
};

export default Inspector;
