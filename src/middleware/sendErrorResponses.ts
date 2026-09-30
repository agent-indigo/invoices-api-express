import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from 'express'
const sendErrorResponses: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  response.status(response.statusCode === 200 ? 500 : response.statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  })
}
export default sendErrorResponses