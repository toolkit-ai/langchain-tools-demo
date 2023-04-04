import { Tool } from "./base.js";
export declare class DynamicTool extends Tool {
    name: string;
    description: string;
    func: (arg1: string) => Promise<string>;
    constructor(fields: {
        name: string;
        description: string;
        func: (arg1: string) => Promise<string>;
    });
    _call(input: string): Promise<string>;
}
