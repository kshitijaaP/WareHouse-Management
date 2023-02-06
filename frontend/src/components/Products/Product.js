import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios"
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import { Modal } from "bootstrap";
import ModalProduct from "./ModalProduct";
export default function Product() {
    const [showSubmittedData, setShowSubmittedData] = useState([])
    // const [productData, setProductData] = useState({ name: '', warehouse: 0, section: 0 , quantity: 0 })
    const [productData, setProductData] = useState({ name: '', warehouse: 0, warehouse_name: '', section_id: 0 ,section_name:'', quantity: 0 })
    const [showEdit, setShowEdit] = useState(false)
    const [showCancelBn, setShowCancelBtn] = useState(false)
    const { id } = useParams();
    const [showTranProBtn,setShowTranProBtn]=useState(false)
    const [showEditProBtn,setShowEditProBtn]=useState(false)
    const [showSubmitProBtn,setShowSubmitProBtn]=useState(false)
    const [getWareHouseData, setGetWareHouseData] = useState([])
    const [showWareHouse, setShowWareHouse] = useState(false)
    const [getSectionData, setGetSectionData] = useState([])
    const [showSection, setShowSection] = useState(false)
    const [showModal,setShowModal]=useState(false)
    const navigate = useNavigate()
    const [openModal,setOpenModal]=useState(true)
    const [hideSecTransProd,setHideSecTranProd]=useState(true)
  const [showTranBtn,setShowTranBtn]=useState(false)
    const params = useLocation();
    console.log(params)
    let paramProductId
    if (params.state !==null)
    {  paramProductId = params.state.product.id

    }
  
    // let studBatch = params.state.student.batch
    // let studJoiningDate = params.state.student.dateOfJoining
    // const [joiningDate,setJoiningDate]=useState('')
    // let studId =params.state.student._id

    useEffect(() => {
        if(paramProductId!==null && paramProductId!==undefined)
        {
            getOneProductData(paramProductId)
            setHideSecTranProd(false)
            setShowEditProBtn(true)
            
        }
      else  if((id !== null && id !=='new' )){
            getOneProductData(id)
          
           
        }
        if(id =='new' )
        {
            setHideSecTranProd(true)
            setShowSubmitProBtn(true)
        }
        
        populateWareHouseDropDown()
        populateSectionDropDown()
       
       
    }, [])
    const getOneProductData = (id) => {
        axios.get(`http://localhost:8080/products/${id}`).then(res => {
                let oneStudentArray = res.data.warehouse[0]
                
                //  setWareHouseData(oneStudentArray)
                 setShowSubmittedData(oneStudentArray)
                 
            })
    }
    const populateWareHouseDropDown = () => {
       
        axios.get('http://localhost:8080/warehouses').then(res => {
            let tempBatchArray = [res.data.warehouses]
          
            setGetWareHouseData(res.data.warehouses)
            setShowWareHouse(true)
        })  
}
const populateSectionDropDown = () => {
       
    axios.get('http://localhost:8080/sections').then(res => {
      
      
        setGetSectionData(res.data.sections)
        setShowSection(true)
    })  
}
const getSectionByWareHouseId=(id)=>{
    axios.get(`http://localhost:8080/warehouse/${id}/sections`).then(res => {
        let tempBatchArray = [res.data]
      
        setGetSectionData(res.data)
        // setShowWareHouse(true)
    })
    
}
    const handleProductInput = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
        if (e.target.name==='warehouse')
        {
            // setShowSectionInput(true)
            getSectionByWareHouseId(value)
        }
    }
    const submitProductData = (e) => {
        e.preventDefault()
        let capacity
        for (var i=0;i<getWareHouseData.length;i++)
        { let sectionId=""
       
        sectionId=getWareHouseData[i].id.toString()
        console.log(sectionId)
            if(getWareHouseData[i].id=== parseInt(productData.warehouse)){
                capacity=getWareHouseData[i].capacity
                setProductData({...productData,warehouse_name:getWareHouseData[i].name})
            }
        }

        if (parseInt(productData.quantity)>capacity){
           alert("Quantity is greater than warehouse Capacity")
        }
        else{
            setShowModal(true)
            setOpenModal(true)
        }



    }
    const editButton = (e, productDataEdit) => {
        e.preventDefault()
        setShowCancelBtn(true)
        setShowTranBtn(true)
       // setShowSecTranProd(true)
        setProductData(productDataEdit)
        setShowSubmittedData('')
        setShowTranProBtn(true)
        setShowEditProBtn(false)
    
  setHideSecTranProd(true)
    }
   const transferProduct=(e)=>{
    e.preventDefault()
    for (var i=0;i<getWareHouseData.length;i++)
    {
        if(getWareHouseData[i].id=== parseInt(productData.warehouse_id)){
      
            setProductData({...productData,warehouse_name:getWareHouseData[i].name})
        }
    }
    for (var i=0;i<getSectionData.length;i++){
        if(getSectionData[i].id=== parseInt(productData.section_id)){
          
            setProductData({...productData,section_name:getSectionData[i].section_name})
        }
    }
    
    axios.post(`http://localhost:8080/products/${id}`,productData).then(res => {
      console.log(res)  
      navigate("/products") 
        })
    console.log(productData)
   }
   
    return (
        <>
            <div style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1200px' }}>

                <Navbar />
                {!showModal &&
                <div class="container" style={{ backgroundColor: 'rgb(239,239,239)', height: '600px' }}>
                    <div class="addProductHeader" style={{ backgroundColor: 'rgb(11,113,113)', color: 'white', height: '56px' }}>
                        <h1 style={{ paddingLeft: '18px' }}>Product</h1>
                    </div>
                    <form >
                        <ul style={{ marginTop: '20px', marginLeft: '-36px' }}>

                            {showSubmitProBtn &&
                                <li style={{ border: 'none', display: 'inline ' }}>
                                    <button style={{ marginRight: '10px' }} class="btnSubCan" onClick={submitProductData} >Submit</button>
                                </li>
                            }
                            {showTranProBtn &&
                                <li style={{ border: 'none', display: 'inline ' }}>
                                    <button style={{ marginRight: '10px' ,width:'200px'}} class="btnSubCan" onClick={transferProduct} >Transfer Product</button>
                                </li>
                            }
                            {showEditProBtn &&
                                <li style={{ border: 'none', display: 'inline ' }}>
                                    <button style={{ marginRight: '10px' }} class="btnEditDelWH" onClick={(e) => { editButton(e, showSubmittedData) }} >Edit</button>
                                </li>}



                           



                            


                        </ul>
                        <div class="row mt-4">
                            <div class="col">
                                <label class="labelAddStudent" for="validationServer01">Name</label>
                                {!showSubmittedData.product_name && <input onChange={handleProductInput} class="form-control  mt-2" name="name" value={productData.product_name} type="text" placeholder='Name' ></input>}
                                {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                                <p> {showSubmittedData.product_name}</p>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <label class="labelAddStudent" for="validationServer01">Select WareHouse</label>
                                <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                {!showSubmittedData.warehouse_name &&  <select style={{ width: '40%', height: '40px' }} name="warehouse" value={productData.warehouse} onChange={handleProductInput}>
                                    {showWareHouse &&

                                        getWareHouseData.map((item, index) => {
                                            return <option style={{ fontSize: '20px' }} onChange={(e) => { handleProductInput(e, item.id) }} value={item.id} name="warehousename">{item.name}</option>
                                        })

                                    }
                                </select>   } 
                                 <p> {showSubmittedData.warehouse_name}</p>
                            </div>
                            </div>
                        </div>
                        {!hideSecTransProd && 
                         <div class="row mt-4">
                         <div class="col">
                             <label class="labelAddStudent" for="validationServer01">Select Section</label>
                             <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                             {!showSubmittedData.warehouse_name &&  <select style={{ width: '40%', height: '52%' }} name="section_id" onChange={handleProductInput}>
                                 {showWareHouse && !showSubmittedData.section_name &&

                                     getSectionData.map((item, index) => {
                                         return <option style={{ fontSize: '20px' }}  onChange={(e) => { handleProductInput(e, item.id) }} value={item.id} name="section">{item.section_name}</option>
                                     })

                                 }
                             </select>  } 
                              <p> {showSubmittedData.warehouse_name}</p>
                         </div>
                         </div>
                     </div>
                        }
                       {hideSecTransProd &&
                       <div class="row mt-4">
                       <div class="col">
                           <label class="labelAddStudent" for="validationServer01">Item Quantity</label>
                           {!showSubmittedData.quantity && <input onChange={handleProductInput} class="form-control  mt-2" name="quantity" value={productData.quantity} type="number" placeholder='Quantity' ></input>}
                           {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                        
                           <p> {showSubmittedData.quantity}</p>
                       </div>
                   </div>
                       }
                        



                        {/* <button onClick={submitProductData} class="btn btn-primary">Submit</button> */}
                    </form >
                    
                </div>
 }
 {showModal && <ModalProduct setOpenModal = {openModal} productData={productData}></ModalProduct>}
            </div>
        </>
    )
}