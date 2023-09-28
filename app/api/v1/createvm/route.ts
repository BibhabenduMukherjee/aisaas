import { NextResponse } from "next/server";
import axios from "axios";
import * as z from "zod";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/redis";
import prismadb from "@/lib/prismadb";
import { ComputeInsSchema } from "@/Schema/ComputeIns";

async function checkName(name: string) {
  const user = await currentUser();
  const exi = await prismadb.computeIns.findUnique({
    where: {
      userId: user?.id,
    },
    include: {
      instances: {
        where: {
          name: name,
        },
      },
    },
  });

  return exi;
}

const ExtendedNameParser = ComputeInsSchema.extend({
  name: ComputeInsSchema.shape.name.refine(
    async (name) => {
      const isTaken = await checkName(name);

      if (isTaken?.instances.length === 0) {
        return true;
      }
    },
    {
      message: "Name is Already taken",
    }
  ),
});

const ap = process.env.COMPUTE_AUTH_TOKEN!;

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user || !user.firstName || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: z.infer<typeof ComputeInsSchema> = await request.json();

  const reqq = { ...body, userid: user.id, userFirstname: user.firstName };
  //console.log({...body,userid:user.id,userFirstname:user.firstName});
  //console.log(reqq);
  let response
  try {
    await db.set(`user:${user.id}:ins`, "Running");


      try{
         response = await axios.post(
            "https://ai-com-backend-1-b7n2k6yp7a-uc.a.run.app/api/v1/createvm",
            reqq,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ap,
              },
            }
          );
      }catch(e){
        
        console.log(e);
        return new NextResponse("INTERNAL_ERROR" , {status : 400})
      }

    
    await db.set(`user:${user.id}:ins`, "Completed");
    const response_data: ComputeIns = response?.data;

    // check the current user have any instances already?
    try {
      const isHavingIns = await prismadb.computeIns.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (isHavingIns) {
        console.log("update take place");

        // push a new instance to the current records "instances"[] field
        await prismadb.computeIns.update({
          where: {
            userId: user.id,
          },
          data: {
            instances: {
              create: {
                id: response_data.id,
                name: response_data.name,
                fingerprint: response_data.fingerprint,
                status: response_data.status,
                zone: body.zone,
                creationTimestamp: response_data.creationTimestamp,
                networkInterfacesName: response_data.networkInterfacesName,
                natIp:
                  response_data.networkInterfacesNameAccessConfigsList[0].natIP,
                networkInterfacesAccessName:
                  response_data.networkInterfacesNameAccessConfigsList[0].name,
                diskType: response_data.disks[0].type,
                diskMode: response_data.disks[0].mode,
                diskSize: response_data.disks[0].diskSizeGb,
                architecture: response_data.disks[0].architecture,
                cpuPlatform: response_data.cpuPlatform,
                deletionProtection: response_data.deletionProtection,
              },
            },
          },
        });
      } else {
        await prismadb.computeIns.create({
          data: {
            userId: user.id,
            userName: user.firstName + " " + user.lastName,
            instances: {
              create: {
                id: response_data.id,
                name: response_data.name,
                fingerprint: response_data.fingerprint,
                status: response_data.status,
                zone: body.zone,
                creationTimestamp: response_data.creationTimestamp,
                networkInterfacesName: response_data.networkInterfacesName,
                natIp:
                  response_data.networkInterfacesNameAccessConfigsList[0].natIP,
                networkInterfacesAccessName:
                  response_data.networkInterfacesNameAccessConfigsList[0].name,
                diskType: response_data.disks[0].type,
                diskMode: response_data.disks[0].mode,
                diskSize: response_data.disks[0].diskSizeGb,
                architecture: response_data.disks[0].architecture,
                cpuPlatform: response_data.cpuPlatform,
                deletionProtection: response_data.deletionProtection,
              },
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
    }

    return new NextResponse("saved_database", { status: 200 });
  } catch (err) {
    return new NextResponse("INTERNAL_ERROR", { status: 400 });
  }
  // return new NextResponse(body)
}
