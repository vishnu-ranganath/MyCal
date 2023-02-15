import {expect, jest, test} from '@jest/globals';
import { methodHEAD } from "../src/WebDAVRequestHandler";
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

test("test HEAD with path '/nonexistentfile'", () => {
    req.url = "/nonexistentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(false);

    methodHEAD(req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(404);
});

test("test HEAD with path '/existentfile'", () => {
    req.url = "/existentfile";
    req.headers = {
        "host": "localhost:3000"
    };
    res.statusCode = 0;
    jest.spyOn(fa, "isFile").mockReturnValueOnce(true);

    methodHEAD(req, res, fa);
    expect(mockWrite).toBeCalledTimes(0);
    expect(mockSetHeader).toBeCalledTimes(0);
    expect(res.statusCode).toBe(204);
});