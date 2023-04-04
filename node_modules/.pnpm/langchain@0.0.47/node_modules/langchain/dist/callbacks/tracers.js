import { BaseCallbackHandler } from "./base.js";
export class BaseTracer extends BaseCallbackHandler {
    constructor() {
        super();
        Object.defineProperty(this, "session", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "executionOrder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        this.alwaysVerbose = true;
    }
    async newSession(sessionName) {
        const sessionCreate = {
            start_time: Date.now(),
            name: sessionName,
        };
        const session = await this.persistSession(sessionCreate);
        this.session = session;
        return session;
    }
    _addChildRun(parentRun, childRun) {
        if (childRun.type === "llm") {
            parentRun.child_llm_runs.push(childRun);
        }
        else if (childRun.type === "chain") {
            parentRun.child_chain_runs.push(childRun);
        }
        else if (childRun.type === "tool") {
            parentRun.child_tool_runs.push(childRun);
        }
        else {
            throw new Error("Invalid run type");
        }
    }
    _startTrace(run) {
        this.executionOrder += 1;
        if (this.stack.length > 0) {
            if (!(this.stack.at(-1)?.type === "tool" ||
                this.stack.at(-1)?.type === "chain")) {
                throw new Error("Nested run can only be logged for tool or chain");
            }
            const parentRun = this.stack.at(-1);
            this._addChildRun(parentRun, run);
        }
        this.stack.push(run);
    }
    async _endTrace() {
        const run = this.stack.pop();
        if (this.stack.length === 0 && run) {
            this.executionOrder = 1;
            await this.persistRun(run);
        }
    }
    async handleLLMStart(llm, prompts, _verbose) {
        if (this.session === undefined) {
            this.session = await this.loadDefaultSession();
        }
        const run = {
            start_time: Date.now(),
            end_time: 0,
            serialized: llm,
            prompts,
            session_id: this.session.id,
            execution_order: this.executionOrder,
            type: "llm",
        };
        this._startTrace(run);
    }
    async handleLLMEnd(output, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.response = output;
        await this._endTrace();
    }
    async handleLLMError(error, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.error = error.message;
        await this._endTrace();
    }
    async handleChainStart(chain, inputs, _verbose) {
        if (this.session === undefined) {
            this.session = await this.loadDefaultSession();
        }
        const run = {
            start_time: Date.now(),
            end_time: 0,
            serialized: chain,
            inputs,
            session_id: this.session.id,
            execution_order: this.executionOrder,
            type: "chain",
            child_llm_runs: [],
            child_chain_runs: [],
            child_tool_runs: [],
        };
        this._startTrace(run);
    }
    async handleChainEnd(outputs, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "chain") {
            throw new Error("No chain run to end.");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.outputs = outputs;
        await this._endTrace();
    }
    async handleChainError(error, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "chain") {
            throw new Error("No chain run to end.");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.error = error.message;
        await this._endTrace();
    }
    async handleToolStart(tool, input, _verbose) {
        if (this.session === undefined) {
            this.session = await this.loadDefaultSession();
        }
        const run = {
            start_time: Date.now(),
            end_time: 0,
            serialized: tool,
            tool_input: input,
            session_id: this.session.id,
            execution_order: this.executionOrder,
            type: "tool",
            action: JSON.stringify(tool),
            child_llm_runs: [],
            child_chain_runs: [],
            child_tool_runs: [],
        };
        this._startTrace(run);
    }
    async handleToolEnd(output, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "tool") {
            throw new Error("No tool run to end");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.output = output;
        await this._endTrace();
    }
    async handleToolError(error, _verbose) {
        if (this.stack.length === 0 || this.stack.at(-1)?.type !== "tool") {
            throw new Error("No tool run to end.");
        }
        const run = this.stack.at(-1);
        run.end_time = Date.now();
        run.error = error.message;
        await this._endTrace();
    }
}
export class LangChainTracer extends BaseTracer {
    constructor() {
        super();
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: process.env.LANGCHAIN_ENDPOINT || "http://localhost:8000"
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                "Content-Type": "application/json",
            }
        });
        if (process.env.LANGCHAIN_API_KEY) {
            this.headers["x-api-key"] = process.env.LANGCHAIN_API_KEY;
        }
    }
    async persistRun(run) {
        let endpoint;
        if (run.type === "llm") {
            endpoint = `${this.endpoint}/llm-runs`;
        }
        else if (run.type === "chain") {
            endpoint = `${this.endpoint}/chain-runs`;
        }
        else {
            endpoint = `${this.endpoint}/tool-runs`;
        }
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(run),
        });
        if (!response.ok) {
            console.error(`Failed to persist run: ${response.status} ${response.statusText}`);
        }
    }
    async persistSession(sessionCreate) {
        const endpoint = `${this.endpoint}/sessions`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(sessionCreate),
        });
        if (!response.ok) {
            console.error(`Failed to persist session: ${response.status} ${response.statusText}, using default session.`);
            return {
                id: 1,
                ...sessionCreate,
            };
        }
        return {
            id: (await response.json()).id,
            ...sessionCreate,
        };
    }
    async loadSession(sessionName) {
        const endpoint = `${this.endpoint}/sessions?name=${sessionName}`;
        return this._handleSessionResponse(endpoint);
    }
    async loadDefaultSession() {
        const endpoint = `${this.endpoint}/sessions?name=default`;
        return this._handleSessionResponse(endpoint);
    }
    async _handleSessionResponse(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: this.headers,
        });
        let tracerSession;
        if (!response.ok) {
            console.error(`Failed to load session: ${response.status} ${response.statusText}`);
            tracerSession = {
                id: 1,
                start_time: Date.now(),
            };
            this.session = tracerSession;
            return tracerSession;
        }
        const resp = (await response.json());
        if (resp.length === 0) {
            tracerSession = {
                id: 1,
                start_time: Date.now(),
            };
            this.session = tracerSession;
            return tracerSession;
        }
        [tracerSession] = resp;
        this.session = tracerSession;
        return tracerSession;
    }
}
//# sourceMappingURL=tracers.js.map