import Joi from 'joi'

const notesSchema = Joi.object({
    category: Joi.string()
})

export const validateRequets = (body) => {
    const { error } = notesSchema.validate(body, { abortEarly: false })
    return error
}

export default null