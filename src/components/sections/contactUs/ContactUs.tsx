"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Form from "./Form";;
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import ContactCard from "./ContactCard";
import ColoredTitle from "@/components/coloredTitle/ColoredTitle";
import Link from "next/link";

export default function ContactUs() {
  const t = useTranslations("contact");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="w-screen  bg-gradient-to-br from-rose-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Container >
        <section
        id="contact"
        className="py-20 px-6 lg:px-20 relative overflow-hidden "
      >    
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
          <ColoredTitle json_key="contact" className="text-3xl/10 sm:text-3xl md:text-5xl lg:text-5xl/20" />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Form onSuccess={() => setShowSuccess(true)} />
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Email */}
              <ContactCard
                icon={"mail"}
                title={t("email.title")}
                desc={t("email.description")}
                link={`mailto:${t("email.address")}`}
                label={t("email.address")}
                color="#993EF9"
                className="dark:bg-slate-900"
              />

              {/* WhatsApp */}
              <ContactCard
                icon={"message-square"}
                title={t("whatsapp.title")}
                desc={t("whatsapp.description")}
                link="https://wa.me/963944000508"
                label={t("whatsapp.number")}
                color="#41FF00"
                textColor="text-gray-900 dark:text-green-500"
                className="dark:bg-slate-900"
              />

              {/* Demo CTA */}
              <Card className="p-5 bg-gradient-to-br from-purple-600 to-purple-700 border-0 text-white">
                <h3 className="text-xl  mb-0">{t("demo.title")}</h3>
                <p className="text-purple-100 mb-1">{t("demo.description")}</p>
                
                  <Link target="_target" href="https://calendly.com/quantumgatehero/30min">
                  <Button className="bg-white w-50 cursor-pointer text-purple-700 hover:bg-purple-50 font-medium">
                     {t("demo.cta")}
                  </Button>
                 
                  </Link>
                
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
            onClick={() => setShowSuccess(false)}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl">✅</span>
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg">{t("success.title")}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("success.body")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </Container>
    </div>
  );
}
