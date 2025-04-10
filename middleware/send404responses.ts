import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'
const send404responses: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  response.status(404)
  next(new Error(`${request.originalUrl} not found.`))
}
export default send404responses