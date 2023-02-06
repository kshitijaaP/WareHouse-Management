'use strict'

const router = require('express').Router()
const cors = require("cors");
router.use(cors())

const {
    postSections,
    getSections,
    getSection,
    putSection,
    deleteSection
} = require('../controllers/section_controller')

router.route('/sections')
.get(getSections)
.post(postSections)

router.route('/section/:id')
 //.get(getSection)
  
  .put(putSection)
  .delete(deleteSection)

  router.route('/warehouse/:id/sections')  
  .get(getSection)


module.exports = router
 