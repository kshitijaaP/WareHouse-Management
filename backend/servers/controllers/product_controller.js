'use strict'

const { Product, Section } = require('../models')
const knex = require('knex')
const db = require('../../config/database');
const { get } = require('..');
const product = require('../models/product');

const saveProductAsWholeSection = async (req, res, next) => {
  //GET SECTIONS OF WAREHOUSE

  let sectionCapacity = 0
  const { name, warehouse, section, quantity,warehouse_name } = req.body
  const props = req.body
  // console.log(props)

  let sectionData = await getSectionCapacity(warehouse)
  sectionData.forEach((section) => {
   
    sectionCapacity = sectionCapacity + section.section_capacity
  })

  console.log(sectionCapacity)
  //to delete previous section for creating single section
  // let delSectionData = await deleteSectionData(sectionData)

  // if (delSectionData === true) {
  //   //insert one single section
  
  //   const props = req.body
   
  //   let sectionprops={warehouse_id:warehouse,section_name:props.name,section_capacity:sectionCapacity}
  //   let newSectionId=0
  //   let latestSectionData
  //  await Section.create({ ...sectionprops })
  //     .then(async section => {
  //       let sectionData =await getSectionCapacity(warehouse)
  //       latestSectionData=sectionData
      
  //     })
  //     console.log(latestSectionData)
  //     let productProps
  //     latestSectionData.forEach((sectionData)=>
  //     {
  //      productProps={product_name:name ,warehouse_id:warehouse,warehouse_name:warehouse_name,section_name:sectionData.section_name,section_id:sectionData.id,quantity:quantity}
       
    
  //     })
  //     console.log(productProps)
  //     await Product.create({ ...productProps })
  //     .then(product => res.json({
  //       ok: true,
  //       message: 'Product Inserted',
  //       product
  //     }))
      
  //    }
}


const getSectionCapacity = async (warehouse) => {
  let sectionData = []
  await Section.findByWhere({ 'warehouse_id': warehouse })
    .then(section => {
      // res.send(section)

      sectionData = section


    })
  return sectionData

}
const deleteSectionData = async (sectionData) => {

  let sectionDataLength=sectionData.length
  let delcount=0

  for(let i=0;i<sectionData.length;i++)
  {

    try {
      let deleteCount =  await Section.destroy(sectionData[i].id)
      delcount=deleteCount+delcount
    } catch (err) {
      console.error(err);
    }

    // Section.destroy(sectionData[i].id)
    //  .then(deleteCount => {
    //   console.log("Inside then del function  " , deleteCount)
    //   delcount=deleteCount+delcount
    // })
    //   .catch(err=>{
    //     console.log("error in destroy  " ,err)
    //   })
  }

  // await sectionData.forEach((section=>{

  //     Section.destroy(section.id)
  //    .then(deleteCount => {
  //     console.log("Inside then del function  " , delcount)
  //     delcount=deleteCount+delcount
  //   })
  //     .catch(err=>{
  //       console.log("error in destroy  " ,err)
  //     })
  //  }))
 
  if(delcount===sectionDataLength)
      {
        
       
        return true
      }
    return false


    
}
const getProducts = (req, res, next) => {


  Product.findAll()
    .then(products => res.json({
      ok: true,
      message: 'product found',
      products,

    }))
    .catch(next)
}

const getProduct = (req, res) => {
  const wareHouseId = req.params.id


  Product.findByWhere({ 'warehouse_id': wareHouseId })
    .then(product => {
      res.send(product)
    console.log("sending data from here")
    })

  // Product.find(wareHouseId).where({warehouse_id: wareHouseId})
  //   .then(product => res.json({
  //     ok: true,
  //     message: 'Product found',
  //     product
  //   }))
  //   .catch(next)
}
const getProductById=(req,res)=>{
  const wareHouseId = req.params.id
  console.log(req.params)
Product.findById(wareHouseId)
    .then(warehouse => res.json({
      ok: true,
      message: 'Warehouse found',
      warehouse
    }))
    // .catch(next)
}

const deleteProduct = (req, res, next) => {
  const projectId = req.params.id

  Product.destroy(projectId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Product deleted',
      deleteCount
    }))
    .catch(next)
}
const updateProduct=(req,res)=>{


 const props=req.body
 delete props.warehouse
 console.log(props)
 Product.update(props.id,props)
 .then(
  product=>{
    console.log(product)
    // res.send(product)
  }
 )
 .catch(err=>{
  console.log(err)
 })
}
const saveProductAsSectionBySection=(req, res)=>{
  const props = req.body
  let propLength=props.length
  let addProdCount=0
  
  props.forEach(element => {   

    
    Product.saveFromArray({...element}).then(product=>{
      // console.log(element.section_capacity  ,'Quan' , element.quantity)
      let updatedCapacitySec =element.section_capacity-element.quantity
    
      const sectionUpdateProps={section_capacity:updatedCapacitySec}
      
      Section.update(element.section_id, sectionUpdateProps)
      .then(section =>{
        console.log(section)

      //     res.json({
      //   ok: true,
      //   message: 'Section updated',
      //   section
      // })
    })
      .catch(err=>{
        console.log(err)
      })
      addProdCount=addProdCount+product.length
      console.log(" product length : " ,addProdCount)
      if(addProdCount===propLength)
      {
             res.json({
        ok: true,
        message: '  Product Added',
        addProdCount
      })
        res.send(addProdCount)
      }
    })
    
      
});
}
module.exports = {
getProductById,
  getProducts,
  getProduct,
  saveProductAsWholeSection,
  deleteProduct,
  saveProductAsSectionBySection,
  updateProduct
}
