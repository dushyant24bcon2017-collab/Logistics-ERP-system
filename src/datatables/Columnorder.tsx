"use client"
import type { Product } from "./Columnproducts"
import { type ColumnDef } from "@tanstack/react-table"
import { Button,  } from '@/components/ui/button'
import Adminormanagerroutes from "@/Adminormanagerroutes"


export type Customer = {
    id: string
    customerName: string
    phone ?: string
}
export type OrderItem ={
    id: string
  productId: string
  quantity: number
  price: number //baseprice 
  product: Product
}
export type Order ={
    id: string
    totalAmount : number | string
    orderTime : string 
    customer : Customer
    orderItem : OrderItem[]
}

export const columnorder =(
    triggerView :(order:Order)=> void
) : ColumnDef<Order>[] =>[
  {
    accessorKey: "id",
    header: "Order ID",
    cell :({row})=>{
        const order = row.original
        return(
            <span>
                {order.id.slice(-6)}
            </span>
        )
    }
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell : ({row})=>{
        const customer = row.original.customer.customerName
        return (
            <span> 
                {customer}
            </span>
        )

    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        // 👇 The VIP Button jo tera item ka "dropdown/popup" kholega!
        <Button variant="outline" size="sm" onClick={() => triggerView(row.original)}>
          View Details
        </Button>
      )
    }
  }
 
  

]