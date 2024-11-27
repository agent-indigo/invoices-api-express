import bcrypt from 'bcryptjs'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import userSqlModel from '../../models/userSqlModel.js'
/**
 * @name    createRoot
 * @desc    Create the root user
 * @route   POST /api/setup/root
 * @access  public
 */
const createRoot = catchRequestErrors(async (
  request,
  response
) => {
  const {
    password,
    confirmPassword
  } = request.body
  if (password !== confirmPassword) {
    response.status(403)
    throw new Error('Passwords do not match.')
  } else if (!password || !confirmPassword) {
    response.status(403)
    throw new Error('At least one field is empty.')
  } else {
    await userSqlModel.create({
      name: 'root',
      shadow: await bcrypt.hash(
        password,
        10
      ),
      role: 'root'
    })
    response.status(201).json({
      message: 'User "root" created.'
    })
  }
})
export default createRoot