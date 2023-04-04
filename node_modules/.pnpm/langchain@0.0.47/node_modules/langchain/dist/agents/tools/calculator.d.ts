import { Tool } from "./base.js";
export declare class Calculator extends Tool {
    name: string;
    _call(input: string): Promise<string>;
    description: string;
}
