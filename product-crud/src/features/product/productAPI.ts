import axios from "axios";
import type { Product } from "./productTypes";


const API_URL= "http://localhost:5000/products"

export const fetchProduct=()=>axios.get(API_URL)
export const createProduct=(data:Product)=>axios.post(API_URL,data)
export const updateProduct=(id:number,data:Product)=>axios.put(`${API_URL}/${id}`,data)
export const deleteProduct=(id:number)=>axios.delete(`${API_URL}/${id}`)
