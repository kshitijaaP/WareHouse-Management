import { useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
export default function ProductList() {
    const navigate = useNavigate()
    const [productList, setProductList] = useState([])
    const [productData, setProduct] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        getproducts()
    }, [])
    const getproducts = () => {
        axios.get('http://localhost:8080/products').then(res => {
            console.log(res)
            setProductList(res.data.products)
        })

    }
    const handlesearch = (event) => {
        productList.forEach(element => {
            console.log(element)
        });

        const getSearch = event.target.value;
        if (getSearch.length > 0) {
            const searchdata = productList.filter(item =>
                // item.unique_code.toString().includes(getSearch)
                item.product_name.toLowerCase().includes(getSearch)
                || item.product_name.toLowerCase().includes(getSearch)
                || item.section_name.toLowerCase().includes(getSearch)
                || item.quantity.toString().includes(getSearch)
            );
            setProductList(searchdata);
        }
        else {
            setProductList(productData);
        }
        setQuery(getSearch);
    }
    const getProductRowData = (product) => {

        navigate(`/products/${product.id}`)
    }
    const addNewButton = () => {
        let id = "new"
        navigate(`/products/${id}`)
    }
    const transferProduct = (product) => {

        navigate(`/products/${product.id}`, {
            state: {
                product
            },
        });

        //    navigate('/addfees', {
        //         itemId: student._id,
        //         otherParam: student,
        //       });
        // navigate(`/addfees` ,{ state:{student}})
    }

    return (
        <>
            <Navbar />

            <div class="HeaderProductList">
                <ul class="list" style={{ textDecoration: 'none', listStyleType: 'none' }}>
                    <li style={{ border: 'none', display: 'inline ', fontWeight: 'bold', marginRight: '1485px' }}>
                        {/* <h1> */}
                        <label style={{ fontSize: '30px', marginLeft: '-24px' }}>Product List</label>
                        {/* </h1> */}
                    </li>
                    <li style={{ border: 'none', display: 'inline ' }}>
                        <button onClick={addNewButton} class="addNewButton">Add New</button>

                    </li>
                </ul>

            </div>

            <br></br>
            <div className="col-md-6">
                <input type="text" style={{ width: '500px', height: '42px', marginLeft: '4px' }} name='name' value={query} className="InputSearch" onChange={(e) => handlesearch(e)} placeholder='Search...' />
            </div>
            <br></br>
            <div class="table-responsive">


                <div class="table-wrapper">
                    <table class="table table-striped table-hover">
                        <thead style={{ color: 'white', backgroundColor: 'slategrey', fontSize: '20px' }}>
                            <tr >
                                <th style={{ width: '10%' }} >Sr.No</th>
                                <th style={{ width: '30%' }} >Product Name</th>
                                <th style={{ width: '30%' }}  >Warehouse Name</th>
                                <th style={{ width: '10%' }}  >Quantity</th>
                                <th style={{ width: '10%' }} >Section Name</th>
                                <th style={{ width: '30%' }} >Transfer Product</th>
                            </tr>
                        </thead>

                        {productList.map((product, index) => {

                            return (
                                <>
                                    <tbody >
                                        <tr >
                                            <td onClick={() => { getProductRowData(product) }} >{index + 1}</td>
                                            <td onClick={() => { getProductRowData(product) }} >{product.product_name}</td>
                                            <td onClick={() => { getProductRowData(product) }} >{product.warehouse_name}</td>
                                            <td onClick={() => { getProductRowData(product) }} >{product.quantity}</td>
                                            <td onClick={() => { getProductRowData(product) }} >{product.section_name}</td>
                                            {/* <td onClick={() => { getProductRowData(product) }} >{product.capacity}</td> */}
                                            <td>
                                                <button onClick={() => { transferProduct(product) }} class="btn btn-dark">Transfer Product</button>
                                            </td>

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
