import {useEffect} from 'react'
import {useDispatch,useSelector  } from 'react-redux'
import type { RootState,AppDispatch } from '../app/store'
import { getProducts,deleteProduct } from '../features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import "./ProductList.css"

export default function ProductList() {
  const dispatch=useDispatch<AppDispatch>()
  const products=useSelector((state:RootState)=>state.products.items)
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(getProducts());
  },[])

  return (
     <div className="container">
      <h2>Product List</h2>

      {products.length === 0 && (
        <p className="empty">No products found</p>
      )}

      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <div className="product-info">
            <span className="product-title">{p.title}</span>
            <span className="product-price">₹{p.price}</span>
          </div>

          <div className="product-actions">
            <button
              className="btn-edit"
              onClick={() => navigate(`/update/${p.id}`)}
            >
              Edit
            </button>

            <button
              className="btn-delete"
              onClick={() => dispatch(deleteProduct(String(p.id)))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
