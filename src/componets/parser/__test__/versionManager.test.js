import { getCurrentVersion, getProcessors } from "..";

describe('Version manager', () => {
    test('should get current versions', () => {
        const { parser, processors } = getCurrentVersion();
    
        expect(parser).toEqual(expect.any(String));
        expect(processors.length > 0).toBeTruthy();
    });
    test('should get current processors', () => {
        const { processors } = getCurrentVersion();
        const firstProcessor = getProcessors(processors)[0];

        expect(firstProcessor).toStrictEqual(
            expect.objectContaining({
                priority: expect.any(Number),
                name: expect.any(String),
                edit: expect.any(Function),
                save: expect.any(Function)
              }),
        );
    });
});