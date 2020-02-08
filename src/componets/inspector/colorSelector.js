import {  Dropdown } from  '@wordpress/components';
import { ColorPicker } from '@wordpress/components';
import ButtonColor from './buttonColor';

const ColorSelector = ({ color, onChange, label }) => {
    return (
        <div className="hb-color-selector">
            <Dropdown
                position="bottom right"
                renderToggle={ ( { isOpen, onToggle } ) => (
                    <ButtonColor color={ color } onClick={ onToggle } aria-expanded={ isOpen } />
                ) }
                renderContent={ () => (
                    <ColorPicker
                    color={ color }
                    onChangeComplete={ ( value ) => {
                        onChange( value.hex )
                    } }
                    disableAlpha
                />
                ) }
            />
            <div className="hb-color-selector__label">{label}</div>
        </div>
    )
}

export default ColorSelector;