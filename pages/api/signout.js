import { API_URL } from "../../config";
import cookie from 'cookie'
export default async (req,res) =>{

       

        
            // res.status(200).json({sukse: req.headers.cookie})
        if(req.method === "POST"){
            
            res.setHeader("Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                secure : process.env.NODE_ENV !== "development",
                expires : new Date(0),
                sameSite: 'strict',
                path: "/"
            }
            ))

            res.status(200).json({message : "user signout"})
            console.log("SIGNOUT")

        }else{
            res.setHeader("Allow",['POST'])
            res.status(405).json({message: `Method ${req.method} not allowed`})
        }


}

