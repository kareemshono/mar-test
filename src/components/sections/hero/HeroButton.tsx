import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  text:string;
  color:string;
  className?:string;
  icon:React.ReactNode;
  onClick:() => void;
  href?:string
}

const HeroButton = (props: Props ) => {
  return (<>
   { props.href ? 
   <Link target="_target" href={props.href}><Button onClick={props.onClick} className={cn(`py-4 flex items-center font-semibold gap-1 w-35 `, props.className)}>
      {props.text}{props.icon} 
    </Button>
  </Link> :
  <Button onClick={props.onClick} className={cn(`py-4 flex items-center font-semibold gap-1 w-35 `, props.className)}>
      {props.text}{props.icon} 
    </Button>}</>
  )
    
}

export default HeroButton