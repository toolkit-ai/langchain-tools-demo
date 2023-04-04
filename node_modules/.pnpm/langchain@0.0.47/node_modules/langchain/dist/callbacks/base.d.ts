import { AgentAction, AgentFinish, ChainValues, LLMResult } from "../schema/index.js";
type Error = any;
export interface BaseCallbackHandlerInput {
    alwaysVerbose?: boolean;
    ignoreLLM?: boolean;
    ignoreChain?: boolean;
    ignoreAgent?: boolean;
}
declare abstract class BaseCallbackHandlerMethods {
    handleLLMStart?(llm: {
        name: string;
    }, prompts: string[], verbose?: boolean): Promise<void>;
    handleLLMNewToken?(token: string, verbose?: boolean): Promise<void>;
    handleLLMError?(err: Error, verbose?: boolean): Promise<void>;
    handleLLMEnd?(output: LLMResult, verbose?: boolean): Promise<void>;
    handleChainStart?(chain: {
        name: string;
    }, inputs: ChainValues, verbose?: boolean): Promise<void>;
    handleChainError?(err: Error, verbose?: boolean): Promise<void>;
    handleChainEnd?(outputs: ChainValues, verbose?: boolean): Promise<void>;
    handleToolStart?(tool: {
        name: string;
    }, input: string, verbose?: boolean): Promise<void>;
    handleToolError?(err: Error, verbose?: boolean): Promise<void>;
    handleToolEnd?(output: string, verbose?: boolean): Promise<void>;
    handleText?(text: string, verbose?: boolean): Promise<void>;
    handleAgentAction?(action: AgentAction, verbose?: boolean): Promise<void>;
    handleAgentEnd?(action: AgentFinish, verbose?: boolean): Promise<void>;
}
export declare abstract class BaseCallbackHandler extends BaseCallbackHandlerMethods implements BaseCallbackHandlerInput {
    alwaysVerbose: boolean;
    ignoreLLM: boolean;
    ignoreChain: boolean;
    ignoreAgent: boolean;
    constructor(input?: BaseCallbackHandlerInput);
}
export declare abstract class BaseCallbackManager extends BaseCallbackHandler {
    abstract addHandler(handler: BaseCallbackHandler): void;
    abstract removeHandler(handler: BaseCallbackHandler): void;
    abstract setHandlers(handlers: BaseCallbackHandler[]): void;
    setHandler(handler: BaseCallbackHandler): void;
}
export declare class CallbackManager extends BaseCallbackManager {
    handlers: BaseCallbackHandler[];
    constructor();
    handleLLMStart(llm: {
        name: string;
    }, prompts: string[], verbose?: boolean): Promise<void>;
    handleLLMNewToken(token: string, verbose?: boolean): Promise<void>;
    handleLLMError(err: Error, verbose?: boolean): Promise<void>;
    handleLLMEnd(output: LLMResult, verbose?: boolean): Promise<void>;
    handleChainStart(chain: {
        name: string;
    }, inputs: ChainValues, verbose?: boolean): Promise<void>;
    handleChainError(err: Error, verbose?: boolean): Promise<void>;
    handleChainEnd(output: ChainValues, verbose?: boolean): Promise<void>;
    handleToolStart(tool: {
        name: string;
    }, input: string, verbose?: boolean): Promise<void>;
    handleToolError(err: Error, verbose?: boolean): Promise<void>;
    handleToolEnd(output: string, verbose?: boolean): Promise<void>;
    handleText(text: string, verbose?: boolean): Promise<void>;
    handleAgentAction(action: AgentAction, verbose?: boolean): Promise<void>;
    handleAgentEnd(action: AgentFinish, verbose?: boolean): Promise<void>;
    addHandler(handler: BaseCallbackHandler): void;
    removeHandler(handler: BaseCallbackHandler): void;
    setHandlers(handlers: BaseCallbackHandler[]): void;
    static fromHandlers(handlers: BaseCallbackHandlerMethods): CallbackManager;
}
export declare class ConsoleCallbackHandler extends BaseCallbackHandler {
    handleChainStart(chain: {
        name: string;
    }): Promise<void>;
    handleChainEnd(_output: ChainValues): Promise<void>;
    handleAgentAction(action: AgentAction): Promise<void>;
    handleToolEnd(output: string): Promise<void>;
    handleText(text: string): Promise<void>;
    handleAgentEnd(action: AgentFinish): Promise<void>;
}
export {};
