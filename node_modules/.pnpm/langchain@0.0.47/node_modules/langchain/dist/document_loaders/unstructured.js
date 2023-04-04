import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export class UnstructuredLoader extends BaseDocumentLoader {
    constructor(webPath, filePath) {
        super();
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
        this.filePath = filePath;
        this.webPath = webPath;
    }
    async _partition() {
        const { readFile } = await this.imports();
        const buffer = await readFile(this.filePath);
        // I'm aware this reads the file into memory first, but we have lots of work
        // to do on then consuming Documents in a streaming fashion anyway, so not
        // worried about this for now.
        const formData = new FormData();
        formData.append("files", new Blob([buffer]));
        const response = await fetch(this.webPath, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Failed to partition file ${this.filePath} with error ${response.status} and message ${await response.text()}`);
        }
        const elements = await response.json();
        if (!Array.isArray(elements)) {
            throw new Error(`Expected partitioning request to return an array, but got ${elements}`);
        }
        return elements;
    }
    async load() {
        const elements = await this._partition();
        const documents = [];
        for (const element of elements) {
            const { metadata, text } = element;
            documents.push(new Document({
                pageContent: text,
                metadata: {
                    ...metadata,
                    category: element.type,
                },
            }));
        }
        return documents;
    }
    async imports() {
        const { readFile } = await import("node:fs/promises");
        return { readFile };
    }
}
//# sourceMappingURL=unstructured.js.map