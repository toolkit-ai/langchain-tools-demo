import { BaseLanguageModel } from "../../base_language/index.js";
import { BasePromptTemplate } from "../../prompts/index.js";
import { StuffDocumentsChain, MapReduceDocumentsChain } from "../combine_docs_chain.js";
interface summarizationChainParams {
    prompt?: BasePromptTemplate;
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
    type?: "map_reduce" | "stuff";
}
export declare const loadSummarizationChain: (llm: BaseLanguageModel, params?: summarizationChainParams) => StuffDocumentsChain | MapReduceDocumentsChain;
export {};
