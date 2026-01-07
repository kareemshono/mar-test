"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Accordion,
} from "@/components/ui/accordion";
import FaqHeader from "./FaqHeader";
import FaqItem from "./FaqItem";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const t = useTranslations("faq");
  const faqs = t.raw("items") as Array<{ question: string; answer: string }>;
  const Ref = useRef<HTMLButtonElement>(null);
  
  const handleScrollClick = () => {
    Ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",        
      inline: "nearest"
    });
  };
  return (
    <section id="faq" className="py-20 px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FaqHeader />

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => <FaqItem key={idx} idx={idx} question={faq.question} answer={faq.answer} />)}
          </Accordion>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center p-10 rounded-3xl border-2 border-dashed border-rose-500/30 dark:border-rose-500/50 bg-rose-50/10"
        >
          <h3 className="text-2xl md:text-2xl  mb-3 text-gray-900 dark:text-white">
            {t("still_have_questions")}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            {t("contact_prompt")}
          </p>
          <Button
           ref={Ref}
           onClick={handleScrollClick}
            className="inline-flex items-center gap-2 px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/25 transition-all hover:shadow-rose-500/40"
          >
            {t("contact_cta")}
            <span>→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
