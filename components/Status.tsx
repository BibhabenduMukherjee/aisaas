"use client"
import { DbAccessRest } from '@/helper/access-database';
import { useComputeStatus } from '@/hooks/use-status'
import { db } from '@/lib/redis';
import React, { useState } from 'react'
import { useEffect } from 'react'
function Status() {
     const [s, sS] = useState<String>("");
     const status =useComputeStatus();
     
     useEffect(()=>{
       const timeid = setInterval(async ()=>{
      // const d = (await DbAccessRest("get" , "user:bivu:ins:node")) 
      //   console.log(d)
      // const d = await db.get("user:bivu:ins:node")
      // console.log(d);
      
      
      
       
       },1000)

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