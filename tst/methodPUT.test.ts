import {expect, jest, test} from '@jest/globals';
import { methodPUT } from "../src/WebDAVRequestHandler";
import { IncomingMessage, ServerResponse } from "http";
import { mockConstructor, mockSetHeader, mockWrite } from "../__mocks__/http";
jest.mock("https", () => {
    return mockConstructor
});

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

test("test PUT with path '/'", () => {
    reqBody = "lorem ipsum";
    req.url = "/";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
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
    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});

/**
 * TODO: Add another test with a path that does exist, and show that it returns
 * correct output
 *
test("test PUT with path '/nonexistentfile'", () => {
    reqBody = "lorem ipsum";
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodPUT(reqBody, req, res);
    expect(mockWrite).toBeCalledTimes(1);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
});
*/