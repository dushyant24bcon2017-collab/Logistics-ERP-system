import { useEffect, useState } from "react"
import { DataTable } from "@/datatables/Datatable"
import { Spinner } from "@/components/ui/spinner"
import Sidebar from "../elements/Sidebar"
import { Button } from "@/components/ui/button"
import Adminormanagerroutes from "@/Adminormanagerroutes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { columncustomers } from "@/datatables/Columncustomers"
import type { Customer } from "@/datatables/Columncustomers"
import { Input } from "@/components/ui/input"

const Customers = () => {
  // state
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false)

  // form state
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")

  const token = localStorage.getItem('token')

//get customer 
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/customer", { // Endpoint apne hisaab se check kar lena
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setCustomers(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

//post customers
  const handleAddCustomer = async () => {
    if (!customerName || !phone) {
      alert("Bhai dono fields bhrna zaroori hai!")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ customerName, phone })
      })

      if (res.ok) {
        setIsNewCustomerOpen(false)
        setCustomerName("")
        setPhone("")
        fetchCustomers() 
      } else {
        const errorData = await res.json()
        alert(`Lafda: ${errorData.error}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // delete customers
  const handleDeleteCustomer = async (id: string) => {
    const confirmDelete = window.confirm("Pakka delete karna hai ustaad?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`http://localhost:5000/customer/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `bearer ${token}`,
        }
      })

      if (res.ok) {
        setCustomers((prev) => prev.filter((cust) => cust.id !== id))
      } else {
        alert("Delete nahi ho paya, backend ro raha hai.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <SidebarProvider>
          <Sidebar />
          <main className="w-full">
            <SidebarTrigger />
            <div className="pb-4 flex justify-between pr-4">  
              <h1 className="p-5 text-3xl">Customers</h1>
              <Adminormanagerroutes> 
                <Button onClick={() => setIsNewCustomerOpen(true)} variant={"outline"} className="p-7">
                  Add New Customer 
                </Button>
              </Adminormanagerroutes>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Spinner className="w-10 h-10 animate-spin text-zinc-500" />
              </div>
            ) : ( 
              <div className="px-5">
              
                <DataTable columns={columncustomers(handleDeleteCustomer)} data={customers}/>
              </div>
            )}

         
            <Dialog open={isNewCustomerOpen} onOpenChange={setIsNewCustomerOpen}>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Add a New Customer</DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col gap-4 py-4">
                  <Input 
                    placeholder="Customer Name" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <Input 
                    placeholder="Phone Number" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddCustomer}>Save Customer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </main>
        </SidebarProvider>
      </div>
    </>
  )
}

export default Customers