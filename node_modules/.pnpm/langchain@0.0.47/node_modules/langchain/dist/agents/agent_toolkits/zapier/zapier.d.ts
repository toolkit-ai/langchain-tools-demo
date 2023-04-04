import { Toolkit } from "../base.js";
import { Tool } from "../../tools/index.js";
import { ZapierNLAWrapper } from "../../tools/zapier.js";
export declare class ZapierToolKit extends Toolkit {
    tools: Tool[];
    protected constructor();
    static fromZapierNLAWrapper(zapierNLAWrapper: ZapierNLAWrapper): Promise<ZapierToolKit>;
}
