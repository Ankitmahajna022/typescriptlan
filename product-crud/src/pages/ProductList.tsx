import {useEffect} from 'react'
import {useDispatch,useSelector  } from 'react-redux'
import type { RootState,AppDispatch } from '../app/store'
import { getProducts,deleteProduct } from '../features/product/productSlice'

export default function ProductList() {
  const dispatch=useDispatch<AppDispatch>()
  const products=useSelector((state:RootState)=>state.products.items)

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
            <button onClick={()=>p.id !== undefined && dispatch(deleteProduct(Number(p.id)))}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}
