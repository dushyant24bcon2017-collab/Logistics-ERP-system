import  { useEffect, useState } from 'react'
import { ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig, } from "@/components/ui/chart"
  import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
  import { Button,  } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
 
const Ordergraph = () => {
    const token = localStorage.getItem('token')
    const [loading,setLoading] = useState(true)
    const [order,setOrder] = useState([])
    interface tnd{
        orderTime: string
        _sum :{
            totalAmount: number
        }
    }
    
    useEffect(()=>{
        try {
            const getOrders = async()=>{
                const response = await fetch('http://localhost:5000/analytics',{
                    headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            }
                })
                const data = await response.json()
                const orderData = data.map((tnd:tnd)=>({
                    time : tnd.orderTime.slice(0,10),
                    amount : Number(tnd._sum.totalAmount)
                }))
                setOrder(orderData) 
            }
            getOrders()
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    },[])
     const chartConfig ={
         amount: {
    label: "Order Amount",
    color: "#2563eb",
  }
    } satisfies ChartConfig
if(loading){ return( 
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </ChartContainer>)
}
if(!order || order.length === 0){
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
           No Recent Orders 
        </ChartContainer>
    )
}
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={order}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}      
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value:any) => value.slice(0, 10)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="#ffffff" radius={4} />
        
      </BarChart>
    </ChartContainer>
  )
}

export default Ordergraph
