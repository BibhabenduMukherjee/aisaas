import Skeleton from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div>
        <div className = "max-w-4xl mt-[10px] mx-auto h-[40px]"> 

<Skeleton className = " max-w-4xl h-[60px] bg-gray-600/10"/>
</div>
    </div>
  )
}

export default loading