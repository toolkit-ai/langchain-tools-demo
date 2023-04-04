import { LLM } from "./base.js";
export class HuggingFaceInference extends LLM {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt2"
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        this.model = fields?.model ?? this.model;
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.topP = fields?.topP ?? this.topP;
        this.topK = fields?.topK ?? this.topK;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
    }
    _llmType() {
        return "huggingface_hub";
    }
    async _call(prompt, _stop) {
        if (process.env.HUGGINGFACEHUB_API_KEY === "") {
            throw new Error("Please set the HUGGINGFACEHUB_API_KEY environment variable");
        }
        const { HfInference } = await HuggingFaceInference.imports();
        const hf = new HfInference(process.env.HUGGINGFACEHUB_API_KEY ?? "");
        const res = await this.caller.call(hf.textGeneration.bind(hf), {
            model: this.model,
            parameters: {
                // make it behave similar to openai, returning only the generated text
                return_full_text: false,
                temperature: this.temperature,
                max_new_tokens: this.maxTokens,
                top_p: this.topP,
                top_k: this.topK,
                repetition_penalty: this.frequencyPenalty,
            },
            inputs: prompt,
        });
        return res.generated_text;
    }
    static async imports() {
        try {
            const { HfInference } = await import("@huggingface/inference");
            return { HfInference };
        }
        catch (e) {
            throw new Error("Please install huggingface as a dependency with, e.g. `yarn add @huggingface/inference`");
        }
    }
}
//# sourceMappingURL=hf.js.map