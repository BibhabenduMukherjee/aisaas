
import TabsSection from "@/components/compute/TabsSection";
import Upper from "@/components/compute/Upper";
import React from "react";

function page() {
  return (
    <div className = "flex flex-col space-y-2 ">
      <Upper/>
	  <TabsSection/>
    </div>
  );
}

export default page;
