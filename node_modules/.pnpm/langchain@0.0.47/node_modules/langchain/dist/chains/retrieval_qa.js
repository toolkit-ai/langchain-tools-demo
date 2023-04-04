import { BaseChain } from "./base.js";
import { loadQAStuffChain } from "./question_answering/load.js";
export class RetrievalQAChain extends BaseChain {
    get inputKeys() {
        return [this.inputKey];
    }
    constructor(fields) {
        super();
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
        Object.defineProperty(this, "retriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.retriever = fields.retriever;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.returnSourceDocuments =
            fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    async _call(values) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.retriever.getRelevantDocuments(question);
        const inputs = { question, input_documents: docs };
        const result = await this.combineDocumentsChain.call(inputs);
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs,
            };
        }
        return result;
    }
    _chainType() {
        return "retrieval_qa";
    }
    static async deserialize(_data, _values) {
        throw new Error("Not implemented");
    }
    serialize() {
        throw new Error("Not implemented");
    }
    static fromLLM(llm, retriever, options) {
        const qaChain = loadQAStuffChain(llm);
        return new this({
            retriever,
            combineDocumentsChain: qaChain,
            ...options,
        });
    }
}
//# sourceMappingURL=retrieval_qa.js.map