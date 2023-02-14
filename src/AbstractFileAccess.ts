import { IncomingMessage } from "http";

export abstract class AbstractFileAccess {

    abstract getPathName(req: IncomingMessage): string;
    abstract pathExists(path: string): boolean;
    abstract isDirectory(path: string): boolean;

}