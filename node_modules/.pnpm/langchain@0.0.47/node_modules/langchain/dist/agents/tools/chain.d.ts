import { Tool } from "./base.js";
import { BaseChain } from "../../chains/base.js";
export declare class ChainTool extends Tool {
    name: string;
    description: string;
    chain: BaseChain;
    returnDirect: boolean;
    constructor(fields: {
        name: string;
        description: string;
        chain: BaseChain;
        returnDirect?: boolean;
    });
    _call(input: string): Promise<string>;
}
