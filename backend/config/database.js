'use strict'

const env = process.env.NODE_ENV || 'development'
// const knexfile = require('../knexfile')
//  const knex = require('knex')

 const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root1234',
      database: 'warehousemanagement'
    }
  })
  knex.raw('SELECT VERSION()').then(()=>{
    console.log("Connected")
  })
module.exports = knex
