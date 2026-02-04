import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createProducts } from '../features/product/productSlice'
import type { AppDispatch } from '../app/store'
import { useNavigate } from 'react-router-dom'
import "./CreateProduct.css"


export default function CreateProduct() {
    const dispatch=useDispatch<AppDispatch>()
    const [title,setTitle]=useState("")
    const [price,setPrice]=useState(0)
    const navigate =useNavigate()
    const  handleSubmit=()=>{
        dispatch(createProducts({title,price}))
        setTitle("")
        setPrice(0)
        navigate("/");
    }
  return (

       <div className="container">
      <h2>Create Product</h2>

      <input
        className="input"
        type="text"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Price"
        onChange={e => setPrice(+e.target.value)}
      />

      <button className="btn-add" onClick={handleSubmit}>
        Add Product
      </button>
    </div>
  )
}
