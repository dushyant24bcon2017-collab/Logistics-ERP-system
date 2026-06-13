import { API_BASE_URL } from "@/config";
import { useState,useEffect } from "react"
export const useFetchProducts = ()=>
{const [product,setProduct] = useState<
    {id: string;
 sku: string;
 name: string;
 basePrice: number;
 mrp: number; 
 quantity: number;}[]>([])
const [loading,setLoading]= useState<boolean>()
//token
  const token = localStorage.getItem('token')
 const getProducts = async ()=>{
      try{ 
      const getResponse = await fetch(API_BASE_URL + '/products',{
        headers:{
          "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
        }
      })
      const getData = await getResponse.json()
      setProduct(getData)
    }
     catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)

    }
  }
  useEffect(()=>{getProducts()},[])
return{product,loading}}