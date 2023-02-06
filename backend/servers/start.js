#!/usr/bin/env node

'use strict'

console.log("kshitija")
const PORT = process.env.PORT || 8080

const app = require('../servers')

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`)
}).on('error', err => {
  console.log('ERROR: ', err)
})

  