import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../servicess/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors=[
        "#6A0DAD", "#003B5C", "#C5A100", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#003366 ", "#3371FF", "#A7C7E7  ", "#33A1FF", "#FF5733",
        "#5733FF", "#2C6E49", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState();
    const {resumeId}=useParams();
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated')
        })
    }

  return (
    <Popover>
  <PopoverTrigger asChild>
  <Button variant="outline" size="sm" 
          className="flex gap-2 bg-gray-200 text-black" > <LayoutGrid/> Theme</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-3'>
        {colors.map((item,index)=>(
            <div 
            onClick={()=>onColorSelect(item)}
            className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor==item&&'border border-black'}
             `}
            style={{
                background:item
            }}>

            </div>
        ))}
    </div>
  </PopoverContent>
</Popover>
  )
}

export default ThemeColor