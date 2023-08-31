import Skeleton from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div>
        <div className = "w-full h-[40px]"> 

        <Skeleton className = " w-full h-[50px] bg-gray-600/10"/>
        </div>
        
        <div className = " mt-[35px] max-w-4xl mx-auto h-[40px]"> 

       <Skeleton className = " max-w-5xl h-[40px] bg-gray-600/10"/>
</div>

    <div className = "flex max-w-4xl space-x-2 mx-auto mt-[10px]">
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    <Skeleton className = " w-[94px] h-[44px] bg-gray-600/10"/>
    </div>

    <div className = "mt-[10px] max-w-4xl mx-auto">
    <div>
    <Skeleton className = " max-w-4xl h-screen bg-gray-600/10"/>
    </div>
    </div>
         
    </div>
  )
}

export default loading