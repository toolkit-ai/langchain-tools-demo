import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
export class CheerioWebBaseLoader extends BaseDocumentLoader {
    constructor(webPath) {
        super();
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
    }
    static async _scrape(url) {
        const { load } = await CheerioWebBaseLoader.imports();
        const response = await fetch(url);
        const html = await response.text();
        return load(html);
    }
    async scrape() {
        return CheerioWebBaseLoader._scrape(this.webPath);
    }
    async load() {
        const $ = await this.scrape();
        const text = $("body").text();
        const metadata = { source: this.webPath };
        return [new Document({ pageContent: text, metadata })];
    }
    static async imports() {
        try {
            const { load } = await import("cheerio");
            return { load };
        }
        catch (e) {
            console.error(e);
            throw new Error("Please install cheerio as a dependency with, e.g. `yarn add cheerio`");
        }
    }
}
//# sourceMappingURL=cheerio_web_base.js.map