"use client";
import { DbAccessRest } from "@/helper/access-database";
import { useComputeStatus } from "@/hooks/use-status";
import { db } from "@/lib/redis";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Copy, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
interface Ins {
  id: string;
  name: string;
  userId: string;
  fingerprint: string;
  status: string;
  zone: string;
  creationTimestamp: string;
  networkInterfacesName: string;
  natIp: string;
  networkInterfacesAccessName: string;
  diskType: string;
  diskMode: string;
  diskSize: string;
  architecture: string;
  cpuPlatform: string;
  deletionProtection: boolean;
}

interface PageProps {
  userId: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  instances: Ins[];
}
interface PagePropss {
  data: PageProps;
  user :string
}
function dateFormat(date: string): string {
  const new_date = new Date(date).toLocaleDateString();
  return new_date;
}

function refreshPage(){
  location.reload();
}

function Status({ data , user }: PagePropss) {
  const status =useComputeStatus();
  const [s, sS] = useState<String>(status.reqStatus);
  const router = useRouter();
  useEffect(() => {
    const timeid = setInterval(async () => {
     const d = (await DbAccessRest("get", `user:${user}:ins`)) as string;
      console.log(d);

     sS(d);
      if (d === "Completed") {
        clearInterval(timeid);
        status.setRequestStatus("")
       
      }
    }, 1200);

    return () => {
      clearInterval(timeid);
    };
  }, []);
  return (
    <div className="flex flex-col max-w-7xl mx-auto overflow-x-auto">
      {s  && s ==="Running" && <div className="max-w-6xl mx-auto p-4  w-full mt-8 bg-gray-600/30 animate-pulse"> 
                   {s} 
        </div>}
        <div className="mt-5 ml-10 md:ml-0"> 
          <Button  onClick={refreshPage} className = "p-4 text-center ">
            Refresh
          <RotateCw className="h-4 w-4 ml-1" />
          </Button>
        </div>
      {data && (
        <div className="max-w-7xl mt-5  mx-auto">
          <Table>
            <TableCaption>A list of your recent active vm</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Id</TableHead>
                {/* <TableHead>Name</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead className="text-center w-[240px] ">Zone</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Architecture</TableHead>
                <TableHead className="">DiskSize</TableHead>
                <TableHead className=" w-[100px] text-center">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.instances.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium w-[200px] hover:underline hover:cursor-pointer">
                    <div onClick={ ()=> router.push(`/compute/instance?id=${item.id}&user=${data.userId}`) }>
                    {item.id}
                    </div>
                   
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-black ",
                      item.status === "RUNNING"
                        ? "text-green-600"
                        : "text-red-400"
                    )}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell className="text-center w-[200px] ">
                    {item.zone}
                  </TableCell>
                  <TableCell className="text-center">
                    {dateFormat(item.creationTimestamp)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.architecture}
                  </TableCell>
                  <TableCell className="text-center">{item.diskSize}</TableCell>
                  <TableCell className="text-left mt-5 md:mt-0 flex items-center justify-center hover:cursor-pointer space-x-2 group">
                    {item.natIp}
                    <Copy className="h-4 w-4 ml-2 opacity-0  group-hover:opacity-95" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Status;
