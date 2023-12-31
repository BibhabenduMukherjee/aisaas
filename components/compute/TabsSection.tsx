"use client"
import React from "react";

import { ButtonGroup, Button } from "@material-tailwind/react";
import { useCreateCompute, useStatusCompute } from "@/hooks/use-compute";
import { cn } from "@/lib/utils";
import CreateComputeForm from "./CreateComputeForm";
import Status from "../Status";
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
  user : string
}

const  TabsSection = ({data , user} : PagePropss) => {
    //console.log(user);
    
    const CreateCompute = useCreateCompute()
    const StatusCompute = useStatusCompute()

    function handleComputeState(){
        // close the status page
        StatusCompute.onCloseStatus();
        // on the compute page
        CreateCompute.onOpenCreate();
    }
    function handleStatusState(){
         // close the compute page
         CreateCompute.onCloseCreate();
         // on the status page
         StatusCompute.onOpenStatus();
         
    }
  return (
    <div>
      <ButtonGroup className="h-[50px] max-w-5xl mx-auto  grid grid-cols-2 gap-1 items-center "  >
        <Button onClick={handleComputeState} 
         className= {cn("text-black   dark:text-white/60  dark:bg-black/70 p-2 text-lg", CreateCompute.isOpenCreate && " dark:bg-white/80 bg-black/80 text-white/80  dark:text-black/70 " )} >Create Instances</Button>
        <Button onClick={handleStatusState}   
        className= {cn("dark:bg-black/70    text-black  dark:text-white/60 p-2 text-lg" ,StatusCompute.isOpenStatus&& " dark:bg-white/80  bg-black/80 text-white/80   dark:text-black/70 " )} >Status</Button>
        
      </ButtonGroup>

      <div className = "flex flex-col">

      {CreateCompute.isOpenCreate && <>
         <div className = "">
         <CreateComputeForm/>
         </div>
        
      </>}

      {StatusCompute.isOpenStatus && <>
     
        <div className = " ">
         <Status  data ={data} user = {user} />
         </div>
        
      </>}
      </div>

    
       
      

    </div>
  );
}

export default TabsSection;
