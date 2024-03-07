import { notesRedis } from '../dao/notes.Redis'
import logger from '../logger/logger'

exports.tryCatch = (controller) => async (req, res, next) => {
    try {
        const { body } = req
        //Para productOrder podria ser una combinacion de MSISDN + Producto + Operador + Accion a realizar
        const uniqueRequest = body.relatedParty[0].id + body.productOrderItem[0].productOffering[0].id + body.characteristic[1].value + body.productOrderItem[0].action
        const valueUniqueRequest = await notesRedis.getRedis(uniqueRequest)
        if (valueUniqueRequest) {
            logger.info(`Exist ${uniqueRequest} in redis: ${valueUniqueRequest}`)
            const response = JSON.parse(valueUniqueRequest)
            const { result, statsCode } = response
            res.status(statsCode).json(result)
        }
        else {
        await notesRedis.saveRedis(uniqueRequest, { code: 200, details: 'there is a petition in process' }, 200)
        await controller(req, res)
    }
    } catch (error) {
        logger.info(`Eaaaaaaa ${JSON.stringify(error)}`)
        if(error.statusCode != 500)    await notesRedis.saveRedis(error.uniqueRequest, { code: error.statusCode, details: error.message }, error.statusCode)
        return next(error)
    }
}

export default null