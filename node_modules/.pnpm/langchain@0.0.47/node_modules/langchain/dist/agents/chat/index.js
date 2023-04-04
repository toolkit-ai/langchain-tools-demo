import { LLMChain } from "../../chains/index.js";
import { Agent } from "../agent.js";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate, } from "../../prompts/index.js";
import { PREFIX, SUFFIX, FORMAT_INSTRUCTIONS } from "./prompt.js";
const FINAL_ANSWER_ACTION = "Final Answer:";
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export class ChatAgent extends Agent {
    constructor(input) {
        super(input);
    }
    _agentType() {
        return "zero-shot-react-description";
    }
    observationPrefix() {
        return "Observation: ";
    }
    llmPrefix() {
        return "Thought:";
    }
    _stop() {
        return ["Observation:"];
    }
    static validateTools(tools) {
        const invalidTool = tools.find((tool) => !tool.description);
        if (invalidTool) {
            const msg = `Got a tool ${invalidTool.name} without a description.` +
                ` This agent requires descriptions for all tools.`;
            throw new Error(msg);
        }
    }
    constructScratchPad(steps) {
        const agentScratchpad = super.constructScratchPad(steps);
        if (agentScratchpad) {
            return `This was your previous work (but I haven't seen any of it! I only see what you return as final answer):\n${agentScratchpad}`;
        }
        return agentScratchpad;
    }
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     */
    static createPrompt(tools, args) {
        const { prefix = PREFIX, suffix = SUFFIX } = args ?? {};
        const toolStrings = tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join("\n");
        const template = [prefix, toolStrings, FORMAT_INSTRUCTIONS, suffix].join("\n\n");
        const messages = [
            SystemMessagePromptTemplate.fromTemplate(template),
            HumanMessagePromptTemplate.fromTemplate("{input}\n\n{agent_scratchpad}"),
        ];
        return ChatPromptTemplate.fromPromptMessages(messages);
    }
    static fromLLMAndTools(llm, tools, args) {
        ChatAgent.validateTools(tools);
        const prompt = ChatAgent.createPrompt(tools, args);
        const chain = new LLMChain({ prompt, llm });
        return new ChatAgent({
            llmChain: chain,
            allowedTools: tools.map((t) => t.name),
        });
    }
    async extractToolAndInput(text) {
        if (text.includes(FINAL_ANSWER_ACTION)) {
            const parts = text.split(FINAL_ANSWER_ACTION);
            const input = parts[parts.length - 1].trim();
            return { tool: "Final Answer", input };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, action, __] = text.split("```");
        try {
            const response = JSON.parse(action.trim());
            return { tool: response.action, input: response.action_input };
        }
        catch {
            throw new Error(`Unable to parse JSON response from chat agent.\n\n${text}`);
        }
    }
}
//# sourceMappingURL=index.js.map