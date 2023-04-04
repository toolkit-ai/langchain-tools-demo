import { BaseChain } from "./base.js";
import { LLMChain } from "./llm_chain.js";
import { resolveConfigFromFile } from "../util/index.js";
/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export class StuffDocumentsChain extends BaseChain {
    get inputKeys() {
        return [this.inputKey, ...this.llmChain.inputKeys];
    }
    constructor(fields) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output_text"
        });
        Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
        });
        this.llmChain = fields.llmChain;
        this.documentVariableName =
            fields.documentVariableName ?? this.documentVariableName;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
    }
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs, ...rest } = values;
        const texts = docs.map(({ pageContent }) => pageContent);
        const text = texts.join("\n\n");
        const result = await this.llmChain.call({
            ...rest,
            [this.documentVariableName]: text,
        });
        return result;
    }
    _chainType() {
        return "stuff_documents_chain";
    }
    static async deserialize(data) {
        const SerializedLLMChain = await resolveConfigFromFile("llm_chain", data);
        return new StuffDocumentsChain({
            llmChain: await LLMChain.deserialize(SerializedLLMChain),
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
        };
    }
}
/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export class MapReduceDocumentsChain extends BaseChain {
    get inputKeys() {
        return [this.inputKey, ...this.combineDocumentChain.inputKeys];
    }
    constructor(fields) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_documents"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output_text"
        });
        Object.defineProperty(this, "documentVariableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "context"
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3000
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "combineDocumentChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmChain = fields.llmChain;
        this.combineDocumentChain = fields.combineDocumentChain;
        this.documentVariableName =
            fields.documentVariableName ?? this.documentVariableName;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.maxTokens = fields.maxTokens ?? this.maxTokens;
        this.maxIterations = fields.maxIterations ?? this.maxIterations;
    }
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: docs, ...rest } = values;
        let currentDocs = docs;
        for (let i = 0; i < this.maxIterations; i += 1) {
            const inputs = currentDocs.map((d) => ({
                [this.documentVariableName]: d.pageContent,
                ...rest,
            }));
            const promises = inputs.map(async (i) => {
                const prompt = await this.llmChain.prompt.format(i);
                return this.llmChain.llm.getNumTokens(prompt);
            });
            const length = await Promise.all(promises).then((results) => results.reduce((a, b) => a + b, 0));
            if (length < this.maxTokens) {
                break;
            }
            const results = await this.llmChain.apply(inputs);
            const { outputKey } = this.llmChain;
            currentDocs = results.map((r) => ({
                pageContent: r[outputKey],
            }));
        }
        const newInputs = { input_documents: currentDocs, ...rest };
        const result = await this.combineDocumentChain.call(newInputs);
        return result;
    }
    _chainType() {
        return "map_reduce_documents_chain";
    }
    static async deserialize(data) {
        const SerializedLLMChain = await resolveConfigFromFile("llm_chain", data);
        const SerializedCombineDocumentChain = await resolveConfigFromFile("combine_document_chain", data);
        return new MapReduceDocumentsChain({
            llmChain: await LLMChain.deserialize(SerializedLLMChain),
            combineDocumentChain: await BaseChain.deserialize(SerializedCombineDocumentChain),
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            llm_chain: this.llmChain.serialize(),
            combine_document_chain: this.combineDocumentChain.serialize(),
        };
    }
}
//# sourceMappingURL=combine_docs_chain.js.map