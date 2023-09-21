
import TabsSection from "@/components/compute/TabsSection";
import Upper from "@/components/compute/Upper";
import prismadb from "@/lib/prismadb";
import React from "react";

async  function page() {


  const computeins = await prismadb.computeIns.findUnique({
    where :{
      userId : "2132352ds"
    },
    include : {
      instances:{
       where:{
        userId : "2132352ds"
       }
      }
    }
  })
  // @ts-ignore
  console.log(computeins);
  return (
    <div className = "flex flex-col space-y-2 ">
      <Upper/>
	  <TabsSection/>
    </div>
  );
}

export default page;
