import { textlineProcessor } from "./textline";
import { imageProcessor } from "./image";
import { iframeProcessor } from "./iframe";
import { linkProcessor } from "./link";
import { paragraphsProcessor } from "./paragraphs";
import { listsProcessor } from "./lists";

export const current_processors = [
    textlineProcessor.name,
    imageProcessor.name,
    iframeProcessor.name,
    linkProcessor.name,
    paragraphsProcessor.name,
    listsProcessor.name,
]

export default [
    textlineProcessor,
    imageProcessor,
    iframeProcessor,
    linkProcessor,
    paragraphsProcessor,
    listsProcessor,
]