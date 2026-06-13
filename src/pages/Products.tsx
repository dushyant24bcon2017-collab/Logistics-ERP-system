import type { Product } from "@/datatables/Columnproducts"
import Sidebar from "../elements/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { columnsproducts } from "@/datatables/Columnproducts"
import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/datatables/Datatable"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Adminormanagerroutes from "@/Adminormanagerroutes"
import { API_BASE_URL } from "@/config"
const Products = () => {
  //states
  const [product,setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  //dialouge States
  const [isAddOpen,setIsAddOpen] = useState(false)
  const [isEditOpen,setIsEditOpen] = useState(false)
  //form and product states
  const [productToEdit, setProductsToEdit] = useState<Product| null>(null)
  const [editForm, setEditForm] = useState({ 
    basePrice:0 , mrp:0, quantity:0
})
const [addForm, setaddForm] = useState({ 
   sku:"",name:"", basePrice:0 , mrp:0, quantity:0
})

  //token
  const token = localStorage.getItem('token')


  // GET API
    const getProducts = async ()=>{
      try{ 
      const getResponse = await fetch(API_BASE_URL + '/products',{
        headers:{
          "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
        }
      })
      const getData = await getResponse.json()
      setProduct(getData)
    }
     catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{getProducts()},[])

    //POST API
    const addNewProduct = async ()=>{
      const postResponse = await fetch(API_BASE_URL + '/products',
       {  method:"POST",
          headers:{
          "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
        },
        body: JSON.stringify(addForm)
       }
      )
      if(postResponse.ok){
        setIsAddOpen(false)
        getProducts()
      }
    }
    //PUT API
  const editProduct = async(product:Product)=>{
    const res = await fetch(API_BASE_URL + `/products/${product.id}`,{
      method:"PUT",
       headers:{
          "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
        },
      body: JSON.stringify(editForm)
    }
  )
  if(res.ok){
    setIsEditOpen(false)
    getProducts()
  }
  }
  //DELETE API 
  const deleteProduct= async(product:Product)=>{
    const res = await fetch(API_BASE_URL + `/products/${product.id}`,{
      method:"DELETE",
       headers:{
          "Authorization": `bearer ${token}`,
                "Content-Type" : 'application/json'
        }
    }
    )
    if(res.ok){
      setProduct((prev)=> prev.filter((p:Product)=> p.id !== product.id))
    }
  }
  const triggerAdd = () =>{
    setaddForm({ 
   sku:"",name:"", basePrice:0 , mrp:0, quantity:0
})
setIsAddOpen(true)
  }

const triggerEdit =(product:Product)=>{
  setProductsToEdit(product)
  setEditForm(
    {  basePrice:product.basePrice , mrp:product.mrp, quantity:product.quantity

    }
  )
  setIsEditOpen(true)
}

  return (
   
    <div >
       <SidebarProvider>
      <Sidebar />
    <main className="w-full">
  <SidebarTrigger />
    <div className="pb-4 flex justify-between pr-4">  
      <h1 className=" p-5 text-3xl">Products</h1>
      <Adminormanagerroutes> 
  <Button onClick={triggerAdd} variant={"outline"} className="p-7">
    Add Product 
  </Button>
  </Adminormanagerroutes>
  </div>
  { loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner className="w-10 h-10 animate-spin text-zinc-500" />
          </div>):( 
          <DataTable  columns={columnsproducts(triggerEdit,deleteProduct)} data={product}/>)

  }
 <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
      
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a new Product to your inventory</DialogTitle>
            <DialogDescription>
              Add a new product by filling all the details and then click on save
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input value={addForm.name} onChange={(e)=> setaddForm({...addForm, name:e.target.value}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Sku</Label>
              <Input value={addForm.sku} onChange={(e)=> setaddForm({...addForm,  sku:e.target.value}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Baseprice</Label>
              <Input value={addForm.basePrice} onChange={(e)=> setaddForm({...addForm, basePrice:Number(e.target.value)}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Mrp</Label>
              <Input value={addForm.mrp} onChange={(e)=> setaddForm({...addForm, mrp:Number(e.target.value)}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Quantity</Label>
              <Input value={addForm.quantity} onChange={(e)=> setaddForm({...addForm, quantity:Number(e.target.value)}) } />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={addNewProduct} >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
     <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Edit the selected product by filling all the details and then click on save
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Baseprice</Label>
              <Input value={editForm.basePrice} onChange={(e)=> setEditForm({...editForm, basePrice:Number(e.target.value)}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Mrp</Label>
              <Input value={editForm.mrp} onChange={(e)=> setEditForm({...editForm, mrp:Number(e.target.value)}) } />
            </Field>
            <Field>
              <Label htmlFor="name-1">Quantity</Label>
              <Input value={editForm.quantity} onChange={(e)=> setEditForm({...editForm, quantity:Number(e.target.value)}) } />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>{productToEdit && editProduct(productToEdit)}} >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
</main>
    </SidebarProvider>
    </div>
  )
}

export default Products
