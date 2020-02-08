import { isValid, getScale, getPosition } from './colors';

describe('Validate color', () => {
    test('should be falsy', () => {
        expect(isValid('#jjjjjj')).toBe(false);
    });
    test('should be true', () => {
        expect(isValid('#45a485')).toBe(true);
    });
})

describe('Scale', () => {
    test('should get scale', () => {
        const expected = ["#ffe2ec", "#ffb3c5", "#fc839f", "#f95278", "#f62252", "#dd0939", "#ad032c", "#7c001e", "#4d0012", "#200005"];
        expect(getScale('#C70833')).toEqual(expected);
    });
})

describe('Position', () => {
    test('should get position', () => {
        expect(getPosition('#C70833')).toBe(5);
    });
})

