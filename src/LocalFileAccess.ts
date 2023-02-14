import { AbstractFileAccess } from "./AbstractFileAccess";
import { IncomingMessage } from "http";
import Os from "os";

export class LocalFileAccess extends AbstractFileAccess {

    getPathName(req: IncomingMessage): string {
        let pathName = new URL(req.url!, `http://${req.headers.host}`).pathname;
        let slash = Os.platform() == "win32" ? "\\" : "/";
        pathName = pathName.replace(/\//g, slash);
        if(pathName.length == 0) {
            return slash;
        }
        return pathName;
    }

    pathExists(path: string): boolean {
        return false;
    }

    isDirectory(path: string): boolean {
        return false;
    }

}