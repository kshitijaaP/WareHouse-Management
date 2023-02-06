import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import axios from "axios"
export default function Section() {
    const [showSectionInput,setShowSectionInput]=useState(false)
    const [getWareHouseData, setGetWareHouseData] = useState([])
    const [sectionInputData,setSectionInputData]=useState([{section_name:'', section_capacity:'', warehouse_id:''}])
    const [formFields, setFormFields] = useState([
        { name: '', age: '' },
    ])
    const [wareHouseId,setwareHouseId]=useState(0)
    const [showWareHouse, setShowWareHouse] = useState(false)
    useEffect(() => {
        populateWareHouseDropDown()
       
    }, [])

    const handleFormChange = (event, index) => {
        console.log(wareHouseId)
        sectionInputData.forEach((section)=>{
            section.warehouse_id=wareHouseId
        })
        // sectionInputData.warehouse_id=wareHouseId
        let data = [...sectionInputData];
        data[index][event.target.name] = event.target.value;
        setSectionInputData(data);
    }

    const getSections =()=>{
        axios.get('http://localhost:8080/sections').then(res=>{
         
            setSectionInputData(res.data.sections)
        })

    }
     const submit =async (e) => {
        e.preventDefault();
        console.log(sectionInputData)
        await axios.post('http://localhost:8080/sections',sectionInputData).then(
            getSectionByWareHouseId(sectionInputData[0].warehouse_id)
        )
    }

    const addFields = (e,wareHouseId) => {
        e.preventDefault()
        console.log(wareHouseId)
        let object = {
            section_name:'', section_capacity:'', warehouse_id:wareHouseId
        }

        setSectionInputData([...sectionInputData, object])
     
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }
    const populateWareHouseDropDown = () => {
       
            axios.get('http://localhost:8080/warehouses').then(res => {
                let tempBatchArray = [res.data.warehouses]
              
                setGetWareHouseData(res.data.warehouses)
                setShowWareHouse(true)
            })
         

        
    }
    const getSectionByWareHouseId=(id)=>{
        axios.get(`http://localhost:8080/warehouse/${id}/sections`).then(res => {
            let tempBatchArray = [res.data]
          
            setSectionInputData(res.data)
            // setShowWareHouse(true)
        })
        
    }
    const handleWareHouseDataInput=(e,id)=>{
        const {name,value}=e.target
    
        // setSectionInputData(previousState => {
        //     return { ...previousState, warehouse_id: value }
        //   });
    //   setSectionInputData([{...sectionInputData,warehouse_id:value}])
      setwareHouseId(value)
        if (value !==null)
        {
            setShowSectionInput(true)
            getSectionByWareHouseId(value)
        }
        
    }
   
    return (
        <div >
            <Navbar />
            <div class="container">
                
                  <div class="col">
                  <label class="labelAddStudent" style={{fontSize:'20px'}} for="validationServer02">
                    <span> WareHouse</span>
                   </label>
                  <div className="col col-sm-9 mt-3" style={{ border: 'none',height:'80px',width:'1130px' }}>
                      <select style={{ width: '40%', height: '52%' }} name="warehousename" onChange={handleWareHouseDataInput}>
                          { showWareHouse && 
                            
                              getWareHouseData.map((item, index) => {
                                  return <option style={{ fontSize: '20px' }} onChange={(e)=>{handleWareHouseDataInput(e,item.id)}} value={item.id } name="batch">{item.name}</option>
                              })

                          }
                      </select>
                      </div>
              </div>
                
                {showSectionInput && 
            <form>
                <div class="table-responsive">


                    <div class="table-wrapper">
                        <table class="table table-striped table-hover">
                            <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                                <tr>
                                    <th >WareHouse Id</th>
                                    <th >Name</th>
                                    <th >Capacity</th>
                                </tr>
                            </thead>
                          
                                {sectionInputData.map((form, index) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                    
                                                        <input
                                                            name='warehouse_id'
                                                            value={wareHouseId}
                                                            placeholder='Name'
                                                            onChange={event => handleFormChange(event, index)}
                                                          
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            name='section_name'
                                                            placeholder='Name'
                                                            onChange={event => handleFormChange(event, index)}
                                                            value={form.section_name}

                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            name='section_capacity'
                                                            placeholder='capacity'
                                                            onChange={event => handleFormChange(event, index)}
                                                            value={form.section_capacity}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </>

                                    )
                                })}
                             <button onClick={(e)=>{addFields(e,wareHouseId)}}>Add More..</button>
            <br />
            <button onClick={submit}>Submit</button>
                        </table>
                    </div>
                </div>
                
            </form>
            }
            </div>
          
        </div>
    );

}