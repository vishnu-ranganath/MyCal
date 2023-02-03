import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { xml2json } from "xml-js";
import {existsSync} from "fs";
import Os from "os";

function methodPROPFIND(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPROPPATCH(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodGET(req: IncomingMessage, res: ServerResponse): void {
    //Ignore message body
    let requestedURL = new URL(req.url!, `http://${req.headers.host}`);
    let pathName = requestedURL.pathname;
    let path = pathName.split("/");
    let slash = Os.platform() === "win32" ? "\\" : "/";
    if(path[path.length - 1] === "") {
        res.statusCode = 404;
        res.setHeader("ContentType", "text/html");
        res.write("<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>");
    } else if(!existsSync(__dirname + pathName.replace(/\//g, slash))) {
        console.log(__dirname + pathName.replace(/\//g, slash));
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
    let requestedURL = new URL(req.url!, `http://${req.headers.host}`);
    let pathName = requestedURL.pathname;
    let path = pathName.split("/");
    let slash = Os.platform() === "win32" ? "\\" : "/";
    if(path[path.length - 1] === "") {
        res.statusCode = 404;
    } else if(!existsSync(__dirname + pathName.replace(/\//g, slash))) {
        console.log(__dirname + pathName.replace(/\//g, slash));
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
    let requestedURL = new URL(req.url!, `http://${req.headers.host}`);
    let pathName = requestedURL.pathname;
    let path = pathName.split("/");
    let slash = Os.platform() === "win32" ? "\\" : "/";
    if(path[path.length - 1] === "") {
        res.statusCode = 404;
    } else if(!existsSync(__dirname + pathName.replace(/\//g, slash))) {
        console.log(__dirname + pathName.replace(/\//g, slash));
        res.statusCode = 404;
    } else {
        res.statusCode = 204;
    }
}

function methodPUT(reqBody: string, req: IncomingMessage, res: ServerResponse): void {
    let requestedURL = new URL(req.url!, `http://${req.headers.host}`);
    let pathName = requestedURL.pathname;
    let path = pathName.split("/");
    if(path[path.length - 1] === "") {
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
        case "GET":     methodGET(req, res);
                        break;
        case "HEAD":    methodHEAD(req, res);
                        break;
        case "DELETE":  methodDELETE(req, res);
                        break;
        case "PUT":     methodPUT(reqBody, req, res);
                        break;
        default:
                        res.statusCode = 400;
                        break;
    }
    res.end();
}

export {WebDAVRequestHandler};
export {methodGET, methodHEAD, methodDELETE, methodPUT};