import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Adminroutes from "@/Adminroutes"

export type Employee = {
  id: string
  name: string
  email: string
  role: string
}

export const columnemployee = (handleDelete: (id: string) => void): ColumnDef<Employee>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const emp = row.original
      return (
        <Adminroutes> 
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => handleDelete(emp.id)}
        >
          Delete
        </Button>
        </Adminroutes>
      )
    },
  },
]