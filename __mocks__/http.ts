const mockWrite = jest.fn();
const mockSetHeader = jest.fn();

const mockConstructor = jest.fn().mockImplementation(() => {
    return {
        setHeader: mockSetHeader,
        write: mockWrite
    };
});

export {mockConstructor, mockSetHeader, mockWrite};