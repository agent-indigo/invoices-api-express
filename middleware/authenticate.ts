import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'
import jwt from 'jsonwebtoken'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
const authenticate: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const token: string = request.cookies.token ?? request.header('Authorization')?.substring(7)
  if (token) {
    const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!'
    ).id)
    if (user) {
      request.params.userId = user.get('id') as string
      next()
    } else {
      response.status(401)
      throw new Error('User not found.')
    }
  } else {
    response.status(401)
    throw new Error('Token not found.')
  }
})
export default authenticate