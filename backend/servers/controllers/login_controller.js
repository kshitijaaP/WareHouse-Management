'use strict'

const { Admin } = require('../models')
const knex = require('knex')
const db = require('../../config/database');



const postLogin = (req, res, next) => {
  // const username = String(req.body.email)
  // const password = String(req.body.password)
const props=req.body
console.log(props)
  // if (!username || !password) next(createError({
  //   status: BAD_REQUEST,
  //   message: '`username` + `password` are required fields'
  // }))
// console.log(username, password)
  Admin.find(props).then(user=>{
    console.log(user)
    if (user!==null)
    {
      console.log("Inside User")
      res.send(user)
    }
    else{
      console.log("Invalid")
      res.json({
        ok: false,
        message: 'Invalid Email Id Or Password',
        
      })
    }
  })
}
const getLogin=(req,res)=>{
  
}

module.exports = {
  postLogin,
  getLogin
}
