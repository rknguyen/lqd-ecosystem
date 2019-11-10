"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RKError {
    constructor(message, debug = {}) {
        this.message = message;
        this.debug = debug;
    }
    toJSON() {
        return {
            error: true,
            message: this.message,
            debug: this.debug
        };
    }
}
exports.RKError = RKError;
class RKSuccess {
    constructor(message, data = {}) {
        this.message = message;
        this.data = data;
    }
    toJSON() {
        return {
            success: true,
            message: this.message,
            data: this.data
        };
    }
}
exports.RKSuccess = RKSuccess;
