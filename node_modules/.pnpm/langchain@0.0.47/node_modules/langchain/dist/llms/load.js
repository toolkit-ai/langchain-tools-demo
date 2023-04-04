import { loadFromFile, parseFileConfig } from "../util/index.js";
import { BaseLanguageModel } from "../base_language/index.js";
/**
 * Load an LLM from a local file.
 *
 * @example
 * ```ts
 * import { loadLLM } from "langchain/llms";
 * const model = await loadLLM("/path/to/llm.json");
 * ```
 */
const loader = (file, path) => BaseLanguageModel.deserialize(parseFileConfig(file, path));
export const loadLLM = (uri) => loadFromFile(uri, loader);
//# sourceMappingURL=load.js.map