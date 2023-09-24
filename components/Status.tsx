"use client"
import { DbAccessRest } from '@/helper/access-database';
import { useComputeStatus } from '@/hooks/use-status'
import { db } from '@/lib/redis';
import React, { useState } from 'react'
import { useEffect } from 'react'

interface Ins {
  id: string,
  name:  string,
  userId: string,
  fingerprint: string,
  status: string,
  zone: string
  creationTimestamp: string
  networkInterfacesName: string,
  natIp: string,
  networkInterfacesAccessName: string,
  diskType: string,
  diskMode:string,
  diskSize:string,
  architecture: string,
  cpuPlatform: string,
  deletionProtection: boolean
}

interface PageProps{
  userId : string,
  createdAt : string,
  updatedAt : string,
  userName : string,
  instances : Ins[]
};
interface PagePropss{
  data : PageProps
}
function Status({data} : PagePropss) {
      //const status =useComputeStatus();
     const [s, sS] = useState<String>("initiating..");
     
     
     useEffect(()=>{
       const timeid = setInterval(async ()=>{
         const d = (await DbAccessRest("get" , "user:bivu:ins:node1")) as string
         console.log(d);
         
        sS(d)
        if(d === "Completed"){
          clearInterval(timeid)
        }
      
      
       
       },1200)

       return ()=>{
        clearInterval(timeid);
       }
     },[])
  return (
    <div className="flex flex-col mx-auto">
      {data && <div>
             {data.instances.map((item)=>(
              <div className="mt-[8px]" key={item.id}>
                <p>{item.name}</p>
              </div>
             ))}
        </div>}
    </div>
  )
  }

export default Status