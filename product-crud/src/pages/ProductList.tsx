import {useEffect} from 'react'
import {useDispatch,useSelector  } from 'react-redux'
import type { RootState,AppDispatch } from '../app/store'
import { getProducts,deleteProduct } from '../features/product/productSlice'
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
  const dispatch=useDispatch<AppDispatch>()
  const products=useSelector((state:RootState)=>state.products.items)
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(getProducts());
  },[])

  return (
    <div>
      <h2>Product List</h2>
      {
        products.map(p=>(
          <div key={p.id}>
            {p.title}-{p.price}
            <button onClick={()=> dispatch(deleteProduct(String(p.id)))}>Delete</button>
            <button onClick={()=>navigate(`/update${p.id}`)}>Edit</button>
          </div>
        ))
      }
    </div>
  )
}
