import { sortBy, attrsToProps } from './utils';
describe('Utils', () => {
    test('should sort by property', () => {
        const origin = [
            { priority: 10 },
            { priority: 20 },
            { withOutPrioriy: 100 },
            { priority: 20, other: 1 }
        ]
        const expected = [
            { priority: 20 },
            { priority: 20, other: 1 },
            { priority: 10 },
            { withOutPrioriy: 100 }
        ]
        expect( sortBy(origin, 'priority') ).toStrictEqual( expected )
    });
    test('should replace attributes by React props', () => {
        const origin = [{"class": "child"}, {"for": "name"}];
        const expected = [{"className": "child"}, {"htmlFor": "name"}];
        expect( attrsToProps(origin) ).toStrictEqual( expected )
    });
})