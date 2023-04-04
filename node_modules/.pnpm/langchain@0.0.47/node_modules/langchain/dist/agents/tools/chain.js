import { Tool } from "./base.js";
export class ChainTool extends Tool {
    constructor(fields) {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnDirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.description = fields.description;
        this.chain = fields.chain;
        this.returnDirect = fields.returnDirect ?? this.returnDirect;
    }
    async _call(input) {
        return this.chain.run(input);
    }
}
//# sourceMappingURL=chain.js.map