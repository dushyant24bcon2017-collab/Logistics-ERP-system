import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Adminormanagerroutes from "@/Adminormanagerroutes"
const sidebar = () => {
  const navigate = useNavigate()
  //token
  
  interface DecodedToken{
    role: string
  }
  const token = localStorage.getItem('token')
const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;
const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };
  
  return <>
  <Sidebar>
      <SidebarHeader className="text-3xl">
        Welcome,{decodedToken?.role} 
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button  variant="outline" onClick={()=> navigate('/dashboard')}>Dashboard</Button>
        </SidebarGroup>
        <SidebarGroup>
          <Button variant="outline" onClick={()=> navigate('/products')}>Products</Button>
        </SidebarGroup>
        <SidebarGroup>
          <Button variant="outline" onClick={()=> navigate('/orders')}>Orders</Button>
        </SidebarGroup>
        <SidebarGroup>
          <Button variant="outline" onClick={()=> navigate('/customers')}>Customers</Button>
        </SidebarGroup>
        <Adminormanagerroutes> 
         <SidebarGroup>
          <Button variant="outline" onClick={()=> navigate('/addEmployee')}>Add Employee</Button>
        </SidebarGroup>
        </Adminormanagerroutes>
      </SidebarContent>
<SidebarFooter>
  <div className="mt-auto p-4 border-t border-zinc-800">
        <Button 
          variant="destructive" 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleLogout}
        >
          <span>Logout</span>
        </Button>
      </div>
</SidebarFooter>
    </Sidebar>
  </>

    
  
}

export default sidebar
