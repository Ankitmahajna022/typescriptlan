import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createProducts } from '../features/product/productSlice'
import type { AppDispatch } from '../app/store'


export default function CreateProduct() {
    const dispatch=useDispatch<AppDispatch>()
    const [title,setTitle]=useState("")
    const [price,setPrice]=useState(0)

    const  handlSubmit=()=>{
        dispatch(createProducts({title,price}))
        setTitle("")
        setPrice(0)
    }
  return (
    <div>
        <h2>Create Product</h2>
        <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)} />
        <input type="text" placeholder='price' onChange={e=>setPrice(+e.target.value)} />
        <button onClick={handlSubmit}>add</button>
    </div>
  )
}
