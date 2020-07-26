import Parser, { version } from "./lib";
import processors, { current_processors } from "./processors";
export default Parser;
export * from "./store";

const defaultProcessors = [
    "textline@v1", "link@v1", "image@v1", "iframe@v1"
]
export function getProcessors(names = defaultProcessors) {
    return processors.filter( processor => names.includes(processor.name))
}

export function getCurrentVersion() {
    return {
        parser: version,
        processors: current_processors
    }
}