import {
  Card,
  CardContent,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "@/config"
const Customerwidgets = () => {
const navigate = useNavigate()
const token = localStorage.getItem('token')
const [customer , setCustomer]= useState([])
const [loading, setLoading] = useState(true)
interface customers{
    id: string;
    customerName: string;
}
useEffect(()=>{
const fetchData  = async()=>{
try {
    const data = await fetch(API_BASE_URL + '/customer',{
         headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"}
    })
    const response= await data.json()
    setCustomer(response)
} catch (error) {
    console.error(error)
}
finally{
    setLoading(false)
}}
fetchData();
},[])
if(loading){
    return ( <Card>
        <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
   <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      </div>
            </CardContent>
        </div>
    </Card>)
}
if(!customer || customer.length === 0){
     return ( <Card>
        <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
                <div className="flex flex-col ">
               <span className="pb-2 ml-2" > No orders! </span>
                  <Button className="ml-" variant="outline" onClick={()=> navigate('/customers')}>place order now </Button>
                  </div>
            </CardContent>
        </div>
    </Card>)
}
  return(
      <Card>
        <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
            <ul>
                {
                    customer.slice(0,3).map((customers:customers)=>( 
                        < li key={customers.id}>
                               { customers.customerName}
                        </li>
                    ))
                }
            </ul>
            </CardContent>
        </div>
    </Card>
  ) 
}

export default Customerwidgets
