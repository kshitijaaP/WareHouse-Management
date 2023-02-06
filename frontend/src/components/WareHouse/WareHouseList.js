import { useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from 'react-router-dom';
import './WareHouse.css'
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
export default function WareHouseList() {
    const navigate=useNavigate()
    const [wareHouseList, setWareHouseList] = useState([])
    const [warehouseData, setWarehouse] = useState([]);
    
    const [query, setQuery] = useState('');
    useEffect(() => {
        getwarehouses()
    }, [])
    const getwarehouses = () => {
        axios.get('http://localhost:8080/warehouses').then(res => {
            console.log(res)
            setWareHouseList(res.data.warehouses)
        })

    }
    const handlesearch = (event) => {
        wareHouseList.forEach(element => {
            console.log(element)
        });
        
        const getSearch = event.target.value;
        if (getSearch.length > 0) {
            const searchdata = wareHouseList.filter(item => 
            item.unique_code.toString().includes(getSearch)
                || item.name.toLowerCase().includes(getSearch)
                || item.location.toLowerCase().includes(getSearch)
                || item.status.toLowerCase().includes(getSearch)
                || item.capacity.toString().includes(getSearch)
            );
            setWareHouseList(searchdata);
        }
        else {
            setWareHouseList(warehouseData);
        }
        setQuery(getSearch);
    }
    const getWareHouseRowData = (warehouse) => {

        navigate(`/warehouse/${warehouse.id}`)
    }
    const addNewButton = () => {
        let id = "new"
        navigate(`/warehouse/${id}`)
    }

    return (
        <>
            <Navbar />

            <div class="HeaderWareHouseList">
                <ul class="list" style={{ textDecoration: 'none', listStyleType: 'none' }}>
                    <li style={{ border: 'none', display: 'inline ', fontWeight: 'bold', marginRight: '1485px' }}>
                        {/* <h1> */}
                        <label style={{ fontSize: '30px',marginLeft:'-24px' }}>WareHouse List</label>
                        {/* </h1> */}
                    </li>
                    <li style={{ border: 'none', display: 'inline ' }}>
                        <button onClick={addNewButton} class="addNewButton">Add New</button>

                    </li>
                </ul>

            </div>
            <br></br>

            <div className="col-md-6">
                            <input type="text" name='name' style={{ width: '500px', height: '42px', marginLeft: '4px' }} value={query} className="InputSearch" onChange={(e) => handlesearch(e)} placeholder='Search...' />
                        </div>
                        <br></br>
            <div class="table-responsive">


                <div class="table-wrapper">
                    <table class="table table-striped table-hover">
                        <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                            <tr >
                                <th style={{ width: '10%' }} >Sr.No</th>
                                <th style={{ width: '30%' }} >Code</th>
                                <th style={{ width: '30%' }}  >Name</th>
                                <th style={{ width: '10%' }}  >Location</th>
                                <th style={{ width: '10%' }} >Status</th>
                                <th style={{ width: '30%' }} >Capacity</th>
                            </tr>
                        </thead>

                        {wareHouseList.map((warehouse, index) => {

                            return (
                                <>
                                    <tbody >
                                        <tr >
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{index + 1}</td>
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{warehouse.unique_code}</td>
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{warehouse.name}</td>
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{warehouse.location}</td>
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{warehouse.status}</td>
                                            <td onClick={() => { getWareHouseRowData(warehouse) }} >{warehouse.capacity}</td>

                                        </tr>
                                    </tbody>
                                </>
                            )

                        })}

                    </table>
                </div>
            </div>



        </>
    )
}
