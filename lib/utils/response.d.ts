declare class RKError {
    message: string;
    debug: object;
    constructor(message: string, debug?: {});
    toJSON(): {
        error: boolean;
        message: string;
        debug: object;
    };
}
declare class RKSuccess {
    message: string;
    data: object;
    constructor(message: string, data?: object);
    toJSON(): {
        success: boolean;
        message: string;
        data: object;
    };
}
export { RKError, RKSuccess };
