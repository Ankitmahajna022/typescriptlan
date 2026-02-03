import { Routes,Route,Link } from 'react-router-dom'
import ProductList from './pages/ProductList'
import CreateProduct from './pages/CreateProduct'
import UpdateProduct from './pages/UpdateProduct'
import './App.css'

function App() {
  

  return (
    <>
      <nav>
        <Link to="/">Produts</Link>
        <Link to="/create">Add Product</Link>
      </nav>

     <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/create' element={<CreateProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>}/>
     </Routes>
    </>
  )
}

export default App
