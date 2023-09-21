import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { ComputeInsSchema } from '@/Schema/ComputeIns'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Server, Wand2 } from "lucide-react";
import axios from 'axios'
import { useComputeStatus } from '@/hooks/use-status'

const zones = [
  {
    title : "Mumbai-1",
    name : "asia-south1-a",
  },
  {
    title : "Mumbai-2",
    name : "asia-south1-b",
  },
  {
    title : "Delhi-1",
    name : "asia-south2-a",
  },
  {
    title : "Delhi-2",
    name : "asia-south2-b",
  }
]

const sourceImage = [
  {
    title : "Debian GNU/Linux 11 ARC X86/64",
    name : "projects/debian-cloud/global/images/debian-11-bullseye-v20230814"
  },
  {
    title : "Ubuntu 20.04 LTS Focal X86/64",
    name : "projects/ubuntu-os-cloud/global/images/ubuntu-2004-focal-v20230817",
  },
 

]
const Ssd = [
  {
    title : "40 gb",
    name : "40",
  },
  {
    title: "60 gb",
    name : "60",
  },
  {
    title : "100 gb",
    name : "100"
  }
]
const machineTypes = [
  {
    title : "Standard (1cpu)",
    name : "n1-standard-1",
  },
  {
    title : "Standard (2cpu)",
    name : "n2-standard-2",
  },
  {
    title : "Balanced (4cpu)",
    name : "e2-standard-4",
  },
  {
    title : "Compute Optimised (8cpu)",
    name : "e1-standard-8",
  },
 
]

function CreateComputeForm() {
  const status = useComputeStatus()
 const form = useForm<z.infer<typeof ComputeInsSchema>>(
    {
        resolver:zodResolver(ComputeInsSchema),
        defaultValues: {
            name : "Instance1",
            description : "",
            zone: undefined,
            machineType : undefined,
            sourceImage:undefined,
            ssd : undefined,
        }
    }
 )


 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof ComputeInsSchema>) => {
  try{
   //status.setRequestStatus("Running...")
  
    const response =  await axios.post("api/v1/createvm",values); // http://localhost:8080/api/v1/fake  --> api/v1/createvm
   console.log(response.data)
   // status.setRequestStatus("Completed")
  }catch(err){
    console.log(err);
    
  }
  //console.log(values)
   
 };
  return (
    <div className=" flex flex-col mx-auto ">
        <p className="mb-[10px] text-2xl mt-[30px] text-center ">Create an Instance</p>
       <Form {...form}>
         <form className="p-4 mt-4"  onSubmit =  {form.handleSubmit(onSubmit)}>
         <div className = " p-4 mt-[22px]  grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-1  ">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Elon Musk" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} autoComplete='off'  placeholder="Compute Instance" {...field} />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {zones.map((z) => (
                        <SelectItem key={z.name} value={z.name}>{z.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the Location 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
             <FormField
              control={form.control}
              name="machineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MachineType</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a MachineType" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {machineTypes.map((z) => (
                        <SelectItem key={z.name} value={z.name}>{z.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the MachineType 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />

<FormField
              control={form.control}
              name="sourceImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SourceImage</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a SourceImage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sourceImage.map((z) => (
                        <SelectItem key={z.name} value={z.name}>{z.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the SourceImage
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />

<FormField
              control={form.control}
              name="ssd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSD</FormLabel>
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue defaultValue={field.value} placeholder="Select a SSD" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Ssd.map((z) => (
                        <SelectItem key={z.name} value={z.name}>{z.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the SSD
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div> 

            <div className="w-full flex h-[200px]  justify-center">
            <Button className="mt-6"   size="lg" disabled={isLoading}>
              { "Create Instance"}
              <Server className="w-4 h-4 ml-2" />
            </Button>
          </div>
         </form>
             
       </Form>
       <div className = ""></div>
    </div>
  )
}

export default CreateComputeForm