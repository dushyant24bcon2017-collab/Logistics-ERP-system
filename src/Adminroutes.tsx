import { jwtDecode } from "jwt-decode";
import React from 'react'

const Adminroutes = ({ children }: { children: React.ReactNode }) => {
   
    interface DecodedToken{
        role: string;

    }
  const token = localStorage.getItem('token')
  if(token){
    try {
        const decodedToken = jwtDecode<DecodedToken>(token)
        if(decodedToken.role==="ADMIN"){
            return children;
        }
        else return null;
    } catch (error) {
        console.error("token not found",error)
        return null;
    }
  }
  return null; 
}

export default Adminroutes
