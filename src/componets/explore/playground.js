import { useState } from '@wordpress/element';
import { Button, TextareaControl, RadioControl } from '@wordpress/components';

const EmbedHtml = ({ onChoose }) => {
    const [ html, setHtml ] = useState('');
    const [ css, setCss ] = useState('');
    const [ alignment, setAlignment ] = useState('normal');

    return(
        <div>
            <TextareaControl 
                   label="html"
                   value={ html }
                   onChange={ ( html ) => setHtml(html) } /> 

            <TextareaControl 
                   label="Css"
                   value={ css }
                   onChange={ ( css ) => setCss( css ) } /> 
            <br />
            <RadioControl
                label="Alignament"
                selected={ alignment }
                options={ [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Wide', value: 'wide' },
                    { label: 'Full', value: 'full' }
                ] }
                onChange={ ( option ) => { setAlignment( option ) } }
            />

            <Button isPrimary onClick={() => onChoose({ html, css, alignment })}>Guardar</Button>
            <hr />
        </div>
    ) 
}

export default EmbedHtml;