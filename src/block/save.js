import HtmlParser from '../services/htmlParser';
import scopeCss from '../services/scopeCss';
import { RichText } from  '@wordpress/block-editor';
import ReactDOMServer from 'react-dom/server';
import Store from '../services/store';

const Save = ({attributes, setAttributes, className }) => {

    if(!attributes.isChoosed) {
        return  null
    }
    // cuando lo tengo seleccionado lo parseo
    const initialStore = JSON.parse(attributes.store);
    const setStore = store => setAttributes({store})
    
    const store = new Store(initialStore, setStore)
    const htmlParser = new HtmlParser();

    htmlParser.replaceMultilineBy((node, children, index) => {
        const result = ReactDOMServer.renderToStaticMarkup(children);
        const id = 'multiline-' +  index;

        if(!store.has(id)) {
            store.set(id, result);
        }
        return createElement(RichText.Content, { value: store.get(id), tagName: node.name, className: node.attribs.class });
    })
    htmlParser.replaceTextLineBy((node, children, index) => {
        const result = ReactDOMServer.renderToStaticMarkup(children);
        const id = 'line-' +  index;

        if(!store.has(id)) {
            store.set(id, result);
        }
        return createElement(RichText.Content, { value: store.get(id), tagName: node.name, className: node.attribs.class });
    })

    htmlParser.replaceImageBy((node, children, index) => {
        const id = 'image-' +  index;
        if(!store.has(id)) {
            const imageAttribs = {
                src: node.attribs.src,
                alt: node.attribs.alt || ""
            }
            store.set(id, imageAttribs);
        }
        return <img {...store.get(id)} />
    })
    const htmlParsed = htmlParser.parser(attributes.html);
    const styles = scopeCss(attributes.css, attributes.uniqueClassName);
    
    const alignClassName = attributes.align === undefined ? '' : 'align' + attributes.align;

    return (
            <div className={ `${attributes.uniqueClassName} ${ alignClassName }` }>
                <style>{styles}</style>
                    {htmlParsed}
            </div>
    )
}

export default Save;