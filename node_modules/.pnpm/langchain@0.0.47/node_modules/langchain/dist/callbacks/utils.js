import { LangChainTracer } from "./tracers.js";
import { CallbackManager, ConsoleCallbackHandler } from "./base.js";
export class SingletonCallbackManager extends CallbackManager {
    constructor() {
        super();
    }
    static getInstance() {
        if (!SingletonCallbackManager.instance) {
            SingletonCallbackManager.instance = new SingletonCallbackManager();
            SingletonCallbackManager.instance.addHandler(new ConsoleCallbackHandler());
            if (process.env.LANGCHAIN_HANDLER === "langchain") {
                SingletonCallbackManager.instance.addHandler(new LangChainTracer());
            }
        }
        return SingletonCallbackManager.instance;
    }
}
export function getCallbackManager() {
    return SingletonCallbackManager.getInstance();
}
export async function setTracerSession(options, callbackManager = getCallbackManager()) {
    for (const handler of callbackManager.handlers) {
        if (handler instanceof LangChainTracer) {
            const sessionName = options?.sessionName;
            if (sessionName) {
                await handler.loadSession(sessionName);
            }
            else {
                await handler.loadDefaultSession();
            }
        }
    }
}
//# sourceMappingURL=utils.js.map