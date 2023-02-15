import { IncomingMessage, ServerResponse } from "http";
import { Element, ElementCompact, xml2js } from "xml-js";
import { AbstractFileAccess } from "./AbstractFileAccess";

function methodPROPFIND(
    reqBody:string,
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    let pathName = fa.getFullPath(req.url!, `http://${req.headers.host}`);
    if(!fa.isDirectory(pathName) && !fa.isFile(pathName)) {
        res.statusCode = 404;
        return;
    }
    let reqXML: Element | ElementCompact;
    try {
        reqXML = xml2js(reqBody);
    } catch(error) {
        res.statusCode = 400;
        return;
    }

    if(reqXML.elements === undefined || reqXML.elements.length != 1) {
        res.statusCode = 400;
        return;
    }
    let root: Element = reqXML.elements[0];

    if(root.type! !== "element" || root.name!.split(":").length != 2) {
        res.statusCode = 400;
        return;
    }
    let davNamespace = root.name!.split(":")[0];
    if(root.attributes!["xmlns:" + davNamespace] === undefined || root.name !== davNamespace + ":propfind") {
        res.statusCode = 400;
        return;
    }

    if(root.elements === undefined || root.elements.length == 0 || root.elements.length > 2) {
        res.statusCode = 400;
        return;
    }
    let queryTypeElement: Element = root.elements[0];
    if(queryTypeElement.type! !== "element") {
        res.statusCode = 400;
        return;
    }

    if(queryTypeElement.name == davNamespace + ":prop" && root.elements.length === 1) {
        res.statusCode = 204;
        return;
    } else if(queryTypeElement.name == davNamespace + ":propname" && root.elements.length === 1) {
        res.statusCode = 204;
        return;
    } else if(queryTypeElement.name == davNamespace + ":allprop") {
        res.statusCode = 204;
        return;
    } else {
        res.statusCode = 400;
        return;
    }
}

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
export {methodPROPFIND, methodGET, methodHEAD, methodDELETE, methodPUT};