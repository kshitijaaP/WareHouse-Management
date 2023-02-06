import { useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
export default function SectionList() {
    const navigate = useNavigate()
    const [sectionList, setSectionList] = useState([])
    const [sectionData, setSection] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        getsections()
    }, [])
    const getsections = () => {
        axios.get('http://localhost:8080/sections').then(res => {
            console.log(res)
            setSectionList(res.data.sections)
        })

    }
    const handlesearch = (event) => {
        sectionList.forEach(element => {
            console.log(element)
        });

        const getSearch = event.target.value;
        if (getSearch.length > 0) {
            const searchdata = sectionList.filter(item =>
                // item.unique_code.toString().includes(getSearch)
                item.section_name.toLowerCase().includes(getSearch)
                || item.section_capacity.toString().includes(getSearch)

            );
            setSectionList(searchdata);
        }
        else {
            setSectionList(sectionData);
        }
        setQuery(getSearch);
    }



    return (
        <>
            <Navbar />

            <div class="HeaderProductList">
                <ul class="list" style={{ textDecoration: 'none', listStyleType: 'none' }}>
                    <li style={{ border: 'none', display: 'inline ', fontWeight: 'bold', marginRight: '1485px' }}>
                        {/* <h1> */}
                        <label style={{ fontSize: '30px', marginLeft: '-24px' }}>Section List</label>
                        {/* </h1> */}
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



        </>
    )
}
