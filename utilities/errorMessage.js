class httpError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
const errorMessage = (message, statusCode) => new httpError(message, statusCode)
export default errorMessage