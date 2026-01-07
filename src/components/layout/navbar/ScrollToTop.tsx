"use client"
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {

   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
     
  return (
     <div onClick={scrollToTop} className="bg-gradient-to-r  from-purple-600 via-purple-500 shadow-md shadow-purple-500/50 to-purple-600 fixed z-50 bottom-5 right-5  lg:right-10  rtl:right-auto rtl:left-10 p-3 rounded-full">
        <ArrowUp className="w-5 h-5 animate-bounce  text-white" />
    </div>
  )
}

export default ScrollToTop