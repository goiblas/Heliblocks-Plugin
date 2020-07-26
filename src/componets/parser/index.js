import Parser, { version } from "./lib";
import processors, { current_processors } from "./processors";
export default Parser;
export * from "./store";

export function getProcessors(names) {
    return processors.filter( processor => names.includes(processor.name))
}

export function getCurrentVersion() {
    return {
        parser: version,
        processors: current_processors
    }
}