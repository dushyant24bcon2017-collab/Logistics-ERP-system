import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"
import {

  CardFooter,
 
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { API_BASE_URL } from "@/config"
    interface Product {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    basePrice: string | number; 
}
const chartConfig = {
    stock: {
      label: "Current Stock",
    }
} satisfies ChartConfig;
const Productpiechart = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(()=>{
        try {
            const fetchData = async()=>{
                const response = await fetch(API_BASE_URL + '/products',{
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                    
                })
                const data = await response.json()
                setProducts(data)
            }
            fetchData()
        } catch (error) {
           console.error(error) 
        }
        finally{
            setLoading(false)
        }
    },[])
   const  sortedData = [...products].sort((a:Product,b:Product)=> b.quantity - a.quantity)
   const topFourItem = sortedData.slice(0,3).map((item:Product) => {
    
    return {
        name: item.name,
        stock: item.quantity,
        fill: "#ffffff"
    }
})
   const otherItem = sortedData.slice(3)
   const otherTotalStock = otherItem.reduce((sum,item:Product)=> sum + item.quantity,0
)
   const chartData = [...topFourItem]
   if(otherTotalStock>0){
    chartData.push(
       { name: "Others",
        stock: otherTotalStock,
        fill: "#52525b"}
    )
   }
   const ACTIVE_INDEX = 0
   if(loading){ return( 
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </ChartContainer>)
    
}
if(!products || products.length === 0){
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
           No Recent Orders 
        </ChartContainer>
    )
}
  return (
    <> 
    <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stock"
              nameKey="name"
              innerRadius={60}
              strokeWidth={40}
              shape={({
                index,
                outerRadius = 0,
                ...props
              }: PieSectorShapeProps) =>
                index === ACTIVE_INDEX ? (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                ) : (
                  <Sector {...props} outerRadius={outerRadius} />
                )
              }
            />
          </PieChart>
        </ChartContainer>
          <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing products with the highest quantity in inventory
        </div>
      </CardFooter>
        </>
        
  )
}

export default Productpiechart
