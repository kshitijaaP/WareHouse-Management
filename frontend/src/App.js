
import {BrowserRouter,Routes,Route} from "react-router-dom"
import DashBoard from "./components/DashBoard/DashBoard";
import Login from "./components/Login/Login";
import Product from "./components/Products/Product";
import ProductList from "./components/Products/ProductList";
import Section from "./components/Sections/Section";
import SectionList from "./components/Sections/SectionList";
import WareHouse from "./components/WareHouse/WareHouse";
import WareHouseList from "./components/WareHouse/WareHouseList";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/dashboard" element={<DashBoard/>}></Route>
      <Route path="/warehouse" element={<WareHouseList/>}></Route>
      <Route path="/warehouse/:id" element={<WareHouse/>}></Route>
      <Route path="/section" element={<Section/>}></Route>
      <Route path="/sectionlist" element={<SectionList/>}></Route>
      <Route path="/products" element={<ProductList/>}></Route>
      <Route path="/products/:id" element={<Product/>}></Route>
      {/* <Route path="/warehouse/:id" element={<WareHouse/>}></Route> */}
     </Routes>
     </BrowserRouter>
  );
}

export default App;
