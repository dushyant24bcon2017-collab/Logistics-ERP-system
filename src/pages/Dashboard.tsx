import Sidebar from "../elements/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Orderwidgets from "@/elements/Orderwidgets"
import Productswidgets from "@/elements/Productswidgets"
import Customerwidgets from "@/elements/Customerwidgets"
import Ordergraph from "@/elements/Ordergraph"
import Productpiechart from "@/elements/Productpiechart"

const Dashboard = () => {
  return (
    <> 
    <div >
       <SidebarProvider>
      <Sidebar />
    <main className="w-full">
  <SidebarTrigger />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-37">
    <Orderwidgets />
    <Productswidgets />
    <Customerwidgets />
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10 mt-6 pr-4">
      <div className="md:col-span-2">
          <Ordergraph />
      </div>
      <div className="md:col-span-1 justify-self-end w-full">
          <Productpiechart />
      </div>
  </div>

</main>
    </SidebarProvider>
    </div>
    
    </>
  )
}

export default Dashboard
