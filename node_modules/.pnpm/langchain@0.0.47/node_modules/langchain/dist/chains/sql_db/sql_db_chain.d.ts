import { BaseChain } from "../base.js";
import { BaseMemory } from "../../memory/index.js";
import { SqlDatabase } from "../../sql_db.js";
import { ChainValues } from "../../schema/index.js";
import { SerializedSqlDatabaseChain } from "../serde.js";
import { BaseLanguageModel } from "../../base_language/index.js";
export declare class SqlDatabaseChain extends BaseChain {
    llm: BaseLanguageModel;
    database: SqlDatabase;
    prompt: import("../../index.js").PromptTemplate;
    topK: number;
    inputKey: string;
    outputKey: string;
    returnDirect: boolean;
    constructor(fields: {
        llm: BaseLanguageModel;
        database: SqlDatabase;
        inputKey?: string;
        outputKey?: string;
        memory?: BaseMemory;
    });
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): "sql_database_chain";
    get inputKeys(): string[];
    static deserialize(data: SerializedSqlDatabaseChain): Promise<SqlDatabaseChain>;
    serialize(): SerializedSqlDatabaseChain;
}
