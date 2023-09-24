
import TabsSection from "@/components/compute/TabsSection";
import Upper from "@/components/compute/Upper";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async  function page() {
  const user = await currentUser();

  const computeins = await prismadb.computeIns.findUnique({
    where :{
      userId : user?.id,
    },
    include : {
      instances:{
       where:{
        userId : user?.id
       }
      }
    }
  })
  //@ts-ignore
  console.log(computeins);
  return (
    <div className = "flex flex-col space-y-2 ">
      <Upper/>
      {/* @ts-ignore */}
	  <TabsSection data={computeins} />
    </div>
  );
}

export default page;
