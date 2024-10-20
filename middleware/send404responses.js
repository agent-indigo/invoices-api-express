const send404responses = (
  request,
  response,
  next
) => {
  response.status(404)
  next(new Error(`${request.originalUrl} not found.`))
}
export default send404responses