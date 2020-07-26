import { textlineProcessor } from "./textline";
import { imageProcessor } from "./image";
import { iframeProcessor } from "./iframe";
import { linkProcessor } from "./link";

export const current_processors = [
    textlineProcessor.name,
    imageProcessor.name,
    iframeProcessor.name,
    linkProcessor.name,
]

export default [
    textlineProcessor,
    imageProcessor,
    iframeProcessor,
    linkProcessor,
]