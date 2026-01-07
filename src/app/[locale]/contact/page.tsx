"use client"
import Container from "@/components/layout/componentWrapper/ComponentWrapper"
import Form from "@/components/sections/contactUs/Form"
import { routing } from "@/i18n/routing";
import { Clock, Info, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ContactPage = () => {
  const t = useTranslations("contact_page")
    const [showSuccess, setShowSuccess] = useState(false);
  return (
    <Container>
      <header className="px-10">
           <h1 className="text-4xl text-slate-900 dark:text-white md:text-5xl lg:text-5xl font-bold leading-tight mb-3 text-center py-10">
      <span className="block text-5xl md:text-6xl lg:text-6xl rtl:py-4 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
        {t("contact_us")}
      </span>
      {t("we_are_here")}
    </h1>

    <p className="text-xl text-center md:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
      {t("banner")}
    </p>
      </header>
      <main className="flex flex-col lg:flex-row items-center gap-10 px-10 lg:px-20 pb-16">
        <div className=" lg:w-1/2">
            
        <Form header={`${t("form_header")}`} onSuccess={() => setShowSuccess(true)} />
        </div>
        <div className=" lg:w-1/2">
        <div className="p-8 space-y-5">
              <div className="group flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-2xl transition-colors">
                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t("office")}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{t("location")}</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-2xl transition-colors">
                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t("phone")}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{t("num")}</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-2xl transition-colors">
                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t("email")}</p>
                  <a href="mailto:support@mario.com" className="text-rose-500 hover:underline mt-1 block">
                    support@mario.com
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-2xl transition-colors">
                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t("working_hours")}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{t("mon_fr")}: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Subtle bottom gradient accent */}
            <div className="h-1 bg-gradient-to-r from-rose-500 to-purple-600" />
          </div>
         
        
      </main>
      <footer className="px-10">
         <div className="w-full pb-20">
            <p className=" dark:text-zinc-300 text-center flex gap-2 items-center justify-center">
              <Info className="w-5" />{t("need_assistance")}</p>
          </div>
      </footer>
    </Container>
    
  )
}

export default ContactPage;
