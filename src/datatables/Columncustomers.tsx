import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Adminormanagerroutes from "@/Adminormanagerroutes"

export type Customer = {
  id: string
  customerName: string
  phone: string
}

export const columncustomers = (handleDelete: (id: string) => void): ColumnDef<Customer>[] => [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <Adminormanagerroutes>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => handleDelete(customer.id)}
        >
          Delete
        </Button>
        </Adminormanagerroutes>
      )
    },
  },
]