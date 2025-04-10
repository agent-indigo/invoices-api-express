import bcrypt from 'bcryptjs'
import {
  Request,
  RequestHandler,
  Response
} from 'express'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import createToken from '@/utilities/createToken'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
/**
 * @name    login
 * @desc    Log in a user
 * @route   POST /users/login
 * @access  public
 */
const login: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const {
    username,
    password
  } = await request.json()
  const user: Model<UserSqlRecord> | null = await userSqlModel.findOne({
    where: {
      username
    }
  })
  if (!username || !password) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    if (!bcrypt.compare(
      password,
      user.get('password')
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
    } else {
      response.status(200).json({
        id: user.get('id'),
        username: user.get('username'),
        role: user.get('role'),
        token: createToken(
          response,
          user.get('id')
        ),
        createdAt: user.get('createdAt'),
        updatedAt: user.get('updatedAt')
      })
    }
  }
})
export default login