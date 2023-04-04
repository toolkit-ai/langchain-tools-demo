export declare const extname: (path: string) => string;
export type LoadValues = Record<string, any>;
export type FileLoader<T> = (text: string, filePath: string, values: LoadValues) => Promise<T>;
export declare const loadFromFile: <T>(uri: string, loader: FileLoader<T>, values?: LoadValues) => Promise<T>;
export declare const fetchWithTimeout: (url: string, init: Omit<RequestInit, "signal"> & {
    timeout: number;
}) => Promise<Response>;
export type FromPath<key extends string, T> = {
    [k in key]?: T;
} & {
    [k in `${key}_path`]?: string;
};
export declare const resolveTemplateFromFile: <K extends string>(fieldName: K, config: FromPath<K, string>) => Promise<string>;
export declare const resolveConfigFromFile: <K extends string, T>(fieldName: K, config: FromPath<K, T>) => Promise<T>;
export declare const parseFileConfig: (text: string, path: string, supportedTypes?: string[]) => any;
export declare const chunkArray: <T>(arr: T[], chunkSize: number) => T[][];
