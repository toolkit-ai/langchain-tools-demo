import type { ChromaClient as ChromaClientT } from "chromadb";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export interface ChromaLibArgs {
    url?: string;
    numDimensions?: number;
    collectionName?: string;
    index?: ChromaClientT;
}
export declare class Chroma extends VectorStore {
    index?: ChromaClientT;
    collectionName: string;
    numDimensions?: number;
    url: string;
    constructor(embeddings: Embeddings, args: ChromaLibArgs);
    addDocuments(documents: Document[]): Promise<void>;
    ensureCollection(): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: {
        collectionName?: string;
        url?: string;
    }): Promise<Chroma>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: {
        collectionName?: string;
        url?: string;
    }): Promise<Chroma>;
    static fromExistingCollection(embeddings: Embeddings, dbConfig: {
        collectionName: string;
        url?: string;
    }): Promise<Chroma>;
    static imports(): Promise<{
        ChromaClient: typeof ChromaClientT;
    }>;
}
