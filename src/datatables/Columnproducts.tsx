"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button,  } from '@/components/ui/button'
import Adminormanagerroutes from "@/Adminormanagerroutes"
import Adminroutes from "@/Adminroutes"
export type Product = {
id: string
 sku: string
 name: string
 basePrice: number
 mrp: number 
 quantity: number
}


export const columnsproducts =(
    onEdit: (product: Product) => void,
    onDelete: (product: Product) => void,): ColumnDef<Product>[] =>[
  {
    accessorKey: "sku",
    header: "Sku Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "baseprice",
    header: "Base Price",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id:"edit",
    header: "Edit",
    cell : ({row})=>{
        const product = row.original
        return(
            <Adminroutes>
            <Button variant={"secondary"} onClick={()=>{
              onEdit(product)      
            }}> Edit {product.name}</Button>
            </Adminroutes>
        )
    }
  },
  {
    id: "delete",
    header : "Delete",
    cell : ({row})=>{
        const product = row.original
         return(
            <Adminroutes>
            <Button onClick={()=>{onDelete(product)}} variant={"destructive"}>
                Delete {product.name}
            </Button>
            </Adminroutes>
         )
    }
  }

]