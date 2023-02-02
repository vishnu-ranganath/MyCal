const mockWrite = jest.fn();

const mockConstructor = jest.fn().mockImplementation(() => {
    return {
        write: mockWrite
    };
});

export {mockConstructor, mockWrite};