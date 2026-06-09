
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
const Productswidgets = () => {
interface product {
id : string ;
quantity : number ;
name : string;
}
const token = localStorage.getItem('token')
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(true)
const navigate = useNavigate()
useEffect(()=>{
const fetchdata = async() =>{
    try {
        setLoading(true)
        const data = await fetch('http://localhost:5000/products',{
            headers:{
                "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
            }
        })
        const response = await data.json()
        console.log(response)
        if(!response) throw new Error("cannot fetch data from server")
        setProducts(response)
    } catch (error) {
        console.log(error)
    }
    finally{
        setLoading(false)
    }
}
fetchdata()
},[])
if(loading){
    return(
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
}
if(!products ||products.length === 0) return(
       <Card>
        <CardHeader>
            <CardTitle>Recent Productss</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
                <div className="flex flex-col ">
               <span className="pb-2 ml-2" > No porducts! </span>
                  <Button className="ml-" variant="outline" onClick={()=> navigate('/products')}>place order now </Button>
                  </div>
            </CardContent>
        </div>
    </Card>
    )
  return (
    <Card>
        <CardHeader>
            <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <div>
            <CardContent>
            <ul>
                {
                    products.slice(0,3).map((product:product)=>( 
                        < li key={product.id}>
                               {product.name}" : "{ product.quantity}
                        </li>
                    ))
                }
            </ul>
            </CardContent>
        </div>
    </Card>
  )
}

export default Productswidgets
