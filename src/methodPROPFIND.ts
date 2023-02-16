import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";
import { Element, ElementCompact, xml2js, js2xml } from "xml-js";
import { AbstractFileAccess } from "./AbstractFileAccess";

const protectedDefaultProperties = [
    "creationdate",
    "getcontenttype",
    "getetag",
    "getlastmodified",
    "getresourcetype"
];

const unprotectedProperties = [
    "displayname",
    "getcontentlanguage"
];

export function methodPROPFIND(
    reqBody:string,
    req: IncomingMessage,
    res: ServerResponse,
    fa: AbstractFileAccess
): void {
    let pathName = fa.getFullPath(req.url!, `https://${req.headers.host}`);
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
        res.statusCode = 207;

        res.setHeader("Content-Type", "application/xml");
        let resRoot: Element = {
            "type": "element",
            "name": davNamespace + ":multistatus",
            "attributes": {
            },
            "elements": []
        };
        resRoot.attributes!["xmlns:" + davNamespace] = "DAV:";
        let resXML: Element = {
            "declaration":  {
                "attributes": {
                    "version": "1.0",
                    "encoding": "utf-8"
                }
            },
            "elements": [resRoot]
        };

        if(fa.isFile(pathName) && queryTypeElement.elements !== undefined) {
            let currResponse: Element = {
                "type": "element",
                "name": davNamespace + ":response",
                "elements": [
                    {
                        "type": "element",
                        "name": davNamespace + ":href",
                        "elements": [
                            {
                                "type": "text",
                                "text": "https://" + req.headers.host + req.url
                            }
                        ]
                    }
                ]
            }
            for(let i = 0; i < queryTypeElement.elements!.length; i++) {
                let p: Element = {
                    "type": "element",
                    "name": davNamespace + ":propstat",
                    elements: [
                        {
                            "type": "element",
                            "name": davNamespace + ":prop",
                            "elements": [
                                {
                                    "type": "element",
                                    "name": queryTypeElement.elements![i].name!
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "name": davNamespace + ":status",
                            "elements": [
                                {
                                    "type": "text",
                                    "text": "HTTP/1.1 404 Not Found"
                                }
                            ]
                        }
                    ]
                };
                currResponse.elements!.push(p);
            }
            resRoot.elements!.push(currResponse);
        }

        let resXMLString = js2xml(resXML);
        console.log("\nWrote response:\n" + resXMLString + "\n");
        res.write(resXMLString);
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