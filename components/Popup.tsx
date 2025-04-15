import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Title ={
    title: string;
    icon : React.ReactNode
}
export default function PopoverDemo({title,icon}: Title) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-none shadow-none  hover:bg-transparent cursor-pointer">{icon}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none border-none">
      <button className=" cursor-pointer  px-4 py-1  bg-gray-300  rounded-full hover:bg-gray-400 hover:text-white">{title}</button>

      </PopoverContent>
    </Popover>
  )
}
