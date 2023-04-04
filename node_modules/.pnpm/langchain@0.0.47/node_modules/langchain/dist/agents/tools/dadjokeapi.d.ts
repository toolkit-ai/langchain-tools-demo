import { Tool } from "./base.js";
declare class DadJokeAPI extends Tool {
    name: string;
    description: string;
    constructor();
    _call(input: string): Promise<string>;
}
export { DadJokeAPI };
