import {
  Request,
  Response,
  NextFunction
} from 'express'
const catchRequestErrors: Function = (fn: Function): any => (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => Promise.resolve(fn(
  request,
  response,
  next
)).catch(next)
export default catchRequestErrors