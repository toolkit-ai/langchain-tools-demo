import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
interface Element {
    type: string;
    text: string;
    metadata: {
        [key: string]: unknown;
    };
}
export declare class UnstructuredLoader extends BaseDocumentLoader {
    webPath: string;
    filePath: string;
    constructor(webPath: string, filePath: string);
    _partition(): Promise<Element[]>;
    load(): Promise<Document[]>;
    imports(): Promise<{
        readFile: typeof import("node:fs/promises")["readFile"];
    }>;
}
export {};
