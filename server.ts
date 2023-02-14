import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { WebDAVRequestHandler } from "./src/WebDAVRequestHandler";

const http = require('http');
const fs = require('fs');

const WebDAVRequestListener: RequestListener = ((req: IncomingMessage, res: ServerResponse) => {
    let reqBody = "";
    req.on("data", (chunk) => {
        reqBody += chunk.toString();
    });
    req.on("end", () => {
        if(req.method === undefined) {
            res.statusCode = 400;
            res.end("No Method found\n");
            return;
        }
        WebDAVRequestHandler(
            reqBody,
            req,
            res
        );
    });
});

const options = {
    hostname: '127.0.0.1',
    port: '3000'
}

http.createServer(options, WebDAVRequestListener).listen(3000);