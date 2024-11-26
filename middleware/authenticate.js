import jwt from 'jsonwebtoken'
import catchRequestErrors from './catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
const authenticate = catchRequestErrors(async (
  request,
  response,
  next
) => {
  const token = request.cookies.token ?? request.header('Authorization')?.substring(7)
  if (token) {
    const user = await userSqlModel.findByPk(jwt.verify(
      token,
      process.env.JWT_SECRET
    ).id)
    if (user) {
      request.id = user.id
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