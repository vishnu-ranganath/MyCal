import { IncomingMessage } from "http";

export abstract class AbstractFileAccess {

    abstract getFullPath(url: string, host: string): string;
    abstract isFile(path: string): boolean;
    abstract isDirectory(path: string): boolean;
    abstract readFile(path: string): string;

}