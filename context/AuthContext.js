import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState( { name : "rsd" } )
    const [error,setError] = useState(null)

    const signup = async (user) =>{
        console.log(user)
    }

    const signin = async ({email:identifier,password}) =>{
        console.log({identifier, password})
    }

    const signout = async (user) =>{
        console.log(user)
    }

    const checkUserLoggedIn = async (user) =>{
        console.log('check')
    }

    return(
        <AuthContext.Provider value={{user,error, signin, signup, signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;