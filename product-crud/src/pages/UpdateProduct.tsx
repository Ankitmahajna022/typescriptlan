import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState,AppDispatch } from "../app/store"
import { useParams,useNavigate } from "react-router-dom"
import { updateProduct } from "../features/product/productSlice"

export default function UpdateProduct() {
const {id}=useParams()
const dispatch=useDispatch<AppDispatch>()
const product =useSelector((state:RootState)=>state.products.items.find((p) => p.id === String(id)))
const navigate = useNavigate();
  return (
    <div>
      
    </div>
  )
}
