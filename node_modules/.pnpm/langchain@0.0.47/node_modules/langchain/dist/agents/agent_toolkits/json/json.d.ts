import { BaseLanguageModel } from "../../../base_language/index.js";
import { JsonSpec, Tool } from "../../tools/index.js";
import { CreatePromptArgs } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { AgentExecutor } from "../../executor.js";
export declare class JsonToolkit extends Toolkit {
    jsonSpec: JsonSpec;
    tools: Tool[];
    constructor(jsonSpec: JsonSpec);
}
export declare function createJsonAgent(llm: BaseLanguageModel, toolkit: JsonToolkit, args?: CreatePromptArgs): AgentExecutor;
