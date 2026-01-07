import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // correct shadcn path
import { motion } from "framer-motion";

type Props = {
  question: string;
  answer: string;
  idx: number;
};

const FaqItem = ({ question, answer, idx }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      whileHover={{ x: 5, scale: 1.01 }}
    >
      <AccordionItem
        value={`item-${idx + 1}`}
        className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 bg-white dark:bg-gray-900 
                   hover:border-[#FF1D57] dark:hover:border-[#FF1D57] transition-all duration-300 
                   data-[state=open]:border-[#FF1D57] data-[state=open]:shadow-sm data-[state=open]:shadow-[#FF1D57]/10 
                   relative overflow-hidden group"
      >
        {/* Subtle pink glow on hover/open */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at left, rgba(255, 29, 87, 0.05) 0%, transparent 70%)",
          }}
        />

        <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5 text-base md:text-lg 
                                     text-gray-900 dark:text-white group-hover:text-[#FF1D57] 
                                     transition-colors relative z-10 [&[data-state=open]>svg]:rotate-180">
          <span className="flex items-start gap-4">
            {/* Numbered circle */}
            <motion.span
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm relative"
              style={{
                backgroundColor: idx % 2 === 0 ? "#FF1D57" : "#E01A4F",
              }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pulsing glow */}
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(255, 29, 87, 0)",
                    "0 0 15px rgba(255, 29, 87, 0.6)",
                    "0 0 0px rgba(255, 29, 87, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">{idx + 1}</span>
            </motion.span>

            <span>{question}</span>
          </span>
        </AccordionTrigger>

        <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pl-9 pb-4 relative z-10">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default FaqItem;