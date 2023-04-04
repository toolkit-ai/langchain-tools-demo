import { LLMChain } from "../chains/index.js";
import { resolveConfigFromFile } from "../util/index.js";
export const deserializeHelper = async (llm, tools, data, fromLLMAndTools, fromConstructor) => {
    if (data.load_from_llm_and_tools) {
        if (!llm) {
            throw new Error("Loading from llm and tools, llm must be provided.");
        }
        if (!tools) {
            throw new Error("Loading from llm and tools, tools must be provided.");
        }
        return fromLLMAndTools(llm, tools, data);
    }
    const serializedLLMChain = await resolveConfigFromFile("llm_chain", data);
    const llmChain = await LLMChain.deserialize(serializedLLMChain);
    return fromConstructor({ ...data, llmChain });
};
//# sourceMappingURL=helpers.js.map