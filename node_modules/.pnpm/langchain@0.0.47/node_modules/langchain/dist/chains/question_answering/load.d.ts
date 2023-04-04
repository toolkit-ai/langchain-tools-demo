import { BasePromptTemplate } from "../../prompts/index.js";
import { StuffDocumentsChain, MapReduceDocumentsChain } from "../combine_docs_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
interface qaChainParams {
    prompt?: BasePromptTemplate;
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
    type?: string;
}
export declare const loadQAChain: (llm: BaseLanguageModel, params?: qaChainParams) => StuffDocumentsChain | MapReduceDocumentsChain;
interface StuffQAChainParams {
    prompt?: BasePromptTemplate;
}
export declare const loadQAStuffChain: (llm: BaseLanguageModel, params?: StuffQAChainParams) => StuffDocumentsChain;
interface MapReduceQAChainParams {
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
}
export declare const loadQAMapReduceChain: (llm: BaseLanguageModel, params?: MapReduceQAChainParams) => MapReduceDocumentsChain;
export {};
