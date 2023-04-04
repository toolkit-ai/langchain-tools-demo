import type { CheerioAPI, load as LoadT } from "cheerio";
import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
import type { DocumentLoader } from "./base.js";
export declare class CheerioWebBaseLoader extends BaseDocumentLoader implements DocumentLoader {
    webPath: string;
    constructor(webPath: string);
    static _scrape(url: string): Promise<CheerioAPI>;
    scrape(): Promise<CheerioAPI>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        load: typeof LoadT;
    }>;
}
