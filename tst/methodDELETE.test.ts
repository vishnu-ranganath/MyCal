import {expect, jest, test} from '@jest/globals';
import { methodDELETE } from "../src/WebDAVRequestHandler";
import { IncomingMessage, ServerResponse } from "http";
import { mockConstructor, mockSetHeader, mockWrite } from "../__mocks__/http";
import { LocalFileAccess } from '../src/LocalFileAccess';

let req: jest.Mocked<IncomingMessage>;
let res: jest.Mocked<ServerResponse>;
let fa: LocalFileAccess;

beforeEach(() => {
    res = mockConstructor();
    req = mockConstructor();
    fa = new LocalFileAccess("");
    mockSetHeader.mockClear();
    mockWrite.mockClear();
});

test("test DELETE with path '/nonexistentfile'", () => {
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(false);

    methodDELETE(req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
});

test("test DELETE with path '/existentfile'", () => {
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(true);
    jest.spyOn(fa, "deleteFile").mockImplementationOnce((path: string) => {
        return;
    })

    methodDELETE(req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});