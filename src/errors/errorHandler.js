import logger from '../logger/logger'

  const errorHandler = async(error, _req, res, _next) => {
    logger.error(error.message)
    const statusCode = error.statusCode || 500
    const details = error.message || 'Algo salio mal...'
    res.status(statusCode).json({code: statusCode, details})
  }

  module.exports = {
    errorHandler
  }