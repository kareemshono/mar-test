import DynamicIcon from "@/components/icons/DynamicIcon";
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import {motion} from "framer-motion"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import Link from "next/link";

type Props = {
    icon:keyof typeof dynamicIconImports,
    title:string;
    desc:string;
     link:string;
    label:string;
    color:string;
    textColor?: string,
    className:string;
}

const ContactCard = (props: Props) => {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card className="p-4 border-slate-200/40 dark:bg-slate-900 hover:border-purple-500 transition-all group">
        <div className="flex items-start gap-5">
          <motion.div
            className="w-14 h-14 rounded-xl flex text-white -rotate-5 items-center justify-center flex-shrink-0"
            style={{ backgroundColor: props.color }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <DynamicIcon name={props.icon} />
          </motion.div>
          <div>
            <h4 className="font-semibold text-lg mb-1">{props.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {props.desc}
            </p>
            <Link href={props.link} className={cn(` ${props.textColor} hover:underline`, props.className)}>
              {props.label}
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ContactCard