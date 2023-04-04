import { LLM, BaseLLMParams } from "./base.js";
interface CohereInput {
    /** Sampling temperature to use */
    temperature: number;
    /**
     * Maximum number of tokens to generate in the completion.
     */
    maxTokens: number;
    /** Model to use */
    model: string;
}
export declare class Cohere extends LLM implements CohereInput {
    temperature: number;
    maxTokens: number;
    model: string;
    apiKey: string;
    constructor(fields?: Partial<CohereInput> & BaseLLMParams);
    _llmType(): string;
    _call(prompt: string, _stop?: string[]): Promise<string>;
    static imports(): Promise<{
        cohere: typeof import("cohere-ai");
    }>;
}
export {};
