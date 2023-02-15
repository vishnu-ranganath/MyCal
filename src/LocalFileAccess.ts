import { AbstractFileAccess } from "./AbstractFileAccess";
import Os from "os";
import { lstatSync } from "fs";

export class LocalFileAccess extends AbstractFileAccess {

    homeDir: string;

    constructor(homeDir: string) {
        super();
        this.homeDir = homeDir;
    }

    getFullPath(url: string, host: string): string {
        let pathName = new URL(url, host).pathname;
        let slash = Os.platform() == "win32" ? "\\" : "/";
        pathName = pathName.replace(/\//g, slash);
        if(pathName.length == 0) {
            return this.homeDir + slash;
        }
        return this.homeDir + pathName;
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