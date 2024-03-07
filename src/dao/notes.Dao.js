import Mongoose from 'mongoose'
import { noteSchema } from '../models/note.Model'
import logger from '../logger/logger'
import { InternalServerError } from '../errors/managerErrors'


const Note = Mongoose.model('note', noteSchema)

const saveNote = async (body) => {
  logger.info('method saveNote DAO started')
  const note = new Note(body)
  const validation = note.validateSync()
  if (validation) throw new InternalServerError(validation)
  const result = await Note.create(body)
  logger.info('method saveNote DAO ending')
  return { data: result }
}

const getNote = async () => {
    logger.info('method getNote DAO started')
    const count = await Note.countDocuments()
    logger.info(`registries: ${count}`)
    const result = await Note.find({})
    logger.info('method getNote DAO ending')
    return { count, data: result }
}

const getQueryNote = async (query, fields) => {
    logger.info('method getQueryNote DAO started')
    const count = await Note.countDocuments()
    const result = await Note.find(query).select(fields)
    logger.info(`registries: ${count}`)
    logger.info('method getQueryNote DAO ending')
    return { count, data: result }
}

export const notesDAO = {
    saveNote,
    getNote,
    getQueryNote
}

export default null