import Parser, { getCurrentVersion } from "../";
import { render, store } from '../test-utils';
import { mockProcessor, mockPriorityProcessor } from "./../__mocks__/processor";


describe('Parser lib', () => {
    const VERSION = getCurrentVersion().parser;
    afterEach(() => {
        store.clear();
        jest.clearAllMocks();
    });

    test('should not call edit functions', () => {
        const html = "<div>hello world!</div>";
        mockProcessor.test.mockReturnValue(false);
        render(<Parser version={VERSION} html={html} processors={[mockProcessor]} environment="edit" store={store} />)
        
        expect(mockProcessor.test).toHaveBeenCalled();
        expect(mockProcessor.edit).not.toHaveBeenCalled();
    });
    test('should not call save functions', () => {
        const html = "<div>hello world!</div>";
        mockProcessor.test.mockReturnValue(false);
        render(<Parser version={VERSION} html={html} processors={[mockProcessor]} environment="save" store={store} />)
        
        expect(mockProcessor.test).toHaveBeenCalled();
        expect(mockProcessor.save).not.toHaveBeenCalled();
    });
    test('should call edit function with parametres', () => {
        const html = "<div class='classname'>hello world!</div>";
        mockProcessor.test.mockReturnValue(true);
        mockProcessor.edit.mockReturnValue(null);
        
        render(<Parser version={VERSION} html={html} processors={[mockProcessor]} environment="edit" store={store} />);

        expect(mockProcessor.test).toHaveBeenCalled();
        expect(mockProcessor.save).not.toHaveBeenCalled();
        expect(mockProcessor.edit).toHaveBeenCalledWith(expect.objectContaining({
            attributes: {
                className: "classname"
            },
            id: expect.any(Number),
            setAttribute: expect.any(Function),
            setValue: expect.any(Function),
            value: "hello world!"
        }));
    });
    test('should call save function with parametres', () => {
        const html = "<div class='classname'>hello world!</div>";
        mockProcessor.test.mockReturnValue(true);
        mockProcessor.save.mockReturnValue(null);

        render(<Parser version={VERSION} html={html} processors={[mockProcessor]} environment="save" store={store} />);

        expect(mockProcessor.test).toHaveBeenCalled();
        expect(mockProcessor.edit).not.toHaveBeenCalled();
        expect(mockProcessor.save).toHaveBeenCalledWith(expect.objectContaining({
            attributes: {
                className: "classname"
            },
            id: expect.any(Number),
            setAttribute: expect.any(Function),
            setValue: expect.any(Function),
            value: "hello world!"
        }));
    });

    test('should not process child of processor', () => {
        const html = "<div><div><p>hello world!</p></div></div>";
        mockProcessor.test.mockReturnValueOnce(false).mockReturnValueOnce(true);
        mockProcessor.edit.mockReturnValue(null);

        render(<Parser version={VERSION} html={html} processors={[mockProcessor]} environment="edit" store={store} />);

        expect(mockProcessor.test.mock.calls.length).toBe(2);
        expect(mockProcessor.edit).toHaveBeenCalledWith(expect.objectContaining({
            attributes: {},
            id: expect.any(Number),
            setAttribute: expect.any(Function),
            setValue: expect.any(Function),
            value: "<p>hello world!</p>"
        }));
    });
    test('should sort by priority', () => {
        const html = "<div><div>hello world!</div></div>";
        mockPriorityProcessor.test.mockReturnValue(true);
        mockPriorityProcessor.edit.mockReturnValue(null);

        render(<Parser version={VERSION} html={html} processors={[mockProcessor, mockPriorityProcessor]} environment="edit" store={store} />);

        expect(mockProcessor.test).not.toHaveBeenCalled();
        expect(mockPriorityProcessor.test).toHaveBeenCalled();
    });
});