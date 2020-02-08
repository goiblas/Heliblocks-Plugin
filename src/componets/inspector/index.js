import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { getTokens, saveTokens, saveStylesheet } from '../../services/database';
import { generateStylesheet, setStylesheet } from '../../services/stylesheet';

import ColorSelector from './colorSelector';
import { useColor } from './../../hooks/useColor';

const Inspector = () => {
    const [ black, setBlack ]= useColor({label: 'Black', color: "#6d6d6d" });
    const [ white, setWhite ]= useColor({label: 'White', color: "#6d6d6d" });
    const [ primary, setPrimary ]= useColor({label: 'Primary', color: "#6d6d6d" });
    const [ secondary, setSecondary ]= useColor({label: 'Secondary', color: "#6d6d6d" });
    const [ tertiary, setTertiary ]= useColor({label: 'Tertiary', color: "#6d6d6d" });
    const [ hasChanges, setHasChanges ] = useState(false);
    const [ saving, setSaving ] = useState(false);

    useEffect(async() => {
         const tokens = await getTokens();
         setBlack(tokens.black)
         setWhite(tokens.white)
         setPrimary(tokens.primary)
         setSecondary(tokens.secondary)
         setTertiary(tokens.tertiary)
    }, [])

    const onChangeColor = (value, setValue) => {
        setHasChanges(true);
        setValue(value);

        const colors = getColors();
        const stylesheet = generateStylesheet(colors);
        setStylesheet(stylesheet);  
    }
    const saveColors = async() => {
        setHasChanges(false);
        setSaving(true);
        const colors = getColors();
        const stylesheet = generateStylesheet(colors);
        await saveTokens(colors);
        await saveStylesheet(stylesheet);
        setSaving(false);
    }
    const getColors = () => ({
        black: black.color,
        white: white.color,
        primary: primary.color,
        secondary: secondary.color,
        tertiary: tertiary.color
    })
    return (
       <InspectorControls>
           <PanelBody title="Colors" initialOpen={true}>
                <div className="hb-colors-grid">
                    <ColorSelector label={black.label} color={ black.color } onChange={ newColor => onChangeColor(newColor, setBlack) } />
                    <ColorSelector label={white.label} color={ white.color } onChange={ newColor => onChangeColor(newColor, setWhite) } />
                    <ColorSelector label={primary.label} color={ primary.color } onChange={ newColor => onChangeColor(newColor, setPrimary) } />
                    <ColorSelector label={secondary.label} color={ secondary.color } onChange={ newColor => onChangeColor(newColor, setSecondary) } />
                    <ColorSelector label={tertiary.label} color={ tertiary.color } onChange={ newColor => onChangeColor(newColor, setTertiary) } />
                </div>
            <Button isPrimary onClick={ saveColors } disabled={!hasChanges || saving} > Save changes </Button>
            {saving && (<span>Saving...</span>)}
           </PanelBody>
       </InspectorControls>
    )
}

export default Inspector;
