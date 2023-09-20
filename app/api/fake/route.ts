import {NextResponse} from "next/server";
import { db} from "@/lib/redis";
import axios from "axios";

export async function GET(request: Request)
{   

    try{
        try{
            await db.set("user:bivu:ins:node" , "running")
        }catch(err){
            console.log(err);
            return new NextResponse("INTERNAL_ERROR" , {status : 400})
            
        }
       // await db.sadd("user:bivu:ins:node" , "running")
        const res = await axios.get("http://localhost:8080/api/v1/fake")
        await db.set("user:bivu:ins:node" , "completed")
        console.log("added");
        
        return new NextResponse("ok" , {status : 200})
    }catch(err){
        return new NextResponse("INTERNAL_ERROR" , {status : 400})
    }
  
}