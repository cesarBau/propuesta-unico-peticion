import os from 'os'
import logger from '../logger/logger'

const healthCheck = async (req, res) => {
  logger.info('method healthCheck Controller started')
  const result = { message: "is Alived", host: os.hostname()}
  logger.info(result)
  logger.info('method healthCheck Controller ending')
  res.json(result)
}
export const healthController = {
  healthCheck
}

export default null