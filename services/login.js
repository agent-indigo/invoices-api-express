import bcrypt from 'bcryptjs'
import catchRequestErrors from '../middleware/catchRequestErrors.js'
import createToken from '../utilities/createToken.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    login
 * @desc    Log in a user
 * @route   POST /users/login
 * @access  public
 */
const login = catchRequestErrors(async (
  request,
  response
) => {
  const {
    username,
    password
  } = await request.json()
  const user = await userSqlModel.findOne({
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
        )
      })
    }
  }
})
export default login