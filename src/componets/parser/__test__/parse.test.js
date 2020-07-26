import Parser, { getCurrentVersion, getProcessors } from "../index";
import { render, store } from '../test-utils';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

describe('Parser lib', () => {
    let processors,
        version;
    beforeEach(() => {
        const versions = getCurrentVersion();
        processors = getProcessors(versions.processors);
        version = versions.parser;
    });
    afterEach(() => {
        store.clear();
    });
    test('should reemplace text line', () => {
        const html = "<div>hello world!</div>";
      
        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });

    test('should reemplace image', () => {
        const html = "<div><div>hello world!</div><img src='image.jpg' alt='alt' /></div>";
      
        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });
    test('should reemplace multiline tag', () => {
        const html = "<div><ul><li>hello</li><li>world</li></div>";
      
        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });
    test('should replace attributes to props', () => {
        const html = "<div class='classname'>hello world!</div>";
      
        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });

    test('should not parse svg ', () => {
        const html = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><g><path d="M12.9" /></g></svg>';
        
        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });

    test('should replace label', () => {
        const html = '<div><label>Label</label></div>';

        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        const save = render(<Parser version={version} html={html} processors={processors} environment="save" store={store} />)
        
        expect(edit.container.firstChild).toMatchSnapshot();
        expect(save.container.firstChild).toMatchSnapshot();
    });
    test('should replace complex estructures', () => {
        const html = '<div class="wrapper"><div class="image"><img src="https://source.unsplash.com/random" width="500"></div><div class="content"><h2>hola mundo</h2><p>lorem</p><p>lorem</p></div></div>';

        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)
        
        expect(edit.container.firstChild).toMatchSnapshot();
    });
    
    test('should replace orphan links', () => {
        const html = '<div><p>hello</p><a href="#">Orphan link</a></div>';

        const edit = render(<Parser version={version} html={html} processors={processors} environment="edit" store={store} />)

        expect(edit.container.firstChild).toMatchSnapshot();
    });
});