import { CallbackManager } from "./base.js";
export declare class SingletonCallbackManager extends CallbackManager {
    private static instance;
    private constructor();
    static getInstance(): SingletonCallbackManager;
}
export declare function getCallbackManager(): CallbackManager;
export interface TracerOptions {
    sessionName?: string;
}
export declare function setTracerSession(options?: TracerOptions, callbackManager?: CallbackManager): Promise<void>;
