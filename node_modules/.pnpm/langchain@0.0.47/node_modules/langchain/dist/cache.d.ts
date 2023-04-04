import type { RedisClientType } from "redis";
import { Generation } from "./schema/index.js";
export declare abstract class BaseCache<T = Generation[]> {
    abstract lookup(prompt: string, llmKey: string): Promise<T | null>;
    abstract update(prompt: string, llmKey: string, value: T): Promise<void>;
}
export declare class InMemoryCache<T = Generation[]> extends BaseCache<T> {
    private cache;
    constructor(map?: Map<string, T>);
    lookup(prompt: string, llmKey: string): Promise<T | null>;
    update(prompt: string, llmKey: string, value: T): Promise<void>;
    static global(): InMemoryCache;
}
/**
 *
 * TODO: Generalize to support other types.
 */
export declare class RedisCache extends BaseCache<Generation[]> {
    private redisClient;
    constructor(redisClient: RedisClientType);
    lookup(prompt: string, llmKey: string): Promise<Generation[] | null>;
    update(prompt: string, llmKey: string, value: Generation[]): Promise<void>;
}
