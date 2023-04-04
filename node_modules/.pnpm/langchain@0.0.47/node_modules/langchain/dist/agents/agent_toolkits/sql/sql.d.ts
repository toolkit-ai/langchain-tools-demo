import { Tool } from "../../tools/index.js";
import { Toolkit } from "../base.js";
import { BaseLanguageModel } from "../../../base_language/index.js";
import { CreatePromptArgs } from "../../mrkl/index.js";
import { AgentExecutor } from "../../executor.js";
import { SqlDatabase } from "../../../sql_db.js";
type SqlCreatePromptArgs = {
    /** Number of results to return. */
    topK?: number;
} & CreatePromptArgs;
export declare class SqlToolkit extends Toolkit {
    tools: Tool[];
    db: SqlDatabase;
    dialect: string;
    constructor(db: SqlDatabase);
}
export declare function createSqlAgent(llm: BaseLanguageModel, toolkit: SqlToolkit, args?: SqlCreatePromptArgs): AgentExecutor;
export {};
