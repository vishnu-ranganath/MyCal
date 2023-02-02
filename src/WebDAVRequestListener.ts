import { IncomingMessage, ServerResponse, RequestListener } from "http";

function methodPROPFIND(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodPROPPATCH(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodMKCOL(req: IncomingMessage, res: ServerResponse): void {
    return;
}

function methodGET(req: IncomingMessage, res: ServerResponse): void {
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
    res.end('Hello, world!\n');
});

export {WebDAVRequestListener};