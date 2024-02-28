
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './Components/DashBoard';
import { GroceryShopsList } from './Pages/GroceryShopsList';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import AdminPage from './Components/AdminPage';
import Subcategory from './Pages/Subcategory';
import Product from './Pages/Product';
import { MyProfile } from './Pages/MyProfile';
import { Cart } from './Pages/Cart';
import { CheckOut } from './Pages/CheckOut';


function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/adminPage' element={<AdminPage />} />
          <Route path='/' element={<DashBoard />}></Route>
          <Route path='/Register' element={<Registration />} />
          <Route path='/LogIn' element={<Login />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/grocery-stores/:mainCategoryID' element={<GroceryShopsList />}></Route>
          <Route path='/grocery-stores/:mainCategoryID/shop/:shopID/subcategories' element={<Subcategory />}></Route>
          <Route path='/products/:productID' element={<Product />}></Route>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




















// 
// 















// 






