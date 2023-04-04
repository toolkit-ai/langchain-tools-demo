import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseMemoryInput } from "./chat_memory.js";
export interface BufferMemoryInput extends BaseMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
}
export declare class BufferMemory extends BaseChatMemory implements BufferMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    constructor(fields?: Partial<BufferMemoryInput>);
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
