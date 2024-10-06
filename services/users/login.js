import bcrypt from 'bcryptjs'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import createToken from '../../utilities/createToken.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    login
 * @desc    Log in a user
 * @route   POST /api/users/login
 * @access  public
 */
const login = catchRequestErrors(async (
  request,
  response
) => {
  const {
    name,
    password
  } = request.body
  const user = await UserModel.findOne({
    where: {
      name
    }
  })
  if (!name || !password) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else if (!user) {
    response.status(404)
    throw new Error('User not found.')
  } else {
    if (!await bcrypt.compare(
      password,
      user.shadow
    )) {
      response.status(401)
      throw new Error('Incorrect password.')
    } else {
      response.status(202).json({
        name: user.name,
        role: user.role,
        token: createToken(
          response,
          user.uuid
        )
      })
    }
  }
})
export default login