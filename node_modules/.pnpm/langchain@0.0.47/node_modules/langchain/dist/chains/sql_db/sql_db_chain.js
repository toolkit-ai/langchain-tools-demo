import { DEFAULT_SQL_DATABASE_PROMPT } from "./sql_db_prompt.js";
import { BaseChain } from "../base.js";
import { LLMChain } from "../llm_chain.js";
import { SqlDatabase } from "../../sql_db.js";
import { resolveConfigFromFile } from "../../util/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
export class SqlDatabaseChain extends BaseChain {
    constructor(fields) {
        const { memory } = fields;
        super(memory);
        // LLM wrapper to use
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // SQL Database to connect to.
        Object.defineProperty(this, "database", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Prompt to use to translate natural language to SQL.
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_SQL_DATABASE_PROMPT
        });
        // Number of results to return from the query
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "result"
        });
        // Whether to return the result of querying the SQL table directly.
        Object.defineProperty(this, "returnDirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.llm = fields.llm;
        this.database = fields.database;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
    }
    async _call(values) {
        const lLMChain = new LLMChain({
            prompt: this.prompt,
            llm: this.llm,
            outputKey: this.outputKey,
            memory: this.memory,
        });
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        let inputText = `${question}\nSQLQuery:`;
        const tablesToUse = values.table_names_to_use;
        const tableInfo = await this.database.getTableInfo(tablesToUse);
        const llmInputs = {
            input: inputText,
            top_k: this.topK,
            dialect: this.database.appDataSourceOptions.type,
            table_info: tableInfo,
            stop: ["\nSQLResult:"],
        };
        const intermediateStep = [];
        const sqlCommand = await lLMChain.predict(llmInputs);
        intermediateStep.push(sqlCommand);
        let queryResult = "";
        try {
            queryResult = await this.database.appDataSource.query(sqlCommand);
            intermediateStep.push(queryResult);
        }
        catch (error) {
            console.error(error);
        }
        let finalResult;
        if (this.returnDirect) {
            finalResult = { result: queryResult };
        }
        else {
            inputText += `${+sqlCommand}\nSQLResult: ${JSON.stringify(queryResult)}\nAnswer:`;
            llmInputs.input = inputText;
            finalResult = { result: await lLMChain.predict(llmInputs) };
        }
        return finalResult;
    }
    _chainType() {
        return "sql_database_chain";
    }
    get inputKeys() {
        return [this.inputKey];
    }
    static async deserialize(data) {
        const serializedLLM = await resolveConfigFromFile("llm", data);
        const llm = await BaseLanguageModel.deserialize(serializedLLM);
        const serializedDatabase = await resolveConfigFromFile("sql_database", data);
        const sqlDataBase = await SqlDatabase.fromOptionsParams(serializedDatabase);
        return new SqlDatabaseChain({
            llm,
            database: sqlDataBase,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm: this.llm.serialize(),
            sql_database: this.database.serialize(),
        };
    }
}
//# sourceMappingURL=sql_db_chain.js.map