import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'
const catchRequestErrors: Function = (fn: RequestHandler): any => (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => Promise.resolve(fn(
  request,
  response,
  next
)).catch(next)
export default catchRequestErrors