import mongoose from 'mongoose'
import constans from './constans'
import logger from '../logger/logger'

export const createConnection = async () => {
  mongoose.set('strictQuery', false)
  const instance = mongoose.connect(constans.URI)
  const db = (await instance).connection
  db.on('error', console.error.bind(console, 'connection error: '))
  logger.info(`Connection to DB successful`)
  return instance
}

export default null