import {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
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
    const decoded: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'd3v3l0pm3nt53cr3tk3yn0t53cur3@t@11n3v3ru53!npr0duct!0n3v3r!!!'
    )
    if (typeof decoded !== 'string') {
      const {
        iss,
        aud,
        sub,
        nbf,
        exp
      }: JwtPayload = decoded
      if (iss !== 'invoices.api') {
        response.status(401)
        throw new Error('Invalid token issuer.')
      } else if (aud !== 'invoices.client') {
        response.status(401)
        throw new Error('Invalid token audience.')
      } else if (typeof nbf !== 'number' || typeof exp !== 'number') {
        response.status(401)
        throw new Error('Token unreadable.')
      } else if (nbf > Math.floor(Date.now() / 1000)) {
        response.status(401)
        throw new Error('Token not yet valid.')
      } else if (exp < Math.floor(Date.now() / 1000)) {
        response.status(401)
        throw new Error('Token expired.')
      } else {
        const user: Model<UserSqlRecord> | null = await userSqlModel.findByPk(sub)
        if (user) {
          request.params.userId = user.getDataValue('id') ?? ''
          next()
        } else {
          response.status(401)
          throw new Error('User not found.')
        }
      }
    } else {
      response.status(401)
      throw new Error('Token unreadable.')
    }
  } else {
    response.status(401)
    throw new Error('Token not found.')
  }
})
export default authenticate