import { Tool } from "./base.js";
import { LLMChain } from "../../chains/index.js";
import { SqlDatabase } from "../../sql_db.js";
interface SqlTool {
    db: SqlDatabase;
}
export declare class QuerySqlTool extends Tool implements SqlTool {
    name: string;
    db: SqlDatabase;
    constructor(db: SqlDatabase);
    _call(input: string): Promise<string>;
    description: string;
}
export declare class InfoSqlTool extends Tool implements SqlTool {
    name: string;
    db: SqlDatabase;
    constructor(db: SqlDatabase);
    _call(input: string): Promise<string>;
    description: string;
}
export declare class ListTablesSqlTool extends Tool implements SqlTool {
    name: string;
    db: SqlDatabase;
    constructor(db: SqlDatabase);
    _call(_: string): Promise<string>;
    description: string;
}
export declare class QueryCheckerTool extends Tool {
    name: string;
    template: string;
    llmChain: LLMChain;
    constructor(llmChain?: LLMChain);
    _call(input: string): Promise<string>;
    description: string;
}
export {};
