import React, { useState } from "react";
import axios from "axios"
import "./Modal.css";
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
function ModalProduct({ setOpenModal,productData }) {
  const[saveProductData,setSaveProductData]=useState([])
  const [showSectionTable,setShowSectionTable]=useState(false)
  const [sectionInputData,setSectionInputData]=useState([{section_name:'', section_capacity:'', warehouse_id:''}])
  const [showExcedMsg,setShowExcedMsg]=useState('')
  const navigate=useNavigate()
  const addAsWholeButton=(e)=>{
    e.preventDefault()
    console.log(productData)
    axios.post('http://localhost:8080/products',productData).then(res=>{
      console.log(res)
      navigate("/products")
    })
  }
  const getSectionByWareHouseId=(id)=>{
    axios.get(`http://localhost:8080/warehouse/${id}/sections`).then(res => {
        let tempSectionArray = [res.data]
      
        setSectionInputData(res.data)
        tempSectionArray[0].forEach((section)=>{
          saveProductData.push({product_name: productData.name, warehouse_id: productData.warehouse, warehouse_name: productData.warehouse_name, section_id: section.id ,section_name:section.section_name,quantity: 0,section_capacity:section.section_capacity })
       
        })
        // setShowWareHouse(true)
    })
    
}
const handleProductData=(e,index)=>{
  const {name,value}=e.target
  let tempProductArray=saveProductData
  if( value<tempProductArray[index].section_capacity)
  {
    tempProductArray[index].quantity=value
    
  }
  else{
    alert("Exceeding the capacity for " + tempProductArray[index].section_name)
    
  }

 
}
const submitProductData=(e)=>{
  e.preventDefault()
  console.log(saveProductData)
  axios.post('http://localhost:8080/products_by_section',saveProductData).then(res=>{
    navigate("/products")
  })
}
  const addSectionBySectionBtn=(e)=>{
    e.preventDefault()
    console.log(productData)
    setShowSectionTable(true)
    getSectionByWareHouseId(productData.warehouse)
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
    <div className="titleCloseBtn">
          
        </div>
        <div className="title">
          <h1>Add Product</h1>
          { !showSectionTable && 
          <>
          <button class="buttonAddProd"
            onClick={addSectionBySectionBtn}
            id="cancelBtn"
          >
            Add Section By Section
          </button>
          <button class="buttonAddProd" onClick={addAsWholeButton}>Add as Whole</button>
          </>}    
          
         
          <br></br>
        </div>
      
        <div className="footer">
          
        { showSectionTable &&
       <>
        
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Section Name</th>
              <th>Section Capacity</th>
              <th>Product Quantity</th>
            </tr>
            
          </thead>
          
          
            {saveProductData.map((section,index)=>{
              return(
                <>
                 <tbody>
                  <tr>
                    <td>{section.section_name}</td>
                    <td>{section.section_capacity}</td>
                    <td>
                    <input 
                    onChange={(e) => handleProductData(e,index)} 
                                                            name='quantity'
                                                            value={saveProductData.quantity}
                                                            // value={wareHouseId}
                                                            placeholder='Product quantity'
                                                            
                                                          
                                                        />
                                                  
                    </td>
                  </tr>
                 </tbody>
                </>
              )
             
            }) }
         
         </table>
         <button onClick={submitProductData}> Submit</button> 
       </>
         
         }
        </div>
        
      </div>
    </div>
  );
}

export default ModalProduct;
