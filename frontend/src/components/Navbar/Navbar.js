import { NavLink } from "react-router-dom"
export default function Navbar() {
    return (<>


        <ul style={{backgroundColor:'rgb(11, 145, 145)' ,height:'42px',fontSize:'23px' }}>
        <li style={{border:'none',display:'inline',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/dashboard"}>DashBoard</NavLink>
            </li>
            <li style={{border:'none',display:'inline ',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/warehouse"}>WareHouse</NavLink>
            </li>
            <li style={{border:'none',display:'inline ',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/section"}>Section</NavLink>
            </li>
            <li style={{border:'none',display:'inline ',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/products"}>Product</NavLink>
            </li>
            <li style={{border:'none',display:'inline ',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/sectionlist"}>SectionList</NavLink>
            </li>
          
            {/* <li style={{border:'none',display:'inline ',marginRight:'20px'}}>
                <NavLink style={{color:'white',textDecoration:'none'}} to={"/feereport"}>Fee Report</NavLink>
            </li> */}
        </ul>

    </>)

}