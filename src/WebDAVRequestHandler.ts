import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { xml2json } from "xml-js";

function methodPROPFIND(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPROPPATCH(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodGET(req: string, res: ServerResponse): void {
    res.write(xml2json(req));
    return;
}

function methodHEAD(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPOST(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodDELETE(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPUT(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodOPTIONS(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function WebDAVRequestHandler(
    reqBody: string,
    reqMethod: string,
    res: ServerResponse
): void {
    try {
        let reqBodyJson = xml2json(reqBody);
        res.statusCode = 200;
        switch(reqMethod) {
            case "GET": methodGET(reqBody, res);
                        break;
            default:
                        break;
        }
    } catch (error) {
        res.statusCode = 400;
        res.end("Improper XML was received.");
    }
    res.end();
}

export {WebDAVRequestHandler};
export {methodGET};