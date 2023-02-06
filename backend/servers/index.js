'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use('/', [
  // require('./routes/auth_routes'),
  // require('./routes/user_routes'),
  require('./routes/warehouse_routes'),
  require('./routes/section_routes'),
  require('./routes/product_routes'),
  require('./routes/login_routes')
])

// app.use(require('./middleware/error_middleware').all)

module.exports = app
