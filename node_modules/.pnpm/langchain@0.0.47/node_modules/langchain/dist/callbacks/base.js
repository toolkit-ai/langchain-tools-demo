class BaseCallbackHandlerMethods {
}
export class BaseCallbackHandler extends BaseCallbackHandlerMethods {
    constructor(input) {
        super();
        Object.defineProperty(this, "alwaysVerbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        if (input) {
            this.alwaysVerbose = input.alwaysVerbose ?? this.alwaysVerbose;
            this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
            this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
            this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
        }
    }
}
export class BaseCallbackManager extends BaseCallbackHandler {
    setHandler(handler) {
        return this.setHandlers([handler]);
    }
}
export class CallbackManager extends BaseCallbackManager {
    constructor() {
        super();
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handlers = [];
    }
    async handleLLMStart(llm, prompts, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreLLM && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleLLMStart?.(llm, prompts);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                }
            }
        }));
    }
    async handleLLMNewToken(token, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreLLM && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleLLMNewToken?.(token);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
                }
            }
        }));
    }
    async handleLLMError(err, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreLLM && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleLLMError?.(err);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMError: ${err}`);
                }
            }
        }));
    }
    async handleLLMEnd(output, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreLLM && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleLLMEnd?.(output);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
                }
            }
        }));
    }
    async handleChainStart(chain, inputs, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreChain && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleChainStart?.(chain, inputs);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
                }
            }
        }));
    }
    async handleChainError(err, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreChain && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleChainError?.(err);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainError: ${err}`);
                }
            }
        }));
    }
    async handleChainEnd(output, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreChain && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleChainEnd?.(output);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
                }
            }
        }));
    }
    async handleToolStart(tool, input, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreAgent && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleToolStart?.(tool, input);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
                }
            }
        }));
    }
    async handleToolError(err, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreAgent && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleToolError?.(err);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolError: ${err}`);
                }
            }
        }));
    }
    async handleToolEnd(output, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreAgent && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleToolEnd?.(output);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
                }
            }
        }));
    }
    async handleText(text, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (verbose || handler.alwaysVerbose) {
                try {
                    await handler.handleText?.(text);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
                }
            }
        }));
    }
    async handleAgentAction(action, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreAgent && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleAgentAction?.(action);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
                }
            }
        }));
    }
    async handleAgentEnd(action, verbose) {
        await Promise.all(this.handlers.map(async (handler) => {
            if (!handler.ignoreAgent && (verbose || handler.alwaysVerbose)) {
                try {
                    await handler.handleAgentEnd?.(action);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
                }
            }
        }));
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter((_handler) => _handler !== handler);
    }
    setHandlers(handlers) {
        this.handlers = handlers;
    }
    static fromHandlers(handlers) {
        class Handler extends BaseCallbackHandler {
            constructor() {
                super();
                Object.defineProperty(this, "alwaysVerbose", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: true
                });
                Object.assign(this, handlers);
            }
        }
        const manager = new this();
        manager.addHandler(new Handler());
        return manager;
    }
}
export class ConsoleCallbackHandler extends BaseCallbackHandler {
    async handleChainStart(chain) {
        console.log(`Entering new ${chain.name} chain...`);
    }
    async handleChainEnd(_output) {
        console.log("Finished chain.");
    }
    async handleAgentAction(action) {
        console.log(action.log);
    }
    async handleToolEnd(output) {
        console.log(output);
    }
    async handleText(text) {
        console.log(text);
    }
    async handleAgentEnd(action) {
        console.log(action.log);
    }
}
//# sourceMappingURL=base.js.map