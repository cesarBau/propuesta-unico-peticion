import express from 'express'
import bodyParser from 'body-parser'
import os from 'os'
import router from './routes/routes'
import constans from './commons/constans'
import { createConnection } from './commons/conection'
import Errros from './errors/errorHandler'
import { createConnectionRedis } from './commons/conectionRedis'

const app = express()
const PORT = constans.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(`/${constans.CONTEXT_NAME}/${constans.VERSION}/`, router)
app.use(Errros.errorHandler)

createConnection().then(() => {
  createConnectionRedis().then(() => {
    app.listen(PORT, () => {
      console.log(
        `Example app listening at http:${os.hostname()}:${PORT}/${constans.CONTEXT_NAME}/${constans.VERSION}`
      )
    })
  })
  
})

module.exports = app