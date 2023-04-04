/**
 * Interface for interacting with a document.
 */
export class Document {
    constructor(fields) {
        Object.defineProperty(this, "pageContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pageContent = fields?.pageContent ?? this.pageContent;
        this.metadata = fields?.metadata ?? {};
    }
}
//# sourceMappingURL=document.js.map