import { HumanChatMessage, AIChatMessage, SystemChatMessage, ChatMessage, } from "../schema/index.js";
export class BaseMemory {
}
export const getInputValue = (inputValues, inputKey) => {
    if (inputKey !== undefined) {
        return inputValues[inputKey];
    }
    const keys = Object.keys(inputValues);
    if (keys.length === 1) {
        return inputValues[keys[0]];
    }
    throw new Error(`input values have multiple keys, memory only supported when one key currently: ${keys}`);
};
export function getBufferString(messages, human_prefix = "Human", ai_prefix = "AI") {
    const string_messages = [];
    for (const m of messages) {
        let role;
        if (m instanceof HumanChatMessage) {
            role = human_prefix;
        }
        else if (m instanceof AIChatMessage) {
            role = ai_prefix;
        }
        else if (m instanceof SystemChatMessage) {
            role = "System";
        }
        else if (m instanceof ChatMessage) {
            role = m.role;
        }
        else {
            throw new Error(`Got unsupported message type: ${m}`);
        }
        string_messages.push(`${role}: ${m.text}`);
    }
    return string_messages.join("\n");
}
//# sourceMappingURL=base.js.map