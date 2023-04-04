import { ChainValues, LLMResult } from "../schema/index.js";
import { BaseCallbackHandler } from "./base.js";
export type RunType = "llm" | "chain" | "tool";
export interface BaseTracerSession {
    start_time: number;
    name?: string;
}
export type TracerSessionCreate = BaseTracerSession;
export interface TracerSession extends BaseTracerSession {
    id: number;
}
export interface BaseRun {
    id?: number;
    start_time: number;
    end_time: number;
    execution_order: number;
    serialized: {
        name: string;
    };
    session_id: number;
    error?: string;
    type: RunType;
}
export interface LLMRun extends BaseRun {
    prompts: string[];
    response?: LLMResult;
}
export interface ChainRun extends BaseRun {
    inputs: ChainValues;
    outputs?: ChainValues;
    child_llm_runs: LLMRun[];
    child_chain_runs: ChainRun[];
    child_tool_runs: ToolRun[];
}
export interface ToolRun extends BaseRun {
    tool_input: string;
    output?: string;
    action: string;
    child_llm_runs: LLMRun[];
    child_chain_runs: ChainRun[];
    child_tool_runs: ToolRun[];
}
export declare abstract class BaseTracer extends BaseCallbackHandler {
    protected session?: TracerSession;
    protected stack: (LLMRun | ChainRun | ToolRun)[];
    protected executionOrder: number;
    protected constructor();
    abstract loadSession(sessionName: string): Promise<TracerSession>;
    abstract loadDefaultSession(): Promise<TracerSession>;
    protected abstract persistRun(run: LLMRun | ChainRun | ToolRun): Promise<void>;
    protected abstract persistSession(session: TracerSessionCreate): Promise<TracerSession>;
    newSession(sessionName?: string): Promise<TracerSession>;
    protected _addChildRun(parentRun: ChainRun | ToolRun, childRun: LLMRun | ChainRun | ToolRun): void;
    protected _startTrace(run: LLMRun | ChainRun | ToolRun): void;
    protected _endTrace(): Promise<void>;
    handleLLMStart(llm: {
        name: string;
    }, prompts: string[], _verbose?: boolean): Promise<void>;
    handleLLMEnd(output: LLMResult, _verbose?: boolean): Promise<void>;
    handleLLMError(error: Error, _verbose?: boolean): Promise<void>;
    handleChainStart(chain: {
        name: string;
    }, inputs: ChainValues, _verbose?: boolean): Promise<void>;
    handleChainEnd(outputs: ChainValues, _verbose?: boolean): Promise<void>;
    handleChainError(error: Error, _verbose?: boolean): Promise<void>;
    handleToolStart(tool: {
        name: string;
    }, input: string, _verbose?: boolean): Promise<void>;
    handleToolEnd(output: string, _verbose?: boolean): Promise<void>;
    handleToolError(error: Error, _verbose?: boolean): Promise<void>;
}
export declare class LangChainTracer extends BaseTracer {
    protected endpoint: string;
    protected headers: Record<string, string>;
    constructor();
    protected persistRun(run: LLMRun | ChainRun | ToolRun): Promise<void>;
    protected persistSession(sessionCreate: TracerSessionCreate): Promise<TracerSession>;
    loadSession(sessionName: string): Promise<TracerSession>;
    loadDefaultSession(): Promise<TracerSession>;
    private _handleSessionResponse;
}
