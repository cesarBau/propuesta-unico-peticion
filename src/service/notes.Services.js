import _ from 'lodash'
import logger from '../logger/logger'
import { notesDAO } from '../dao/notes.Dao'
import { Utils } from '../commons/utils'

const saveCrud = async (document) => {
  logger.info('method saveCrud Service started')
  const result = await notesDAO.saveNote(document)
  logger.info(`result => ${JSON.stringify(result)}`)
  logger.info('method saveCrud Service ending')
  return result
}

const getNotes = async (query) => {
  logger.info('method getNotes Service started')
  let response = []
  let selectField = {}
  if (_.isEmpty(query)) {
    response = await notesDAO.getNote()
  } else {
    if (query.field) {
      selectField = Utils.createSelect(query.field)
      delete query.field
    }
    response = await notesDAO.getQueryNote(query, selectField)
  }
  logger.info('method getNotes Service ending')
  return response
}

export const noteService = {
  saveCrud,
  getNotes
}

export default null