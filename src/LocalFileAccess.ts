import { AbstractFileAccess } from "./AbstractFileAccess";
import { IncomingMessage } from "http";
import Os from "os";
import { lstatSync } from "fs";

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

    isFile(path: string): boolean {
        try {
            let h = lstatSync(path);
            return h.isFile();
        } catch(e) {
            return false;
        }
    }

    isDirectory(path: string): boolean {
        try {
            let h = lstatSync(path);
            return h.isDirectory();
        } catch(e) {
            return false;
        }
    }

}