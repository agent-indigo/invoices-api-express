import HttpError from '../utilities/HttpError.js'
const send404responses = (
  request,
  response,
  next
) => {
  response.status(404)
  next(new HttpError(
    `${request.originalUrl} not found.`,
    404
  ))
}
export default send404responses