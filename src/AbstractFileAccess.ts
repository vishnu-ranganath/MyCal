import { IncomingMessage } from "http";

export abstract class AbstractFileAccess {

    abstract deleteFile(path: string): void;
    abstract getFullPath(url: string, host: string): string;
    abstract isFile(path: string): boolean;
    abstract isDirectory(path: string): boolean;
    abstract readFile(path: string): string;
    abstract writeFile(path: string, contents: string): void;

}