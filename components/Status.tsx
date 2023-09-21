"use client"
import { DbAccessRest } from '@/helper/access-database';
import { useComputeStatus } from '@/hooks/use-status'
import { db } from '@/lib/redis';
import React, { useState } from 'react'
import { useEffect } from 'react'
function Status() {
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
      {s}
    </div>
  )
  }

export default Status