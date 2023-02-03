import {expect, jest, test} from '@jest/globals';
import { methodGET } from "../src/WebDAVRequestHandler";
import { IncomingMessage, ServerResponse } from "http";
import { mockConstructor, mockSetHeader, mockWrite } from "../__mocks__/http";
jest.mock("https", () => {
    return mockConstructor
});

let req: jest.Mocked<IncomingMessage>;
let res: jest.Mocked<ServerResponse>;

beforeEach(() => {
    res = mockConstructor();
    req = mockConstructor();
    mockSetHeader.mockClear();
    mockWrite.mockClear();
});

test("test GET with path '/'", () => {
    req.url = "/";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodGET(req, res);
    expect(mockWrite).toBeCalledTimes(1);
    expect(mockSetHeader).toBeCalledTimes(1);
    expect(res.statusCode).toBe(404);
});

test("test GET with path '/directory/'", () => {
    req.url = "/directory/";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodGET(req, res);
    expect(mockWrite).toBeCalledTimes(1);
    expect(mockSetHeader).toBeCalledTimes(1);
    expect(res.statusCode).toBe(404);
});

test("test GET with path '/nonexistentfile'", () => {
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodGET(req, res);
    expect(mockWrite).toBeCalledTimes(1);
    expect(mockSetHeader).toBeCalledTimes(1);
    expect(res.statusCode).toBe(404);
});

/**
 * TODO: Add another test with a path that does exist, and show that it returns
 * correct output
 *
test("test GET with path '/nonexistentfile'", () => {
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };

    res.statusCode = 0;
    methodGET(req, res);
    expect(mockWrite).toBeCalledTimes(1);
    expect(mockSetHeader).toBeCalledTimes(1);
    expect(res.statusCode).toBe(404);
});
*/