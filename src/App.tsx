
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
const App = () => {
const router = createBrowserRouter([
  {
    path:'/',
    element:<AuthPage/>
  },
  {
    path:'/dashboard',
    element : <ProtectedRoute>
            <Dashboard/>
    </ProtectedRoute>

  },
  {
     path:'/products',
    element : <ProtectedRoute>
            <Products/>
    </ProtectedRoute>
  },
  {
     path:'/orders',
    element : <ProtectedRoute>
            <Orders/>
    </ProtectedRoute>
  },
  {
     path:'/customers',
    element : <ProtectedRoute>
            <Customers/>
    </ProtectedRoute>
  },
  {
     path:'/Addemployee',
    element : <ProtectedRoute>
            <Employees />
    </ProtectedRoute>
  },
  
])
  return <RouterProvider router={router}/>
}

export default App
