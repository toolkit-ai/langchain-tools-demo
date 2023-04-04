import { BaseOutputParser } from "../schema/index.js";
import { BasePromptTemplate } from "../prompts/index.js";
import { LLMChain } from "../chains/llm_chain.js";
import { BaseLanguageModel } from "../base_language/index.js";
export declare class OutputFixingParser extends BaseOutputParser {
    parser: BaseOutputParser;
    retryChain: LLMChain;
    static fromLLM(llm: BaseLanguageModel, parser: BaseOutputParser, fields?: {
        prompt?: BasePromptTemplate;
    }): OutputFixingParser;
    constructor({ parser, retryChain, }: {
        parser: BaseOutputParser;
        retryChain: LLMChain;
    });
    parse(completion: string): Promise<unknown>;
    getFormatInstructions(): string;
}
