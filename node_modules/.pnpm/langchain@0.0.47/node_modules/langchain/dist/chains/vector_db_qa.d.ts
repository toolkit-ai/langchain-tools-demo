import { BaseChain } from "./base.js";
import { VectorStore } from "../vectorstores/base.js";
import { SerializedVectorDBQAChain } from "./serde.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { ChainValues } from "../schema/index.js";
export type LoadValues = Record<string, any>;
export interface VectorDBQAChainInput {
    vectorstore: VectorStore;
    k: number;
    combineDocumentsChain: BaseChain;
    outputKey: string;
    inputKey: string;
    returnSourceDocuments?: boolean;
}
export declare class VectorDBQAChain extends BaseChain implements VectorDBQAChainInput {
    k: number;
    inputKey: string;
    get inputKeys(): string[];
    outputKey: string;
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments: boolean;
    constructor(fields: {
        vectorstore: VectorStore;
        combineDocumentsChain: BaseChain;
        inputKey?: string;
        outputKey?: string;
        k?: number;
        returnSourceDocuments?: boolean;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "vector_db_qa";
    static deserialize(data: SerializedVectorDBQAChain, values: LoadValues): Promise<VectorDBQAChain>;
    serialize(): SerializedVectorDBQAChain;
    static fromLLM(llm: BaseLanguageModel, vectorstore: VectorStore, options?: Partial<Omit<VectorDBQAChainInput, "combineDocumentsChain" | "vectorstore">>): VectorDBQAChain;
}
