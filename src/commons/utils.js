const createErrorResponse = (error) => {
    const errorMessage = []
    error.details.forEach((infoData) => {
        errorMessage.push({
            message: infoData.message,
            context: infoData.context.value
        })
    })
    return errorMessage
}

const createSelect = query => {
    const process = query.split(',')
    let result = '-_id '
    process.forEach( key => {
        result += `${key} `
    })
    return result
}

export const Utils = {
    createErrorResponse,
    createSelect
}