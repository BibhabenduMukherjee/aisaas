import React from 'react'
import Skeleton from '@/components/ui/skeleton'
function Loading() {
  return (
    <div className = "h-full p-4 space-y-2 max-w-3xl mx-auto">
        <div className = "space-y-8 pb-10">
            <div className='space-y-2 w-full col-span-2'>
                <Skeleton className = " max-w-3xl h-[52px] bg-gray-600 "/>
            </div>
            <div className ="flex flex-col items-center justify-center space-y-4 col-span-2">
               <Skeleton className = "w-[200px] h-[200px] bg-gray-600"/>
            </div>

            <div className= "grid grid-cols-1 gap-4">
                <div className= "col-span-1">
                    <Skeleton className= " max-w-full h-[220px] bg-gray-600"/>
                </div>

                <div className= "col-span-1 mt-[10px]">
                    <Skeleton className= " max-w-full h-[230px] bg-gray-600"/>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Loading