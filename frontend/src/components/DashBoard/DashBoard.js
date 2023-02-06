import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react"
import axios from "axios"
export default function DashBoard() {
    const [wareHouseList, setWareHouseList] = useState([])
    const [productList, setProductList] = useState([])
    const [sectionList, setSectionList] = useState([])
    useEffect(() => {
        getwarehouses()
        getproducts()
        getsections()
    }, [])
    const getwarehouses = () => {
        axios.get('http://localhost:8080/warehouses').then(res => {
            console.log(res)
            setWareHouseList(res.data.warehouses)
        })

    }
    const getproducts = () => {
        axios.get('http://localhost:8080/products').then(res => {
            console.log(res)
            setProductList(res.data.products)
        })

    }
    const getsections = () => {
        axios.get('http://localhost:8080/sections').then(res => {
            console.log(res)
            setSectionList(res.data.sections)
        })

    }
    return (
        <>

            <Navbar />
            {/* WAREHOUSE LIST */}
            <div class="row">
                <div className="col-lg-4">
                    <div className="col col-lg-3 mt-2" style={{ backgroundColor: 'rgb(68 73 78)', color: 'white', marginLeft: '1px', marginRight: '53px', width: '99.5%', height: '10%' }} >
                        <p style={{fontWeight:'bold',fontSize:'20px'}}>WareHouse Summary:</p>
                        <p style={{fontWeight:'bold',fontSize:'15px'}}>{wareHouseList.length}</p>
                    </div>
                    <div class="table-responsive">


                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                                    <tr >
                                        <th style={{ width: '10%' }} >Sr.No</th>

                                        <th style={{ width: '30%' }}  >Name</th>
                                        <th style={{ width: '10%' }}  >Location</th>
                                        <th style={{ width: '10%' }} >Status</th>

                                    </tr>
                                </thead>

                                {wareHouseList.map((warehouse, index) => {

                                    return (
                                        <>
                                            <tbody >
                                                <tr >
                                                    <td >{index + 1}</td>

                                                    <td >{warehouse.name}</td>
                                                    <td >{warehouse.location}</td>
                                                    <td >{warehouse.status}</td>


                                                </tr>
                                            </tbody>
                                        </>
                                    )

                                })}

                            </table>
                        </div>
                    </div>
                </div>
                {/* section List */}
                <div className="col-lg-4">
                <div className="col col-lg-3 mt-2" style={{ backgroundColor: 'rgb(68 73 78)', color: 'white', marginLeft: '1px', marginRight: '53px', width: '99.5%', height: '10%' }} >
                        <p style={{fontWeight:'bold',fontSize:'20px'}}>Section Summary:</p>
                        <p style={{fontWeight:'bold',fontSize:'15px'}}>{sectionList.length}</p>
                    </div>
                    <div class="table-responsive">


                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                                    <tr >
                                        <th style={{ width: '10%' }} >Sr.No</th>
                                        <th style={{ width: '30%' }} >Section Name</th>
                                        <th style={{ width: '30%' }}  >Section Capacity</th>

                                    </tr>
                                </thead>

                                {sectionList.map((section, index) => {

                                    return (
                                        <>
                                            <tbody >
                                                <tr >
                                                    <td >{index + 1}</td>
                                                    <td >{section.section_name}</td>
                                                    <td >{section.section_capacity}</td>

                                                    {/* <td >{section.capacity}</td> */}


                                                </tr>
                                            </tbody>
                                        </>
                                    )

                                })}

                            </table>
                        </div>
                    </div>

                </div>
                {/* product list */}
                <div className="col-lg-4">
                <div className="col col-lg-3 mt-2" style={{ backgroundColor: 'rgb(68 73 78)', color: 'white', marginLeft: '1px', marginRight: '53px', width: '99.5%', height: '10%' }} >
                        <p style={{fontWeight:'bold',fontSize:'20px'}}>Product Summary:</p>
                        <p style={{fontWeight:'bold',fontSize:'15px'}}>{productList.length}</p>
                    </div>
                    <div class="table-responsive">


                        <div class="table-wrapper">
                            <table class="table table-striped table-hover">
                                <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                                    <tr >
                                        <th style={{ width: '10%' }} >Sr.No</th>
                                        <th style={{ width: '30%' }} >Product Name</th>
                                        <th style={{ width: '30%' }}  >Warehouse Name</th>

                                        <th style={{ width: '30%' }} >Section Name</th>

                                    </tr>
                                </thead>

                                {productList.map((product, index) => {

                                    return (
                                        <>
                                            <tbody >
                                                <tr >
                                                    <td  >{index + 1}</td>
                                                    <td  >{product.product_name}</td>
                                                    <td  >{product.warehouse_name}</td>

                                                    <td  >{product.section_name}</td>
                                                    {/* <td  >{product.capacity}</td> */}


                                                </tr>
                                            </tbody>
                                        </>
                                    )

                                })}

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}