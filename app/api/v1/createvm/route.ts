import { NextResponse } from "next/server";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/redis";
const ap = process.env.COMPUTE_AUTH_TOKEN!;

  
export   async function POST(request: Request)
{
    const user = await currentUser();
    if (!user || !user.firstName || !user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
   // console.log(user?.id);
    
   const body = await request.json();
   const reqq = {...body,userid:user.id,userFirstname:user.firstName}
   //console.log({...body,userid:user.id,userFirstname:user.firstName});
   //console.log(reqq);
   
   try{
    await db.set("user:bivu:ins:node1","Running")
    const response = await axios.post("http://localhost:8080/api/v1/createvm" , reqq , {
        headers : {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + ap
        }
    }); 
    await db.set("user:bivu:ins:node1","Completed")

    console.log((await response).data)
    return new NextResponse("ok" , {status:200})
   }catch(err){
    return new NextResponse("INTERNAL_ERROR" ,{status:400})
   }
  // return new NextResponse(body)
}