import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { NEXT_URL } from "../config";


const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const [error,setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const checkUserLoggedIn = async (user) =>{
            console.log('check')
    
            const res = await fetch(`${NEXT_URL}/api/user`)
            const data = await res.json()
            
            if(res.ok){
                setUser(data.user)
            }else{
                setUser(null)
            }
        }
        checkUserLoggedIn()
    }
    
    
    ,[])
    
    const signup = async ({userName : username,email,password}) =>{
        const res = await fetch(`http://localhost:3000/api/signup`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email,
                username,
                password 
            })
        })

        // const res = await fetch(`http://localhost:3000/api/signup`,{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json"
        //     },
        //     body: JSON.stringify({
        //         email : "1@gmail.com",
        //         username : "aaxxx",
        //         password : "123456"
        //     })
        // })
   
        const data = await res.json()
        // setError("XXXX")
        console.log("execute", data)
        console.log("res", res.status)
        if (res.status === 200){
            setUser(data.user)
            console.log("sukses login")
            router.push('/auth/dashboard')
        }else{
            console.log("gagal login")
            setError("error bang")
        }
    }

    const signin = async ({email:identifier,password}) =>{
        console.log({identifier, password})
        console.log("NGERRUUUNNNNNNNNNNN")
        const res = await fetch(`http://localhost:3000/api/signin`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                identifier, 
                password
            })
        })

        const data = await res.json()
        // setError("XXXX")
        console.log("execute", res.status)

        if (res.status !== 400){
            setUser(data.user)
            console.log("sukses login")
            router.push('/auth/dashboard')
        }else{
            console.log("gagal login")
            setError("error bang")
            // setError(data.error.message)
        }
        // // console.log("data", data)
        // // console.log(res)
        // if(res.ok){
        //     // setUser(data.user)
        //     console.log("sukses login")
        //     // setError(data.user)
        // }else{
        //     console.log("gagal login")
        //     // setError(data.error.message)
        //     setError("AAAA")
        //     // setError(null)   
        // }
        
    }

    

    const signout = async () =>{
        console.log("signout")
        const res = await fetch(`${NEXT_URL}/api/signout`,{
            method: "POST"
        })

        if(res.ok){
            setUser(null)
            router.push("/")
        }
    }

    

    return(
        <AuthContext.Provider value={{user,error, signin, signup, signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;