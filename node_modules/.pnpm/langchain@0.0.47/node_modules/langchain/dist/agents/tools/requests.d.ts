import { Tool } from "./base.js";
export interface Headers {
    [key: string]: string;
}
export interface RequestTool {
    headers: Headers;
}
export declare class RequestsGetTool extends Tool implements RequestTool {
    headers: Headers;
    name: string;
    constructor(headers?: Headers);
    _call(input: string): Promise<string>;
    description: string;
}
export declare class RequestsPostTool extends Tool implements RequestTool {
    headers: Headers;
    name: string;
    constructor(headers?: Headers);
    _call(input: string): Promise<string>;
    description: string;
}
