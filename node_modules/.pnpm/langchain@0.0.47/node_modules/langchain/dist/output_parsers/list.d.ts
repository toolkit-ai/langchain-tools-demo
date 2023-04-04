import { BaseOutputParser } from "../schema/index.js";
/**
 * Class to parse the output of an LLM call to a list.
 * @augments BaseOutputParser
 */
export declare abstract class ListOutputParser extends BaseOutputParser {
    abstract parse(text: string): Promise<string[]>;
}
/**
 * Class to parse the output of an LLM call as a comma-separated list.
 * @augments ListOutputParser
 */
export declare class CommaSeparatedListOutputParser extends ListOutputParser {
    parse(text: string): Promise<string[]>;
    getFormatInstructions(): string;
}
