import { dispatch } from '@wordpress/data';
import HtmlParser from '../services/htmlParser';
import scopeCss from '../services/scopeCss';
import { RichText } from  '@wordpress/block-editor';
import ReactDOMServer from 'react-dom/server';
import Store from '../services/store';
import Explore from '../componets/explore';
import Image from '../componets/image';
import Inspector from '../componets/inspector/';

import ErrorBoundary from '../componets/errorBoundary';

const Edit = ({attributes, setAttributes, className, clientId }) => {

    if(!attributes.isChoosed) {
        return (
                <Explore 
                    onClose={ () => dispatch('core/block-editor').removeBlock(clientId) }
                    onChoose={ ({ html, css, alignment}) => {
                        const uniqueClassName = 'hb-' + clientId;
                        setAttributes( { align: alignment });
                        setAttributes({ html, css, uniqueClassName , isChoosed: true})
                } } />
        )
    }
    // cuando lo tengo seleccionado lo parseo
    const initialStore = JSON.parse(attributes.store);
    const setStore = store => setAttributes({store})
    
    const store = new Store(initialStore, setStore)
    const htmlParser = new HtmlParser();

    htmlParser.replaceImageBy((node, children, index) => {
        const id = 'image-' +  index;
        if(!store.has(id)) {
            const imageAttribs = {
                src: node.attribs.src,
                alt: node.attribs.alt || ""
            }
            store.set(id, imageAttribs);
        }

        const onChange = attribs => store.set(id, attribs);
        const props = store.get(id);
        return <Image 
                    {...props}
                    onChange={onChange} />
    }) 

    htmlParser.replaceMultilineBy((node, children, index) => {
        const result = ReactDOMServer.renderToStaticMarkup(children);
        const id = 'multiline-' +  index;

        if(!store.has(id)) {
            store.set(id, result);
        }

        const onChange = content => store.set(id, content);
        return <RichText 
                value={store.get(id)}
                onChange={onChange}
                tagName={node.name}
                className={node.attribs.class}
                multiline={node.children[0].name} />
    })

    htmlParser.replaceTextLineBy((node, children, index) => {
        const result = ReactDOMServer.renderToStaticMarkup(children);
        const id = 'line-' + index;

        if(!store.has(id)) {
            store.set(id, result);
        }

        const onChange = content => store.set(id, content);
        return <RichText 
                    value={store.get(id)}
                    onChange={onChange}
                    tagName={node.name}
                    className={node.attribs.class}
                    multiline={false} />
    });


    const htmlParsed = htmlParser.parser(attributes.html);
    const styles = scopeCss(attributes.css, attributes.uniqueClassName);

    return (
        <ErrorBoundary>
            <>
                <Inspector />
                <style>{styles}</style>
                <div className={ attributes.uniqueClassName }>
                    {htmlParsed}
                </div>
            </>
        </ErrorBoundary>
    )
}

export default Edit;