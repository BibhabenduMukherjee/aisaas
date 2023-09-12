import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { ComputeInsSchema } from '@/Schema/ComputeIns'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'




function CreateComputeForm() {
 const form = useForm<z.infer<typeof ComputeInsSchema>>(
    {
        resolver:zodResolver(ComputeInsSchema),
        defaultValues: {
            name : "Instance1",
            description : ""
        }
    }
 )


 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (values: z.infer<typeof ComputeInsSchema>) => {
   
 };
  return (
    <div className=" flex flex-col mx-auto ">
        <p className="mb-[10px] text-2xl mt-[30px] text-center ">Create an Instance</p>
       <Form {...form}>
         <form onSubmit =  {form.handleSubmit(onSubmit)}></form>
              <div className = " p-4 mt-[22px]  grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Input disabled={isLoading} autoComplete='off'  placeholder="CEO & Founder of Tesla, SpaceX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div> 
       </Form>
    </div>
  )
}

export default CreateComputeForm