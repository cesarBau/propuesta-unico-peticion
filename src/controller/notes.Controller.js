import { noteService } from '../service/notes.Services'
import { validateRequets, validateUpdateRequets, validateUpdaPartialteRequets } from '../validators/note.Validator'
import { badRequestError } from '../errors/managerErrors'
import { Utils } from '../commons/utils'
import logger from '../logger/logger'
import { notesRedis } from '../dao/notes.Redis'
import httpStatusCodes from '../errors/httpStatusCodes'

const getNotes = async (req, res) => {
    logger.info('method getNotes Controller started')
    const { query } = req
    const result = await noteService.getNotes(query)
    logger.info(`result => ${JSON.stringify(result)}`)
    logger.info('method getNotes Controller ending')
    res.json(result)
}

const saveNotes = async (req, res) => {
    logger.info('method saveNotes Controller started')
    const { body, headers } = req
    const uniqueRequest = body.relatedParty[0].id + body.productOrderItem[0].productOffering[0].id + body.characteristic[1].value + body.productOrderItem[0].action
    const process = { headers, body }
    if (body) {
        throw new badRequestError('peticion incorrecta', uniqueRequest)
    }
    /*
    const validRequest = validateRequets(body)
    if (validRequest) {
        throw new badRequestError(Utils.createErrorResponse(validRequest))
    }
    */
    logger.info(`body => ${JSON.stringify(body)}`)
    const result = await noteService.saveCrud(process)
    logger.info(`result => ${JSON.stringify(result)}`)
    await notesRedis.saveRedis(uniqueRequest, result, httpStatusCodes.CREAT)
    res.status(httpStatusCodes.CREAT).json(result)
}

export const notesController = {
    getNotes,
    saveNotes
}

export default null