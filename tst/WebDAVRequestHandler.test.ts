import {expect, jest, test} from '@jest/globals';
import { methodGET } from "../src/WebDAVRequestHandler";
import { ServerResponse } from "http";
import { mockConstructor, mockWrite } from "../__mocks__/http";
jest.mock("https", () => {
    return mockConstructor
});

let res: jest.Mocked<ServerResponse>;

beforeEach(() => {
    res = mockConstructor();
    mockWrite.mockClear();
});

test('testGET', () => {
    methodGET("<a/>", res);
    expect(mockWrite).toBeCalledTimes(1);
});