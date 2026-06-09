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
import { columnemployee } from "@/datatables/Columnemployee"
import type { Employee } from "@/datatables/Columnemployee"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Adminroutes from "@/Adminroutes"

const Employees = () => {
  //states
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false)
  
  //form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const token = localStorage.getItem('token')

  //get employee
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/add-employee", { 
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  // post employee
  const handleAddEmployee = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all the feilds!")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/add-employee", {
        method: "POST",
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role })
      })

      if (res.ok) {
        setIsNewEmployeeOpen(false)
        setName("")
        setEmail("")
        setPassword("")
        setRole("")
        fetchEmployees() // Refresh table
      } else {
        const errorData = await res.json()
        alert(`Lafda: ${errorData.error}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //delete employee
  const handleDeleteEmployee = async (id: string) => {
   

    try {
      const res = await fetch(`http://localhost:5000/add-employee/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `bearer ${token}`,
        }
      })

      if (res.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id))
      } else {
        alert("Delete nahi ho paya, shayad tu Admin nahi hai.")
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
              <h1 className="p-5 text-3xl">Employees / Staff</h1>
              
             
             <Adminroutes> 
                <Button onClick={() => setIsNewEmployeeOpen(true)} variant={"outline"} className="p-7">
                  Add New Employee 
                </Button>
              </Adminroutes>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Spinner className="w-10 h-10 animate-spin text-zinc-500" />
              </div>
            ) : ( 
              <div className="px-5">
                <DataTable columns={columnemployee(handleDeleteEmployee)} data={employees}/>
              </div>
            )}

            <Dialog open={isNewEmployeeOpen} onOpenChange={setIsNewEmployeeOpen}>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Hire a New Employee</DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col gap-4 py-4">
                  <Input 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input 
                    placeholder="Email Address" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="STAFF">Staff / Cashier</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddEmployee}>Hire Employee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </main>
        </SidebarProvider>
      </div>
    </>
  )
}

export default Employees