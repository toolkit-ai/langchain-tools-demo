import { BaseChain } from "./base.js";
import { BaseLLM } from "../llms/index.js";
import { SerializedVectorDBQAChain } from "./serde.js";
import { ChainValues, BaseRetriever } from "../schema/index.js";
export type LoadValues = Record<string, any>;
export interface RetrievalQAChainInput {
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    outputKey: string;
    inputKey: string;
    returnSourceDocuments?: boolean;
}
export declare class RetrievalQAChain extends BaseChain implements RetrievalQAChainInput {
    inputKey: string;
    get inputKeys(): string[];
    outputKey: string;
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments: boolean;
    constructor(fields: {
        retriever: BaseRetriever;
        combineDocumentsChain: BaseChain;
        inputKey?: string;
        outputKey?: string;
        returnSourceDocuments?: boolean;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "retrieval_qa";
    static deserialize(_data: SerializedVectorDBQAChain, _values: LoadValues): Promise<RetrievalQAChain>;
    serialize(): SerializedVectorDBQAChain;
    static fromLLM(llm: BaseLLM, retriever: BaseRetriever, options?: Partial<Omit<RetrievalQAChainInput, "combineDocumentsChain" | "index">>): RetrievalQAChain;
}
