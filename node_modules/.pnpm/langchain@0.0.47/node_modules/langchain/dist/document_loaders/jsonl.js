import jsonpointer from "jsonpointer";
import { TextLoader } from "./text.js";
export class JSONLinesLoader extends TextLoader {
    constructor(filePathOrBlob, pointer) {
        super(filePathOrBlob);
        Object.defineProperty(this, "pointer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pointer
        });
    }
    async parse(raw) {
        const lines = raw.split("\n");
        const jsons = lines
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => JSON.parse(line));
        const pointer = jsonpointer.compile(this.pointer);
        return jsons.map((json) => pointer.get(json));
    }
}
//# sourceMappingURL=jsonl.js.map