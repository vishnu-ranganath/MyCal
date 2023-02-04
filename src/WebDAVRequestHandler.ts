import { IncomingMessage, ServerResponse } from "http";
import { Element, ElementCompact, xml2js } from "xml-js";
import { existsSync } from "fs";
import Os from "os";

function getPathName(req: IncomingMessage): string {
    let pathName = new URL(req.url!, `http://${req.headers.host}`).pathname;
    let slash = Os.platform() == "win32" ? "\\" : "/";
    pathName = pathName.replace(/\//g, slash);
    if(pathName.length == 0) {
        return slash;
    }
    return pathName;
}

function methodPROPFIND(reqBody:string, req: IncomingMessage, res: ServerResponse): void {
    let pathName = getPathName(req);
    if(!existsSync(__dirname + pathName)) {
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

function methodPROPPATCH(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodGET(req: IncomingMessage, res: ServerResponse): void {
    //Ignore message body
    let pathName = getPathName(req);
    if(pathName[pathName.length - 1] === "/" || pathName[pathName.length - 1] == "\\") {
        res.statusCode = 404;
        res.setHeader("ContentType", "text/html");
        res.write("<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>");
    } else if(!existsSync(__dirname + pathName)) {
        res.statusCode = 404;
        res.setHeader("ContentType", "text/html");
        res.write("<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>");
    } else {
        res.statusCode = 200;
        res.setHeader("ContentType", "text/html");
        res.write("<html><head><title>Hello, world!</title></head><body><h1>Hello, world!</h1></body></html>");
    }
}

function methodHEAD(req: IncomingMessage, res: ServerResponse): void {
    //Ignore message body
    let pathName = getPathName(req);
    if(pathName[pathName.length - 1] === "/" || pathName[pathName.length - 1] == "\\") {
        res.statusCode = 404;
    } else if(!existsSync(__dirname + pathName)) {
        res.statusCode = 404;
    } else {
        res.statusCode = 204;
    }
}

function methodPOST(req: IncomingMessage, res: ServerResponse): void {
    // It is undecided as to whether this method will be implemented
    return;
}

function methodDELETE(req: IncomingMessage, res: ServerResponse): void {
    //Ignore message body
    let pathName = getPathName(req);
    if(pathName[pathName.length - 1] === "/" || pathName[pathName.length - 1] == "\\") {
        res.statusCode = 404;
    } else if(!existsSync(__dirname + pathName)) {
        res.statusCode = 404;
    } else {
        res.statusCode = 204;
    }
}

function methodPUT(reqBody: string, req: IncomingMessage, res: ServerResponse): void {
    let pathName = getPathName(req);
    if(pathName[pathName.length - 1] === "/" || pathName[pathName.length - 1] == "\\") {
        res.statusCode = 404;
    }  else {
        res.statusCode = 204;
    }
}

function methodOPTIONS(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function WebDAVRequestHandler(
    reqBody: string,
    req: IncomingMessage,
    res: ServerResponse
): void {
    switch(req.method!) {
        case "PROPFIND":
            methodPROPFIND(reqBody, req, res);
            break;
        case "GET":
            methodGET(req, res);
            break;
        case "HEAD":
            methodHEAD(req, res);
            break;
        case "DELETE":
            methodDELETE(req, res);
            break;
        case "PUT":
            methodPUT(reqBody, req, res);
            break;
        default:
            res.statusCode = 400;
            break;
    }
    res.end();
}

export {WebDAVRequestHandler};
export {methodPROPFIND, methodGET, methodHEAD, methodDELETE, methodPUT};