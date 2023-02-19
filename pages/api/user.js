import { API_URL } from "../../config";
import cookie from 'cookie'
export default async (req,res) =>{

       

        
            // res.status(200).json({sukse: req.headers.cookie})
        if(req.method === "GET"){
            
                if(!req.headers.cookie){
                    res.status(403).json({message : "not authorized"})
                    return
                }

                const {token} = cookie.parse(req.headers.cookie)

                
                // console.log("token", token)

                const strapiRes = await fetch(`http://localhost:1337/api/users/me`,{
                    method : "GET", 
                    headers :{
                        Authorization : `Bearer ${token}`
                    }
                })

                const user = await strapiRes.json()
                
                if (strapiRes.ok){
                    res.status(200).json({user})
                }else{
                    res.status(403).json({message : "User Forbidden"})
                }

                // res.status(200).json({ur: strapiRes.status, token : token, user:user})
                // if(strapiRes.status === 400){
                //     res.status(208).json({errorx : user.error.status});
                // }else{
                //     res.status(403).json({errorx : user.error.status, auth : "unauthorized"});
                // }
            
                // if(strapiRes.status === 400){
                //     res.status(400).json({errorx : user.error.status});
                //     // SUKSES
                // }else if(strapiRes.status === 401){
                //     res.status(401).json({errorx : user.error.status, auth : "unauthorized"});
                //     // GAGAL
                // }

        }else{
            res.setHeader("Allow",['POST'])
            res.status(405).json({message: `Method ${req.method} not allowed`})
        }


}

