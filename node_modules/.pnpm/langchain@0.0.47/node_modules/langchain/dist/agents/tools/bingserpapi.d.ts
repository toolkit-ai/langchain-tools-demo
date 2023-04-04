import { Tool } from "./base.js";
declare class BingSerpAPI extends Tool {
    name: string;
    description: string;
    key: string;
    params: Record<string, string>;
    constructor(apiKey?: string | undefined, params?: Record<string, string>);
    _call(input: string): Promise<string>;
}
export { BingSerpAPI };
