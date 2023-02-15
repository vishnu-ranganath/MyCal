import {expect, jest, test} from '@jest/globals';
import { methodPROPFIND } from "../src/WebDAVRequestHandler";
import { IncomingMessage, ServerResponse } from "http";
import { mockConstructor, mockSetHeader, mockWrite } from "../__mocks__/http";
import { LocalFileAccess } from '../src/LocalFileAccess';

let reqBody: string;
let req: jest.Mocked<IncomingMessage>;
let res: jest.Mocked<ServerResponse>;
let fa: LocalFileAccess;

beforeEach(() => {
    reqBody = "";
    res = mockConstructor();
    req = mockConstructor();
    fa = new LocalFileAccess("");
    mockSetHeader.mockClear();
    mockWrite.mockClear();
});

test("test PROPFIND with path '/nonexistentfile'", () => {
    reqBody = "lorem ipsum";
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(false);

    methodPROPFIND(reqBody, req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
});

test("test PROPFIND with path '/existentfile' and non-XML message body", () => {
    reqBody = "lorem ipsum";
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(true);
    jest.spyOn(fa, "isDirectory").mockReturnValueOnce(true);

    methodPROPFIND(reqBody, req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
});

test("test PROPFIND with path '/existentfile' and XML message body", () => {
    reqBody = "<hello/>";
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(true);
    jest.spyOn(fa, "isDirectory").mockReturnValueOnce(true);

    methodPROPFIND(reqBody, req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
});

test("test PROPFIND with path '/existentfile' and legal propfind request", () => {
    reqBody = "<?xml version='1.0' encoding='utf-8' ?>"
        + "<D:propfind xmlns:D='DAV:'>"
            + "<D:prop xmlns:R='http://ns.example.com/boxschema/'>"
                + "<R:Random/>"
            + "</D:prop>"
        + "</D:propfind>";
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(true);
    jest.spyOn(fa, "isDirectory").mockReturnValueOnce(true);

    methodPROPFIND(reqBody, req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});