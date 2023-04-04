import { BaseLLM } from "../llms/index.js";
import { SerializedChatVectorDBQAChain } from "./serde.js";
import { ChainValues, BaseRetriever } from "../schema/index.js";
import { BaseChain } from "./base.js";
import { LLMChain } from "./llm_chain.js";
export type LoadValues = Record<string, any>;
export interface ConversationalRetrievalQAChainInput {
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    outputKey: string;
    inputKey: string;
}
export declare class ConversationalRetrievalQAChain extends BaseChain implements ConversationalRetrievalQAChainInput {
    inputKey: string;
    chatHistoryKey: string;
    get inputKeys(): string[];
    outputKey: string;
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments: boolean;
    constructor(fields: {
        retriever: BaseRetriever;
        combineDocumentsChain: BaseChain;
        questionGeneratorChain: LLMChain;
        inputKey?: string;
        outputKey?: string;
        returnSourceDocuments?: boolean;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): string;
    static deserialize(_data: SerializedChatVectorDBQAChain, _values: LoadValues): Promise<ConversationalRetrievalQAChain>;
    serialize(): SerializedChatVectorDBQAChain;
    static fromLLM(llm: BaseLLM, retriever: BaseRetriever, options?: {
        inputKey?: string;
        outputKey?: string;
        returnSourceDocuments?: boolean;
        questionGeneratorTemplate?: string;
        qaTemplate?: string;
    }): ConversationalRetrievalQAChain;
}
