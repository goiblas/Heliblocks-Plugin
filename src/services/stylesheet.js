import { getStylesheet } from './database';
import { getScale } from './colors';
let styleNode;

export async function init() {
	const stylesheet = await getStylesheet();
    
	styleNode = document.createElement('style');
	styleNode.type = "text/css";

	var styleText = document.createTextNode(stylesheet);
	styleNode.appendChild(styleText);

	document.getElementsByTagName('head')[0].appendChild(styleNode);
}

export function setStylesheet(stylesheet) {
    if(styleNode) {
        styleNode.textContent = stylesheet;
    }
}

export function generateStylesheet(colors) {
	const stylesheet = `
		:root {
			${getScale(colors.primary).map((color, index) => 
				` --hb-color-primary-${(index + 1) * 100}: ${color};`
			).join('')}
			${getScale(colors.secondary).map((color, index) => 
				` --hb-color-secondary-${(index + 1) * 100}: ${color};`
			).join('')}
			${getScale(colors.tertiary).map((color, index) => 
				` --hb-color-tertiary-${(index + 1) * 100}: ${color};`
			).join('')}
		
			--hb-color-black: ${colors.black};
			--hb-color-white: ${colors.white};
		}`;

	return stylesheet;
}