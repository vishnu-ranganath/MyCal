import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { xml2json } from "xml-js";

function methodPROPFIND(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPROPPATCH(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodMKCOL(req: IncomingMessage, res: ServerResponse): void {
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

function methodCOPY(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodMOVE(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodLOCK(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodUNLOCK(req: IncomingMessage, res: ServerResponse): void {
    return;
}

let WebDAVRequestListener: RequestListener = ((req: IncomingMessage, res: ServerResponse) => {
    let reqBody = "";
    req.on("data", (chunk) => {
        reqBody += chunk.toString();
    });
    req.on("end", () => {
        try {
            let reqBodyJson = xml2json(reqBody);
            res.statusCode = 200;
            switch(req.method) {
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
    });
});

export {WebDAVRequestListener};