import type { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
type PineconeMetadata = Record<string, any>;
export interface PineconeLibArgs {
    pineconeIndex: VectorOperationsApi;
    textKey?: string;
    namespace?: string;
    filter?: PineconeMetadata;
}
export declare class PineconeStore extends VectorStore {
    textKey: string;
    namespace?: string;
    pineconeIndex: VectorOperationsApi;
    filter?: PineconeMetadata;
    constructor(embeddings: Embeddings, args: PineconeLibArgs);
    addDocuments(documents: Document[], ids?: string[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[], ids?: string[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: object): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: {
        /**
         * @deprecated Use pineconeIndex instead
         */
        pineconeClient: VectorOperationsApi;
        textKey?: string;
        namespace?: string | undefined;
    } | PineconeLibArgs): Promise<PineconeStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
    static fromExistingIndex(embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
}
export {};
