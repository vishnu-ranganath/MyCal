import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { AbstractFileAccess } from "./src/AbstractFileAccess";
import { LocalFileAccess } from "./src/LocalFileAccess";
import { WebDAVRequestHandler } from "./src/WebDAVRequestHandler";
import { homeDir } from "./serverConfig";

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
        let fileAccess: AbstractFileAccess = new LocalFileAccess(homeDir);
        console.log(req.method! + " request for '" + req.url! + "' with headers '" + JSON.stringify(req.headers) + "' and body '" + reqBody + "'");
        WebDAVRequestHandler(
            reqBody,
            req,
            res,
            fileAccess
        );
    });
});

const options = {
    hostname: '127.0.0.1',
    port: '3000'
}

http.createServer(options, WebDAVRequestListener).listen(3000);