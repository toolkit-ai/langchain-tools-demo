import { Agent } from "../agent.js";
import { ChatPromptTemplate } from "../../prompts/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { AgentStep } from "../../schema/index.js";
import { AgentInput } from "../types.js";
import { Tool } from "../tools/base.js";
export type CreatePromptArgs = {
    /** String to put after the list of tools. */
    suffix?: string;
    /** String to put before the list of tools. */
    prefix?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
};
type ZeroShotAgentInput = AgentInput;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export declare class ChatAgent extends Agent {
    constructor(input: ZeroShotAgentInput);
    _agentType(): "zero-shot-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    static validateTools(tools: Tool[]): void;
    constructScratchPad(steps: AgentStep[]): string;
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     */
    static createPrompt(tools: Tool[], args?: CreatePromptArgs): ChatPromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: CreatePromptArgs): ChatAgent;
    extractToolAndInput(text: string): Promise<{
        tool: string;
        input: string;
    } | null>;
}
export {};
