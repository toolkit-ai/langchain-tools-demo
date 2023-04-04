import { BaseChatMessage } from "../schema/index.js";
export type InputValues = Record<string, any>;
export type OutputValues = Record<string, any>;
export type MemoryVariables = Record<string, any>;
export declare abstract class BaseMemory {
    abstract loadMemoryVariables(values: InputValues): Promise<MemoryVariables>;
    abstract saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
}
export declare const getInputValue: (inputValues: InputValues, inputKey?: string) => any;
export declare function getBufferString(messages: BaseChatMessage[], human_prefix?: string, ai_prefix?: string): string;
