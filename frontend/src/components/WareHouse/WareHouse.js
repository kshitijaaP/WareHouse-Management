import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios"
import {  useNavigate, useParams } from 'react-router-dom';
export default function WareHouse() {
    const [showSubmittedData, setShowSubmittedData] = useState([])
    const [warehouseData,setWareHouseData]=useState({name:'', location:'', unique_code:'', status :'', capacity:''})
    const [showEdit,setShowEdit]=useState(false)
    const [showCancelBn,setShowCancelBtn]=useState(false)
    const { id } = useParams();
    const navigate=useNavigate()
    const handleWareHouseInput=(e)=>{
        const {name,value}=e.target
        setWareHouseData({...warehouseData,[name]:value})
    }
    useEffect(()=>{
        if(id !== null && id !=='new'){
            getOneWareHouseData(id)
        }
      
    },[])
    // const getwarehouses=()=>{
    //     axios.get('http://localhost:8080/warehouses').then(res=>{
         
    //     })

    // }
    const getOneWareHouseData = (id) => {
        axios.get(`http://localhost:8080/warehouse/${id}`).then(res => {
                let oneStudentArray = res.data.warehouse[0]
                
                //  setWareHouseData(oneStudentArray)
                 setShowSubmittedData(oneStudentArray)
            })
    }

    const submitWareHouseData=(e)=>{
        e.preventDefault()
       
        axios.post('http://localhost:8080/warehouses',warehouseData).then(res=>{
            console.log(res)
            navigate("/warehouse")
        })
    }
    const editButton = (e,studentData) => {
        e.preventDefault()
        setShowCancelBtn(true)
       setWareHouseData(studentData)
       setShowSubmittedData('')
    }
    const deletButton=(e,studentData)=>{
        e.preventDefault()
        axios.post(`http://localhost:5050/deletestudentdata/${studentData._id}`).then(res=>{
            if (res.data.message==='Deleted'){
                navigate("/student")
            }
        })
    }
    const cancelButton=(e)=>{
        e.preventDefault()
        setShowSubmittedData(warehouseData)
        setShowCancelBtn(false)
        // getOneStudentData(cancelId)
        
    }
    return (
        <>
            <div style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '1200px' }}>

                <Navbar />
                <div class="container" style={{ backgroundColor: 'rgb(239,239,239)', height: '745px' }}>
                    <div class="addWareHouseHeader" style={{ backgroundColor: 'rgb(11,113,113)', color: 'white', height: '56px' }}>
                        <h1 style={{ paddingLeft: '18px' }}>WareHouse</h1>
                    </div>
                    <form >
                    <ul style={{marginTop:'20px',marginLeft:'-36px'}}>
                            
                            {!showSubmittedData.id && 
                            <li style={{border:'none',display:'inline '}}>
                                 <button  style={{marginRight:'10px'}} class="btnSubCan"   onClick={submitWareHouseData} >Submit</button>
                            </li>
                            }                         
                            {/* {showSubmittedData.id && 
                            <li style={{border:'none',display:'inline '}}>
                            <button style={{marginRight:'10px'}} class="btnEditDelWH"  onClick={(e) => { editButton(e,showSubmittedData) }} >Edit</button>
                            </li>}
                  
                           
                            
                                                   
                    
                         
                           
                            {showSubmittedData.id && 
                             <li style={{border:'none',display:'inline '}}>
                            <button class="btnEditDelWH"   onClick={(e) => { deletButton(e,showSubmittedData) }} >Delete</button>
                            </li>
                            } */}
                    
                          
                        </ul>
                    <div class="row mt-4">
                        <div class="col">
                            <label class="labelAddStudent" for="validationServer01">Name</label>
                            {!showSubmittedData.name &&  <input onChange={handleWareHouseInput}  class="form-control  mt-2" name="name" value={warehouseData.name} type="text"  ></input>}
                            {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                            <p> {showSubmittedData.name}</p>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <label class="labelAddStudent" for="validationServer01">Location</label>
                            {!showSubmittedData.location && <input onChange={handleWareHouseInput}  class="form-control  mt-2" name='location' value={warehouseData.location} type="text" ></input>} {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                            <p> {showSubmittedData.location}</p>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <label class="labelAddStudent" for="validationServer01">Unique Code</label>
                            {!showSubmittedData.unique_code &&   <input onChange={handleWareHouseInput} value={warehouseData.unique_code} name="unique_code"  class="form-control  mt-2" type="text" ></input>}
                            {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                            <p> {showSubmittedData.unique_code}</p>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <label class="labelAddStudent" for="validationServer01">Status</label>
                            <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                            {!showSubmittedData.status &&      <select style={{ width: '58%', height: '35px' }} onChange={handleWareHouseInput} value={warehouseData.status} name="status" >
                                    <option name="1"> Active</option>
                                    <option name="2">Inactive</option>

                                </select>}
                            </div>
                            <p> {showSubmittedData.status}</p>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <label class="labelAddStudent" for="validationServer01">Capacity</label>
                            {!showSubmittedData.capacity &&  <input onChange={handleWareHouseInput} value={warehouseData.capacity} name="capacity" class="form-control  mt-2" type="text" ></input>}
                            {/* <span style={{ color: "red" }}>Please Enter Batch Code </span> */}
                            <p> {showSubmittedData.capacity}</p>
                        </div>
                    </div>


                    {/* <button onClick={submitWareHouseData} class="btn btn-primary">Submit</button> */}
                    </form >
                </div>
                
            </div>
            
        </>
    )
}