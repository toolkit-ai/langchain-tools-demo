import { BaseLanguageModel } from "../base_language/index.js";
import { VectorStore } from "../vectorstores/base.js";
import { SerializedChatVectorDBQAChain } from "./serde.js";
import { ChainValues } from "../schema/index.js";
import { BaseChain } from "./base.js";
import { LLMChain } from "./llm_chain.js";
export type LoadValues = Record<string, any>;
export interface ChatVectorDBQAChainInput {
    vectorstore: VectorStore;
    k: number;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    outputKey: string;
    inputKey: string;
}
export declare class ChatVectorDBQAChain extends BaseChain implements ChatVectorDBQAChainInput {
    k: number;
    inputKey: string;
    chatHistoryKey: string;
    get inputKeys(): string[];
    outputKey: string;
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments: boolean;
    constructor(fields: {
        vectorstore: VectorStore;
        combineDocumentsChain: BaseChain;
        questionGeneratorChain: LLMChain;
        inputKey?: string;
        outputKey?: string;
        k?: number;
        returnSourceDocuments?: boolean;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "chat-vector-db";
    static deserialize(data: SerializedChatVectorDBQAChain, values: LoadValues): Promise<ChatVectorDBQAChain>;
    serialize(): SerializedChatVectorDBQAChain;
    static fromLLM(llm: BaseLanguageModel, vectorstore: VectorStore, options?: {
        inputKey?: string;
        outputKey?: string;
        k?: number;
        returnSourceDocuments?: boolean;
        questionGeneratorTemplate?: string;
        qaTemplate?: string;
    }): ChatVectorDBQAChain;
}
