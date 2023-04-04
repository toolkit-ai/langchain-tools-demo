import { CallbackManager } from "../../callbacks/index.js";
export interface ToolParams {
    verbose?: boolean;
    callbackManager?: CallbackManager;
}
export declare abstract class Tool {
    verbose: boolean;
    callbackManager: CallbackManager;
    constructor(verbose?: boolean, callbackManager?: CallbackManager);
    protected abstract _call(arg: string): Promise<string>;
    call(arg: string, verbose?: boolean): Promise<string>;
    abstract name: string;
    abstract description: string;
    returnDirect: boolean;
}
