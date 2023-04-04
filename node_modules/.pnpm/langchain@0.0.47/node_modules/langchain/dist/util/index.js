import * as yaml from "yaml";
export const extname = (path) => `.${path.split(".").pop()}`;
export const loadFromFile = async (uri, loader, values = {}) => {
    try {
        const fs = await import("node:fs/promises");
        return loader(await fs.readFile(uri, { encoding: "utf-8" }), uri, values);
    }
    catch (e) {
        console.error(e);
        throw new Error(`Could not load file at ${uri}`);
    }
};
export const fetchWithTimeout = async (url, init) => {
    const { timeout, ...rest } = init;
    const res = await fetch(url, {
        ...rest,
        signal: AbortSignal.timeout(timeout),
    });
    return res;
};
const loadFileContents = (contents, format) => {
    switch (format) {
        case ".json":
            return JSON.parse(contents);
        case ".yml":
        case ".yaml":
            return yaml.parse(contents);
        default:
            throw new Error(`Unsupported filetype ${format}`);
    }
};
const resolveFieldFromFile = async (fieldName, config, load, allowExtensions) => {
    const fieldPath = config[`${fieldName}_path`];
    const field = config[fieldName];
    if (fieldPath !== undefined && field !== undefined) {
        throw new Error(`Both '${fieldName}_path' and '${fieldName}' cannot be provided.`);
    }
    if (field !== undefined) {
        return field;
    }
    if (fieldPath !== undefined) {
        const suffix = extname(fieldPath);
        if (allowExtensions && !allowExtensions.includes(suffix)) {
            throw new Error("Invalid file type");
        }
        try {
            const fs = await import("node:fs/promises");
            return load(await fs.readFile(fieldPath, { encoding: "utf-8" }), suffix);
        }
        catch (e) {
            console.error(e);
            throw new Error(`Unable to read file ${fieldPath}: ${e}`);
        }
    }
    throw new Error(`One of '${fieldName}_path' and '${fieldName}' must be provided.`);
};
export const resolveTemplateFromFile = async (fieldName, config) => resolveFieldFromFile(fieldName, config, (contents) => contents, [".txt"]);
export const resolveConfigFromFile = async (fieldName, config) => resolveFieldFromFile(fieldName, config, loadFileContents, [".json", ".yaml"]);
export const parseFileConfig = (text, path, supportedTypes) => {
    const suffix = extname(path);
    if (![".json", ".yaml"].includes(suffix) ||
        (supportedTypes && !supportedTypes.includes(suffix))) {
        throw new Error(`Unsupported filetype ${suffix}`);
    }
    return loadFileContents(text, suffix);
};
export const chunkArray = (arr, chunkSize) => arr.reduce((chunks, elem, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    const chunk = chunks[chunkIndex] || [];
    // eslint-disable-next-line no-param-reassign
    chunks[chunkIndex] = chunk.concat([elem]);
    return chunks;
}, []);
//# sourceMappingURL=index.js.map