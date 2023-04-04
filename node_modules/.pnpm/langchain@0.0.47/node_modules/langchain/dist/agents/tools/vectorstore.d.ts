import { VectorStore } from "../../vectorstores/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { VectorDBQAChain } from "../../chains/index.js";
import { Tool } from "./base.js";
interface VectorStoreTool {
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
}
export declare class VectorStoreQATool extends Tool implements VectorStoreTool {
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
    name: string;
    description: string;
    chain: VectorDBQAChain;
    constructor(name: string, description: string, fields: VectorStoreTool);
    static getDescription(name: string, description: string): string;
    _call(input: string): Promise<string>;
}
export {};
