import scopeCss from './scopeCss';

describe('Store', () => {

    test('should replace globals & scope css', () => {
        const selector = 'id'; 
        const base = 'body {font-size: 2px;}'
        const expected = '.id  {font-size: 2px;}'
        const result = scopeCss(base, selector);
        expect(result).toBe(expected)
    });
    
    test('should replace keyframes animation name', () => {
        const selector = 'panel'
        const css = `.container {
            animation: infinite loading 4s;
        }
        @keyframes loading {
            from { top: 0; }
            to { top: 100px; }
        }`;
        const expected = `.panel .container {
            animation: infinite panel-loading 4s;
        }
@keyframes panel-loading {
            from { top: 0; }
            to { top: 100px; }
        }`;
        const result = scopeCss(css, selector);
        expect(result).toBe(expected)

    })
})