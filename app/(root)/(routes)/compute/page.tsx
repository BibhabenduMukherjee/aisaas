
import TabsSection from "@/components/compute/TabsSection";
import Upper from "@/components/compute/Upper";
import React from "react";

function page() {
  //console.log(process.env.NEW_UPSTASH_REDIS_REST_URL_EXE!);
  return (
    <div className = "flex flex-col space-y-2 ">
      <Upper/>
	  <TabsSection/>
    </div>
  );
}

export default page;
