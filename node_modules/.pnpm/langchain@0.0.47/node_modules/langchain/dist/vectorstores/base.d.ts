import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
export declare class VectorStoreRetriever extends BaseRetriever {
    vectorStore: VectorStore;
    k: number;
    constructor(fields: {
        vectorStore: VectorStore;
        k?: number;
    });
    getRelevantDocuments(query: string): Promise<Document[]>;
}
export declare abstract class VectorStore {
    embeddings: Embeddings;
    constructor(embeddings: Embeddings, _dbConfig: Record<string, any>);
    abstract addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    abstract addDocuments(documents: Document[]): Promise<void>;
    abstract similaritySearchVectorWithScore(query: number[], k: number, filter?: object): Promise<[Document, number][]>;
    similaritySearch(query: string, k?: number, filter?: object | undefined): Promise<Document[]>;
    similaritySearchWithScore(query: string, k?: number, filter?: object | undefined): Promise<[object, number][]>;
    static fromTexts(_texts: string[], _metadatas: object[] | object, _embeddings: Embeddings, _dbConfig: Record<string, any>): Promise<VectorStore>;
    static fromDocuments(_docs: Document[], _embeddings: Embeddings, _dbConfig: Record<string, any>): Promise<VectorStore>;
    asRetriever(k?: number): BaseRetriever;
}
export declare abstract class SaveableVectorStore extends VectorStore {
    abstract save(directory: string): Promise<void>;
    static load(_directory: string, _embeddings: Embeddings): Promise<SaveableVectorStore>;
}
