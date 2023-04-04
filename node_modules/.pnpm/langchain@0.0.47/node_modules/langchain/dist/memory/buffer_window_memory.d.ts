import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseMemoryInput } from "./chat_memory.js";
export interface BufferWindowMemoryInput extends BaseMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    k: number;
}
export declare class BufferWindowMemory extends BaseChatMemory implements BufferWindowMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    k: number;
    constructor(fields?: Partial<BufferWindowMemoryInput>);
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
