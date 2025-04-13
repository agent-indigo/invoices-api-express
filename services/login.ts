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
import Credentials from '@/types/Credentials'
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
  }: Credentials = JSON.parse(request.body)
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
    if (!bcrypt.compareSync(
      password,
      user.getDataValue('password')
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
    } else {
      response.status(200).json({
        id: user.getDataValue('id'),
        username: user.getDataValue('username'),
        role: user.getDataValue('role'),
        createdAt: user.getDataValue('createdAt'),
        updatedAt: user.getDataValue('updatedAt'),
        token: createToken(
          response,
          user.getDataValue('id')
        )
      })
    }
  }
})
export default login