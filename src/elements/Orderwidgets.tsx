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

function Orderwidgets() {
    const token = localStorage.getItem('token')
    const [orders,setOrders]= useState([])
    const [loading, SetLoading] = useState(true)
// interface for order
interface order{
    id: string ;     
    customer: {
        id: string ;
        customerName : string;
    };
    totalAmount : string ;
}
    const navigate = useNavigate()
    useEffect(()=>{
       const fetchData = async()=>{
        try {
            const data = await fetch(API_BASE_URL + "/orders", {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }})
            const response = await data.json()
            
            if(!response) throw new Error(" unable to fetch data from server ")
            setOrders(response)
        } catch (error) {
            console.error(error)
        }
        finally{
            SetLoading(false)
        }
        
       }
       fetchData()
    },[])
    if(loading) return(
        <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
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
    </Card>
       
    )
    if(!orders ||orders.length === 0) return(
       <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
                <div className="flex flex-col ">
               <span className="pb-2 ml-2" > No customers! </span>
                  <Button className="ml-" variant="outline" onClick={()=> navigate('/orders')}>place order now </Button>
                  </div>
            </CardContent>
        </div>
    </Card>
    )
  return (
    <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
            <ul>
                {
                    orders.slice(0,3).map((order:order)=>( 
                        < li key={order.id}>
                               { order.customer.customerName} : {order.totalAmount}
                        </li>
                    ))
                }
            </ul>
            </CardContent>
        </div>
    </Card>
)
}

export default Orderwidgets
