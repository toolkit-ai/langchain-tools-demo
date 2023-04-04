import { Document } from "../document.js";
import { BaseDocumentLoader } from "./base.js";
import { UnknownHandling } from "./directory.js";
export interface GithubRepoLoaderParams {
    branch?: string;
    recursive?: boolean;
    unknown?: UnknownHandling;
    accessToken?: string;
}
export declare class GithubRepoLoader extends BaseDocumentLoader implements GithubRepoLoaderParams {
    private readonly owner;
    private readonly repo;
    private readonly initialPath;
    private headers;
    branch: string;
    recursive: boolean;
    unknown: UnknownHandling;
    accessToken?: string;
    constructor(githubUrl: string, { accessToken, branch, recursive, unknown, }?: GithubRepoLoaderParams);
    private extractOwnerAndRepoAndPath;
    load(): Promise<Document[]>;
    private processDirectory;
    private fetchRepoFiles;
    private fetchFileContent;
    private handleError;
}
