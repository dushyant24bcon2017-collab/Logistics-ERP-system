import { useState } from "react"
import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
const AuthPage = () => {
    const [isLogin , setIsLogin] = useState(true)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name, setName] = useState('')
    const [tenantName, setTenantName] = useState('')
    const navigate = useNavigate();

    const submitHandler = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        try {
            const url =isLogin 
        ? "http://localhost:5000/login" 
        : "http://localhost:5000/signup"
        const payload = isLogin ? 
        { email:email, password:password}:
        {
          tenantName: tenantName, 
          userName: name,  
          email: email, 
          password: password
        }
        const response = await fetch(url ,{
          method:"POST",
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify(payload)

        })
        const data = await response.json()
       if(response.ok) { 
          
          console.log("Success", data)
          alert(isLogin ? "Login successful" : "Account created successfully")
          if(data.token) {
            localStorage.setItem("token", data.token) // VIP band pehna do
          }
          navigate('/dashboard');
        } else {
          console.error("Backend Error:", data.message)
          alert(data.message || "Authentication failed")
        }
        
        } catch (error) {
            console.error(error)
            alert("server error")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
      
      <Card className="w-full max-w-xl bg-neutral-900 border-neutral-800 text-white">
        
      
        <CardHeader>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-title" : "signup-title"}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.18 }}
            >
              <CardTitle className="text-2xl font-bold tracking-tight">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </CardTitle>
              <CardDescription className="text-neutral-400 mt-1">
                {isLogin 
                  ? "Enter your credentials to access your dashboard." 
                  : "Sign up to start managing your inventory and shipments."}
              </CardDescription>
            </motion.div>
          </AnimatePresence>
        </CardHeader>
        
       
        <CardContent className="space-y-4">
          
          {!isLogin && (
            <> 
            <div className="space-y-2">
                <Label htmlFor="tenantName">Company Name</Label>
                <Input 
                  id="tenantName" 
                  placeholder="xyzpvtltd" 
                  className="bg-neutral-800 border-neutral-700"
                  value={tenantName} 
                  onChange={(e) => setTenantName(e.target.value)}
                />
              </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Your Name" 
                className="bg-neutral-800 border-neutral-700" 
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m.rathore@example.com" 
              className="bg-neutral-800 border-neutral-700" 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="bg-neutral-800 border-neutral-700" 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
        </CardContent>
        
        
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={submitHandler} className="w-full font-semibold">
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
          
        
          <div className="text-sm text-neutral-300 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-white hover:underline font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </CardFooter>

      </Card>
      
    </div>
  )
}

export default AuthPage
