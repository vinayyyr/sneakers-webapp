import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import './stylesheets/layout.css'
import './stylesheets/products.css'
import './stylesheets/authentication.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage';

function App() {
  
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}/>
        <Route path='/productinfo/:productid' exact element={<ProtectedRoutes><ProductInfo/></ProtectedRoutes>}/>
        <Route path='/cart' exact element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}/>
        <Route path='/login' exact element={<LoginPage/>}/>
        <Route path='/register' exact element={<RegisterPage/>}/>
        <Route path='/orders' exact element={<ProtectedRoutes><OrderPage/></ProtectedRoutes>}/>
        <Route path='/admin' exact element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes=({children})=>{
  if(localStorage.getItem('currentUser')){
    return children
  }
  else{
   return <Navigate to='login' />
  }
}
