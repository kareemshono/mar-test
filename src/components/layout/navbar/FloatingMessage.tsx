"use client"
import { MessageCircle } from "lucide-react"


const FloatingMessage = () => {
  return (
    <div className="bg-gradient-to-r  from-rose-500 shadow-md shadow-rose-500/50 via-rose-500/80 to-rose-500 fixed z-50 bottom-20 right-5  lg:right-10 rtl:right-auto rtl:left-10 p-3 rounded-full">
        <MessageCircle className="w-5 h-5  text-white" />
    </div>
  )
}


export default FloatingMessage;