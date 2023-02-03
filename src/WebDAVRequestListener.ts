import { IncomingMessage, ServerResponse, RequestListener } from "http";
import { WebDAVRequestHandler } from "./WebDAVRequestHandler";

let WebDAVRequestListener: RequestListener = ((req: IncomingMessage, res: ServerResponse) => {
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

export {WebDAVRequestListener};