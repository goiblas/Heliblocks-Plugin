import { Dropdown } from "@wordpress/components";
import { ColorPicker } from "@wordpress/components";
import ButtonColor from "./buttonColor";
import { TextControl } from "@wordpress/components";

const ColorSelector = ({ color, onChange, label }) => {
  return (
    <div className="hb-color-selector">
      <div className="hb-color-selector__label">{label}</div>
      <Dropdown
        position="bottom left"
        renderToggle={({ isOpen, onToggle }) => (
          <div className="hb-color-selector__control">
            <ButtonColor
              color={color}
              onClick={onToggle}
              aria-expanded={isOpen}
            />
            <TextControl
              style={{ marginBottom: 0 }}
              value={color}
              onChange={onChange}
            />
          </div>
        )}
        renderContent={() => (
          <ColorPicker
            color={color}
            onChangeComplete={value => {
              onChange(value.hex);
            }}
            disableAlpha
          />
        )}
      />
    </div>
  );
};

export default ColorSelector;
