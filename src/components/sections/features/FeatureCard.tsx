import DynamicIcon from "@/components/icons/DynamicIcon";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  icon: keyof typeof dynamicIconImports;
  color: string;

};

const FeatureCard = (props: Props) => {
  return (
    <Card className=" gap-0 w-100 lg:w-70 transition border-slate-950/30 .3s ease-out hover:-translate-y-3 dark:bg-slate-900 dark:border-white/20">
      <CardHeader>
        <CardTitle className="flex flex-col gap-5 p-0 ">
          <span
            className={`w-10 h-10 easeInOut duration-500 hover:rotate-360 flex items-center shadow-md shadow-${props.color} backdrop-blur text-white justify-center rounded-lg bg-${props.color} `}
          >
            {" "}
            <DynamicIcon name={props.icon} className="h-5 w-5 md:h-6 md:w-6" />   {" "}
          </span>
          <span className="text-slate-700  dark:text-white text-lg">
            {props.title}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 dark:text-gray-500 text-sm">
          {props.description}
        </p>
      </CardContent>
      <CardFooter className="mt-5">
        <Link className="flex items-center gap-2 text-purple-500 hover:text-slate-700 dark:hover:text-white" href="#">Learn more <ArrowRight className="w-3 h-3"/></Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
