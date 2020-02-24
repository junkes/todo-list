const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const redis = require('redis')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const DB = new (require('./modules/Db'))({mysql})
const routes = new (require('./modules/Routes'))()

routes.init(app, DB, redis)

app.listen(3000, '0.0.0.0', () => {
  console.log('API rodando na porta 3000!')
})