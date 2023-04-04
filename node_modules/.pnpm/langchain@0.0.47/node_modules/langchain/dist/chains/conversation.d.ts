import { LLMChain } from "./llm_chain.js";
import { BasePromptTemplate } from "../prompts/index.js";
import { BaseMemory } from "../memory/index.js";
import { BaseLanguageModel } from "../base_language/index.js";
export declare class ConversationChain extends LLMChain {
    constructor(fields: {
        llm: BaseLanguageModel;
        prompt?: BasePromptTemplate;
        outputKey?: string;
        memory?: BaseMemory;
    });
}
