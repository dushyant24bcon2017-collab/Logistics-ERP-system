import { API_BASE_URL } from "@/config";
import { useState,useEffect } from "react"
export const useFetchCustomers = () =>{
const [customers, setCustomers] = useState<
 {id:string; 
 customerName: string;
  phone ?:string;
}[]
>([])
const [customerLoading, setCustomerLoading] = useState<boolean>(true)
const token = localStorage.getItem('token')
useEffect((()=>{
    const fetchCustomer = async()=>{
       try{ const res = await fetch(API_BASE_URL + "/customer",{
           headers:{
          "Authorization" : `bearer ${token}`,
          "Content-Type" : "application/json"
        }
      })
      const data = await res.json()
      setCustomers(data)}
     catch (error) {
        console.error(error)
      }
      finally{
        setCustomerLoading(false)
      }
        
    }
    fetchCustomer()
}),[])
return {customers,customerLoading}
}