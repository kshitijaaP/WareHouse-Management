'use strict'

const { Section } = require('../models')
const knex = require('knex')
const db = require('../../config/database');
const postSections = (req, res, next) => {
  const props = req.body
  
    props.forEach(element => {   
     
      Section.saveFromArray({...element}).then(section=>{
       
      })
        // if (element.id!==undefined)    
        // {
            
        // } 
        // else{
        //     db.insert(element).into('sections').then(function(data) {
        //         // res.send(data);
        //     })
        // }
        
 });
 }

const getSections = (req, res, next) => {
 

  Section.findAll()
    .then(sections => res.json({
      ok: true,
      message: 'section found',
      sections,
     
    }))
    .catch(next)
}

const getSection = (req, res, next) => {
  const wareHouseId = req.params.id


  Section.findByWhere({'warehouse_id': wareHouseId})
  .then(section=>{
    res.send(section)
   // console.log(section)
  })

  // Section.find(wareHouseId).where({warehouse_id: wareHouseId})
  //   .then(section => res.json({
  //     ok: true,
  //     message: 'Section found',
  //     section
  //   }))
  //   .catch(next)
}

const putSection = (req, res, next) => {
//   const projectId = req.params.id
  const props = req.body
//   console.log(props)

  Section.update(projectId, props)
    .then(project => res.json({
      ok: true,
      message: 'Section updated',
      project
    }))
    .catch(next)
}

const deleteSection = (req, res, next) => {
  const projectId = req.params.id

  Section.destroy(projectId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Section deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postSections,
  getSections,
  getSection,
  putSection,
  deleteSection
}
