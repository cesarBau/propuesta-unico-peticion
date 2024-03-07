import { redisInstance } from '../commons/conectionRedis'
import constans from '../commons/constans'

const deleteRedis = constans.REDIS_TIME_EXPIRED

const saveRedis = async (idempotentia, result, statsCode) => {
    const saveRedis = { result, statsCode }
    await redisInstance.set(idempotentia, JSON.stringify(saveRedis), {EX: deleteRedis})
}

const getRedis = async key => {
    const value = await redisInstance.get(key)
    return value
}

export const notesRedis = {
    saveRedis,
    getRedis
}