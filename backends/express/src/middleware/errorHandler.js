export function errorHandler(error, _request, response, _next) {
  const status = error.status ?? 500

  response.status(status).json({
    message: error.message ?? 'Internal server error',
    details: error.details ?? [],
  })
}
