import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState,AppDispatch } from "../app/store"
import { useParams,useNavigate } from "react-router-dom"
import { updateProduct } from "../features/product/productSlice"
import "./UpdateProduct.css"
export default function UpdateProduct() {
const {id}=useParams()
const dispatch=useDispatch<AppDispatch>()
const product =useSelector((state:RootState)=>state.products.items.find((p) => p.id === String(id)))
const navigate = useNavigate();

  const [title,setTitle]=useState("")
  const  [price,setPrice]=useState(0)
 
  useEffect(()=>{
    if(product){
      setTitle(product.title)
      setPrice(product.price)
    }
  },[product])

  const handleUpdate=()=>{
    dispatch(updateProduct({
      id:String(id),
      data: {title,price},
  }))
  navigate("/")
  }

  if(!product) return <h3>Product Not found</h3>;

  return (
    <div className="container">
      <h2>Update Product</h2>

      <input
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        type="number"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />

      <button className="btn-update" onClick={handleUpdate}>
        Update Product
      </button>
    </div>
  )
}
