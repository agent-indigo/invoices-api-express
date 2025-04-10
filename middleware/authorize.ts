import {
  Request,
  Response,
  NextFunction
} from 'express'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
const authorize: Function = (...roles: string[]): void => catchRequestErrors(async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  if (roles.includes((await userSqlModel.findByPk(request.params.userId))?.get('role') as string)) {
    next()
  } else {
    response.status(401)
    throw new Error('Permission denied.')
  }
})
export default authorize