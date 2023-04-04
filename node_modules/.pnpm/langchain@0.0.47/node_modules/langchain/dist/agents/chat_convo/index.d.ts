import { Agent } from "../agent.js";
import { ChatPromptTemplate } from "../../prompts/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { AgentStep, BaseChatMessage, BaseOutputParser } from "../../schema/index.js";
import { AgentInput } from "../types.js";
import { Tool } from "../tools/base.js";
export declare class ChatConversationalAgentOutputParser extends BaseOutputParser {
    parse(text: string): Promise<unknown>;
    getFormatInstructions(): string;
}
export type CreatePromptArgs = {
    /** String to put after the list of tools. */
    systemMessage?: string;
    /** String to put before the list of tools. */
    humanMessage?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
    /** Output parser to use for formatting. */
    outputParser?: BaseOutputParser;
};
export type ChatConversationalAgentInput = AgentInput;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export declare class ChatConversationalAgent extends Agent {
    outputParser: BaseOutputParser;
    constructor(input: ChatConversationalAgentInput, outputParser?: BaseOutputParser);
    _agentType(): string;
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    static validateTools(tools: Tool[]): void;
    constructScratchPad(steps: AgentStep[]): BaseChatMessage[];
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     */
    static createPrompt(tools: Tool[], args?: CreatePromptArgs): ChatPromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: CreatePromptArgs): ChatConversationalAgent;
    extractToolAndInput(text: string): Promise<{
        tool: string;
        input: string;
    } | null>;
}
