import {
  Request,
  Response,
  NextFunction
} from 'express'
const sendErrorResponses: Function = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => response
.status(response.statusCode === 200 ? 500 : response.statusCode)
.json({
  message: error.message,
  stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
})
export default sendErrorResponses