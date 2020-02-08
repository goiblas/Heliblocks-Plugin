import chroma from 'chroma-js';

const lightnessMap = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
const saturationMap = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

export function isValid(color) {
    return chroma.valid(color)
}

export function getScale(color) {
    const colorGoal = chroma(color);
    const position = getPosition(color);

    return lightnessMap
            .map((l) => colorGoal.set('hsl.l', l))
            .map((color, i) => {
                const saturationDelta = saturationMap[i] - saturationMap[position];
                return saturationDelta >= 0
                    ? color.saturate(saturationDelta)
                    : color.desaturate(saturationDelta * -1);
            })
            .map( color => color.hex());
}

export function getPosition(color) {
    const lightnessGoal = chroma(color).get('hsl.l');

    const closestLightness = lightnessMap.reduce((prev, curr) =>
            Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
                ? curr
                : prev
            );
    return lightnessMap.findIndex(l => l === closestLightness);
}