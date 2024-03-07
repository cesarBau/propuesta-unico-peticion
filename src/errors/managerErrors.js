import httpStatusCodes from './httpStatusCodes'
import AppError from './baseError'


class badRequestError extends AppError {
    constructor(message, uniqueRequest, statusCode = httpStatusCodes.BAD_REQUEST) {
        super()
        this.message = message
        this.uniqueRequest = uniqueRequest
        this.statusCode = statusCode
      }
}

class InternalServerError extends AppError {
    constructor(message, statusCode = httpStatusCodes.INTERNAL_SERVER) {
        super()
        this.message = message
        this.statusCode = statusCode
      }
}

module.exports = {
    badRequestError,
    InternalServerError
}