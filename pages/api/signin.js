
import { API_URL } from "../../config";

export default async (req,res) =>{

       

        if(req.method === "POST"){
            const {identifier, password} = req.body;   
            

            const strapiRes = await fetch(`http://localhost:1337/api/auth/local`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    identifier, 
                    password
                })
            })

            const data = await strapiRes.json()
            res.status(200).json(data)

            
        }else{
            res.setHeader("Allow",['POST'])
            res.status(405).json({message: `Method ${req.method} not allowed`})
        }


}


//     if(req.method === "POST"){
//         const {identifier, password} = req.body;        
//         const strapiRes = await fetch(`${API_URL}/auth/local`, {
//             method:"POST",
//             headers:{
//                 "Content-Type" : "application/json"
//             },
//             body : JSON.stringify({
//                 identifier,
//                 password
//             })
//         })

//         const data = await strapiRes.json()

//         if(strapiRes.ok){
//             res.status(200).json({user:data.user})
//         }else{
//             res.status(data.statusCode).json({message: data.message[0].message[0].message})
//         }
//     }else{
//         res.setHeader("Allow",['POST'])
//         res.status(405).json({message: `Method ${req.method} not allowed XXXX`})
//     }
// }