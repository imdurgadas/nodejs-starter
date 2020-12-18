class ErrorResponse extends Error {
    constructor(message, statusCode, stack) {
        super(message);
        this.statusCode = statusCode;
        this.stack = stack;
    }
}

module.exports = ErrorResponse;