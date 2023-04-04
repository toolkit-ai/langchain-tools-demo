import { test, expect } from "@jest/globals";
import { CallbackManager, BaseCallbackHandler, } from "../base.js";
class FakeCallbackHandler extends BaseCallbackHandler {
    constructor(inputs) {
        super(inputs);
        Object.defineProperty(this, "starts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "ends", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "errors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "chainStarts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "chainEnds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "llmStarts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "llmEnds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "llmStreams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "toolStarts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "toolEnds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "agentEnds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "texts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    async handleLLMStart(_llm, _prompts) {
        this.starts += 1;
        this.llmStarts += 1;
    }
    async handleLLMEnd(_output) {
        this.ends += 1;
        this.llmEnds += 1;
    }
    async handleLLMNewToken(_token) {
        this.llmStreams += 1;
    }
    async handleLLMError(_err) {
        this.errors += 1;
    }
    async handleChainStart(_chain, _inputs) {
        this.starts += 1;
        this.chainStarts += 1;
    }
    async handleChainEnd(_outputs) {
        this.ends += 1;
        this.chainEnds += 1;
    }
    async handleChainError(_err) {
        this.errors += 1;
    }
    async handleToolStart(_tool, _input) {
        this.starts += 1;
        this.toolStarts += 1;
    }
    async handleToolEnd(_output) {
        this.ends += 1;
        this.toolEnds += 1;
    }
    async handleToolError(_err, _verbose) {
        this.errors += 1;
    }
    async handleText(_text, _verbose) {
        this.texts += 1;
    }
    async handleAgentAction(_action, _verbose) {
        this.starts += 1;
        this.toolStarts += 1;
    }
    async handleAgentEnd(_action, _verbose) {
        this.ends += 1;
        this.agentEnds += 1;
    }
}
test("CallbackManager", async () => {
    const manager = new CallbackManager();
    const handler1 = new FakeCallbackHandler({ alwaysVerbose: true });
    const handler2 = new FakeCallbackHandler({ alwaysVerbose: false });
    manager.addHandler(handler1);
    manager.addHandler(handler2);
    await manager.handleLLMStart({ name: "test" }, ["test"]);
    await manager.handleLLMEnd({ generations: [] });
    await manager.handleLLMNewToken("test");
    await manager.handleLLMError(new Error("test"));
    await manager.handleChainStart({ name: "test" }, { test: "test" });
    await manager.handleChainEnd({ test: "test" });
    await manager.handleChainError(new Error("test"));
    await manager.handleToolStart({ name: "test" }, "test");
    await manager.handleToolEnd("test");
    await manager.handleToolError(new Error("test"));
    await manager.handleText("test");
    await manager.handleAgentAction({
        tool: "test",
        toolInput: "test",
        log: "test",
    });
    await manager.handleAgentEnd({ returnValues: { test: "test" }, log: "test" });
    expect(handler1.starts).toBe(4);
    expect(handler1.ends).toBe(4);
    expect(handler1.errors).toBe(3);
    expect(handler1.llmStarts).toBe(1);
    expect(handler1.llmEnds).toBe(1);
    expect(handler1.llmStreams).toBe(1);
    expect(handler1.chainStarts).toBe(1);
    expect(handler1.chainEnds).toBe(1);
    expect(handler1.toolStarts).toBe(2);
    expect(handler1.toolEnds).toBe(1);
    expect(handler1.agentEnds).toBe(1);
    expect(handler1.texts).toBe(1);
    expect(handler2.starts).toBe(0);
    expect(handler2.ends).toBe(0);
    expect(handler2.errors).toBe(0);
    expect(handler2.llmStarts).toBe(0);
    expect(handler2.llmEnds).toBe(0);
    expect(handler2.llmStreams).toBe(0);
    expect(handler2.chainStarts).toBe(0);
    expect(handler2.chainEnds).toBe(0);
    expect(handler2.toolStarts).toBe(0);
    expect(handler2.toolEnds).toBe(0);
    expect(handler2.agentEnds).toBe(0);
    expect(handler2.texts).toBe(0);
});
test("CallbackManager with verbose passed in", async () => {
    const manager = new CallbackManager();
    const handler = new FakeCallbackHandler({ alwaysVerbose: false });
    manager.addHandler(handler);
    await manager.handleLLMStart({ name: "test" }, ["test"], true);
    await manager.handleLLMEnd({ generations: [] }, true);
    await manager.handleLLMNewToken("test", true);
    await manager.handleLLMError(new Error("test"), true);
    await manager.handleChainStart({ name: "test" }, { test: "test" }, true);
    await manager.handleChainEnd({ test: "test" }, true);
    await manager.handleChainError(new Error("test"), true);
    await manager.handleToolStart({ name: "test" }, "test", true);
    await manager.handleToolEnd("test", true);
    await manager.handleToolError(new Error("test"), true);
    await manager.handleText("test", true);
    await manager.handleAgentAction({ tool: "test", toolInput: "test", log: "test" }, true);
    await manager.handleAgentEnd({ returnValues: { test: "test" }, log: "test" }, true);
    expect(handler.starts).toBe(4);
    expect(handler.ends).toBe(4);
    expect(handler.errors).toBe(3);
    expect(handler.llmStarts).toBe(1);
    expect(handler.llmEnds).toBe(1);
    expect(handler.llmStreams).toBe(1);
    expect(handler.chainStarts).toBe(1);
    expect(handler.chainEnds).toBe(1);
    expect(handler.toolStarts).toBe(2);
    expect(handler.toolEnds).toBe(1);
    expect(handler.agentEnds).toBe(1);
    expect(handler.texts).toBe(1);
});
test("CallbackHandler with ignoreLLM", async () => {
    const handler = new FakeCallbackHandler({
        alwaysVerbose: true,
        ignoreLLM: true,
    });
    const manager = new CallbackManager();
    manager.addHandler(handler);
    await manager.handleLLMStart({ name: "test" }, ["test"]);
    await manager.handleLLMEnd({ generations: [] });
    await manager.handleLLMNewToken("test");
    await manager.handleLLMError(new Error("test"));
    expect(handler.starts).toBe(0);
    expect(handler.ends).toBe(0);
    expect(handler.errors).toBe(0);
    expect(handler.llmStarts).toBe(0);
    expect(handler.llmEnds).toBe(0);
    expect(handler.llmStreams).toBe(0);
});
test("CallbackHandler with ignoreChain", async () => {
    const handler = new FakeCallbackHandler({
        alwaysVerbose: true,
        ignoreChain: true,
    });
    const manager = new CallbackManager();
    manager.addHandler(handler);
    await manager.handleChainStart({ name: "test" }, { test: "test" });
    await manager.handleChainEnd({ test: "test" });
    await manager.handleChainError(new Error("test"));
    expect(handler.starts).toBe(0);
    expect(handler.ends).toBe(0);
    expect(handler.errors).toBe(0);
    expect(handler.chainStarts).toBe(0);
    expect(handler.chainEnds).toBe(0);
});
test("CallbackHandler with ignoreAgent", async () => {
    const handler = new FakeCallbackHandler({
        alwaysVerbose: true,
        ignoreAgent: true,
    });
    const manager = new CallbackManager();
    manager.addHandler(handler);
    await manager.handleToolStart({ name: "test" }, "test");
    await manager.handleToolEnd("test");
    await manager.handleToolError(new Error("test"));
    await manager.handleAgentAction({
        tool: "test",
        toolInput: "test",
        log: "test",
    });
    await manager.handleAgentEnd({ returnValues: { test: "test" }, log: "test" });
    expect(handler.starts).toBe(0);
    expect(handler.ends).toBe(0);
    expect(handler.errors).toBe(0);
    expect(handler.toolStarts).toBe(0);
    expect(handler.toolEnds).toBe(0);
    expect(handler.agentEnds).toBe(0);
});
//# sourceMappingURL=callbacks.test.js.map