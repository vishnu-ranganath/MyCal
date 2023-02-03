import {expect, jest, test} from '@jest/globals';
import { methodPUT } from "../src/WebDAVRequestHandler";
import { IncomingMessage, ServerResponse } from "http";
import { mockConstructor, mockSetHeader, mockWrite } from "../__mocks__/http";
const fs = require("fs");

let reqBody: string;
let req: jest.Mocked<IncomingMessage>;
let res: jest.Mocked<ServerResponse>;

beforeEach(() => {
    reqBody = "";
    res = mockConstructor();
    req = mockConstructor();
    mockSetHeader.mockClear();
    mockWrite.mockClear();
});

test("test PUT with path '/directory/'", () => {
    reqBody = "lorem ipsum";
    req.url = "/directory/";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;

    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
});

test("test PUT with path '/nonexistentfile'", () => {
    reqBody = "lorem ipsum";
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;

    jest.spyOn(fs, "existsSync").mockReturnValueOnce(false);

    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});

test("test PUT with path '/existentfile'", () => {
    reqBody = "lorem ipsum";
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;

    jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);

    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});