"use client"

import Container from "@/components/layout/componentWrapper/ComponentWrapper"
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl"

const PrivacyPage = () => {
  const t = useTranslations("privacy_page");

  return (
    <Container>
       <header className=" w-full flex justify-center py-16">
         <h1 className="text-4xl md:text-5xl lg:text-4xl text-slate-900 dark:text-gray-100 font-bold leading-tight lg:mb-6 text-center">
      <span className="block text-5xl md:text-6xl lg:text-6xl rtl:py-5 bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
        {t("title")}
      </span>
      {t("subtitle")}
    </h1>
       </header>
       <main className=" lg:max-w-6xl px-10 mx-auto">
        <p className=" px-5 lg:px-20 py-5 leading-snug text-xl">{t.rich("intro",{
          colored:(chunks) => <span className="text-rose-500">{chunks}</span>
        })}</p>
        <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("info_we_collect")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <ul className="space-y-4 text-sm">
            <li>{t.rich("personal_information",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("usage_data",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("cookies",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
          </ul>
          </div>
       
        </div>
           {/* how we use data  */}
                  <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("how_we_use_data")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <ul className="space-y-4 text-sm">
            <li>{t.rich("provide_improve_services",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("communicate",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("comply",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
          </ul>
          </div>
       
        </div>
        {/* data securtiy  */}
                  <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("data_security")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <p className="pb-5 font-medium">{t("data_security_description")}</p>
            <ul className="space-y-4 text-sm">
            <li>{t.rich("data_encryption",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("secure_servers",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("regular_audits",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
          </ul>
          </div>
       
        </div>
        {/* your rights  */}
                   <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("your_rights")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <p className="pb-5 font-medium">{t("your_rights_description")}</p>
            <ul className="space-y-4 text-sm">
            <li>{t.rich("access",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("correct",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("delete",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("optout",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
          </ul>
          </div>
       
        </div>
        {/* Data retention  */}
                   <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("data_retention")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <p className="pb-5 font-medium">{t("data_retention_description")}</p>
     
          </div>
       
                   </div>
                   <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("third_party_sharing")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <p className="pb-5 font-medium">{t("third_party_sharing_description")}</p>
                   <ul className="space-y-4 text-sm">
            <li>{t.rich("service_providers",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
            <li>{t.rich("legal_req",{
              colored:(chunks) => <span className="font-semibold">{chunks}</span>
            })}</li>
   
          </ul>
          </div>
       
                   </div>

            {/* privacy change   */}
              <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-5">
             <h3 className="text-2xl font-semibold">
            {t("privacy_changes")}
          </h3>
          </div>
         
          <div className="w-2/3">
            <p className="pb-5 font-medium">{t("privacy_changes_description")}</p>
     
          </div>
       
              </div>

              {/* cta  */}
              <div className="flex justify-center py-10">
                <p>{t.rich("cta",{
                  colored:(chunks) => <Link className="text-rose-500" href="/contact">{chunks}</Link>
                })}</p>
              </div>
       </main>
    </Container>
    
  )
}

export default PrivacyPage;
