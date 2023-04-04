import { Tool } from "./base.js";
type GoogleParameters = {
    gl?: string;
    hl?: string;
};
/**
 * Wrapper around serper.
 *
 * You can create a free API key at https://serper.dev.
 *
 * To use, you should have the SERPER_API_KEY environment variable set.
 */
export declare class Serper extends Tool {
    protected key: string;
    protected params: Partial<GoogleParameters>;
    constructor(apiKey?: string | undefined, params?: Partial<GoogleParameters>);
    name: string;
    /**
     * Run query through SerpAPI and parse result
     */
    _call(input: string): Promise<any>;
    description: string;
}
export {};
