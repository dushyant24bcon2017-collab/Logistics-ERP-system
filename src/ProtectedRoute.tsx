import { Navigate } from "react-router-dom"
import React from 'react';

import { Spinner } from "./components/ui/spinner";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {user,loading} = useContext(AuthContext)

  
  if (loading) {
    <div className="flex flex-col items-center gap-4">
     
        <Spinner data-icon="inline-start" />
        Loading...
   
      </div>
  }
if (!user) {
    return <Navigate to='/' replace/>;
  }
  return children;
}

export default ProtectedRoute
