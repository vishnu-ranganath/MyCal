import { IncomingMessage, ServerResponse } from "http";
import { methodPROPFIND } from "./methodPROPFIND";
import { AbstractFileAccess } from "./AbstractFileAccess";

function methodPROPPATCH(
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    return;
}

function methodGET(
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    //Ignore message body
    let pathName = fa.getFullPath(req.url!, `http://${req.headers.host}`);
    if(fa.isDirectory(pathName)) {
        res.statusCode = 403;
        return;
    } else if (!fa.isFile(pathName)) {
        res.statusCode = 404;
        res.setHeader("ContentType", "text/html");
        res.write("<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>");
        return;
    }
    try {
        let fileContents = fa.readFile(pathName);
        res.statusCode = 200;
        res.setHeader("ContentType", "text/html");
        res.write(fileContents);
    } catch(e) {
        res.statusCode = 500;
        res.setHeader("ContentType", "text/html");
    }
}

function methodHEAD(
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    //Ignore message body
    let pathName = fa.getFullPath(req.url!, `http://${req.headers.host}`);
    if (fa.isDirectory(pathName)) {
        res.statusCode = 503;
    } else if(!fa.isFile(pathName)) {
        res.statusCode = 404;
    } else {
        res.statusCode = 204;
    }
}

function methodPOST(
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    // It is undecided as to whether this method will be implemented
    return;
}

function methodDELETE(
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    //Ignore message body
    let pathName = fa.getFullPath(req.url!, `http://${req.headers.host}`);
    if(!fa.isFile(pathName)) {
        res.statusCode = 404;
        return;
    }
    try {
        fa.deleteFile(pathName);
        res.statusCode = 204;
        return;
    } catch(e) {
        res.statusCode = 500;
        return;
    }
}

function methodPUT(
    reqBody: string,
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    let pathName = fa.getFullPath(req.url!, `http://${req.headers.host}`);
    if(pathName[pathName.length - 1] === "/" || pathName[pathName.length - 1] == "\\") {
        res.statusCode = 404;
        return;
    } else if(fa.isDirectory(pathName)) {
        res.statusCode = 403;
        return;
    }
    try {
        fa.writeFile(pathName, reqBody);
        res.statusCode = 204;
        return;
    } catch(e) {
        res.statusCode = 500;
        return;
    }
}

function methodOPTIONS(
    req: IncomingMessage,
    res: ServerResponse
): void {
    return;
}

function WebDAVRequestHandler(
    reqBody: string,
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    switch(req.method!) {
        case "PROPFIND":
            methodPROPFIND(reqBody, req, res, fa);
            break;
        case "GET":
            methodGET(req, res, fa);
            break;
        case "HEAD":
            methodHEAD(req, res, fa);
            break;
        case "DELETE":
            methodDELETE(req, res, fa);
            break;
        case "PUT":
            methodPUT(reqBody, req, res, fa);
            break;
        default:
            res.statusCode = 501;
            break;
    }
    res.end();
}

export {WebDAVRequestHandler};
export {methodGET, methodHEAD, methodDELETE, methodPUT};