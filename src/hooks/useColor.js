import { useState, useEffect } from '@wordpress/element';

export const useColor = ({ label: initialLabel, color: initialColor }) => {
    const [ label ] = useState(initialLabel);
    const [ color, setColor ] = useState(initialColor);

    return [ { color, label }, setColor];
}