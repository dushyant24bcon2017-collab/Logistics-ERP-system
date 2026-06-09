import { useEffect, useState } from "react"
import { columnorder } from "@/datatables/Columnorder"
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
import type { Order } from "@/datatables/Columnorder"
import { useFetchCustomers } from "@/customHooks/getCustomer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetchProducts } from "@/customHooks/getProducts"


const Orders = () => {
  //states
const [orders, setOrders] = useState<Order[]>([])
const [selectedOrder , setSelectedOrder] = useState<Order | null>(null)
const [loading, setLoading] = useState(true)
const [isViewOpen,setIsViewOpen]= useState(false)
const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
const [customerId,setCustomerId] = useState<String|null>(null)
const [cartItems,setCartItems] = useState<{
  productId : string;
  name: string ;
  price: number;
  quantity:number;
}[]>([])
const [tempProductId, setTempProductId] = useState<string>("")
const [tempQuantity, setTempQuantity] = useState<number>(1)
//token
const token = localStorage.getItem('token')
//calling custom hooks 
const {customers} = useFetchCustomers()
const {product} = useFetchProducts()

  const getOrders = async()=>{
    try {
      const res = await fetch("http://localhost:5000/orders",{
        headers:{
          "Authorization" : `bearer ${token}`,
          "Content-Type" : "application/json"
        }
      })
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }
  getOrders()
useEffect((()=>{getOrders()}),[])
//post order
const postOrder = async()=>{
  if (!customerId) {
    alert("please select customer");
    return;
  }
  if (cartItems.length === 0) {
    alert("please add items to your bill ");
    return;
  }
  const itemsForBackend = cartItems?.map((item)=>({
    productId: item.productId,
    quantity: item.quantity
  }))
  const payload ={
    customerId:customerId,
    items: itemsForBackend
  }
  const res = await fetch("http://localhost:5000/orders",{
    method:"POST",
    headers:{
      "Authorization" : `bearer ${token}`,
          "Content-Type" : "application/json"
    },
    body:JSON.stringify(payload)
  })
  if(res.ok){
    getOrders()
    setIsNewOrderOpen(false)
  }
  
}
// triggerview function
const triggerView = (order : Order) =>{
  setSelectedOrder(order)
setIsViewOpen(true)
}
//triggerorder function 
const triggerOrder =()=>{
  setIsNewOrderOpen(true)

}
//add to bill fucntion
const addItemToBIll = ()=>{
if(!tempProductId) return 
const selectedProduct = product.find((p)=>p.id==tempProductId)
if (!selectedProduct) return;
setCartItems((prev)=>[...prev,
  {productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.basePrice,
      quantity: tempQuantity,}
])
setTempProductId("")
setTempQuantity(1)
}
//remove from bill
const removeItemFromBill=(idOfItem:string)=>{
  setCartItems((prev)=>
    prev.filter((itm)=> itm.productId !=idOfItem)
  )
}
  return (
    <>
      <div >
       <SidebarProvider>
      <Sidebar />
    <main className="w-full">
  <SidebarTrigger />
  <div className="pb-4 flex justify-between pr-4">  
      <h1 className=" p-5 text-3xl">Orders</h1>
        <Adminormanagerroutes> 
  <Button onClick={triggerOrder} variant={"outline"} className="p-7">
    Create New Order 
  </Button>
  </Adminormanagerroutes>
      </div>
{ loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner className="w-10 h-10 animate-spin text-zinc-500" />
          </div>):( 
          <DataTable  columns={columnorder(triggerView)} data={orders}/>)

  }
  <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
      
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          
          </DialogHeader>
          
            {/* <Field>
             {  selectedOrder?.orderItem.map((items)=>(
                <div key={items.id}>
                  productid: { items.productId}
                  quantity: {items.quantity}
                  price: {items.price}
                </div>
              ))}
              
            </Field> */}

         <div className="py-4 space-y-3 max-h-72 overflow-y-auto">
    
    


    {selectedOrder?.orderItem && selectedOrder.orderItem.length > 0 ? (
      selectedOrder.orderItem.map((item, index) => (
       
        <div 
          key={index} 
          className="border border-zinc-700 bg-zinc-900 p-3 rounded-lg text-sm text-zinc-200 flex flex-col gap-1"
        >
          <div className="flex justify-between font-medium">
            <span>Product ID:</span>
            <span>{item.productId}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span>{item.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="text-green-400 font-bold">₹{Number(item.price)}</span>
          </div>
        </div>
      ))
    ) : (
      
      <div className="text-center text-zinc-500 py-6">
        No items found in this order.
      </div>
    )}

  </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
             <div>

             </div>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
    <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
      
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create a new Order</DialogTitle>
            
          </DialogHeader>
         <div className="">
          <Select onValueChange={setCustomerId}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Customers</SelectLabel>
          {customers.map((cust)=>(
           <SelectItem value={cust.id}>{cust.customerName}</SelectItem>
          ))}
         
        </SelectGroup>
      </SelectContent>
    </Select>
<div className="mt-6 p-4 border border-zinc-800 rounded-lg bg-zinc-900/50">
  <h3 className="mb-3 text-sm font-semibold text-zinc-300">Add Items to Bill</h3>
  
  <div className="flex gap-3">

    <div className="flex-1">
      <Select value={tempProductId} onValueChange={setTempProductId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {product?.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} (₹{p.basePrice})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-md px-3">
      <button 
        onClick={() => setTempQuantity(prev => Math.max(1, prev - 1))}
        className="text-zinc-400 hover:text-white font-bold"
      >-</button>
      <span className="w-4 text-center text-sm">{tempQuantity}</span>
      <button 
        onClick={() => setTempQuantity(prev => prev + 1)}
        className="text-zinc-400 hover:text-white font-bold"
      >+</button>
    </div>
  </div>

  <Button 
    onClick={addItemToBIll} 
    className="w-full mt-4" 
    variant="secondary"
    disabled={!tempProductId}
  >
    Add to Bill
  </Button>
</div>


<div className="mt-6 space-y-2">
  <h3 className="text-sm font-semibold text-zinc-300">Bill Summary</h3>
  <div className=" border border-zinc-800 rounded-lg p-3 bg-zinc-950">
    {cartItems.length === 0 ? (
      <div className="text-center text-zinc-500 py-6 text-sm">Cart is empty</div>
    ) : (
      <ul className="space-y-3">
   
        {cartItems.map((item) => (
          <li key={item.productId} className="flex justify-between items-center text-sm">
            <div>
              <span >{item.name}</span>
              <span className="ml-2">x{item.quantity}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-400 ">₹{item.price * item.quantity}</span>
              <button 
                onClick={() => removeItemFromBill(item.productId)}
                className="text-red-500 hover:text-red-400 "
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
         </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button  onClick={postOrder}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
</main>
    </SidebarProvider>
    </div>
    


    </>
  )
}

export default Orders
