"use client";

import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const TermsPage = () => {
  const t = useTranslations("terms_page");

  return (
    <Container>
      <header className="w-full flex justify-center flex-col lg:flex-row py-16">
        <h1 className="text-4xl md:text-5xl lg:text-4xl text-slate-900 dark:text-gray-100 font-bold leading-tight lg:mb-6 text-center">
          <span className="block text-5xl md:text-6xl rtl:py-5 lg:text-6xl bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </span>
          {t("subtitle")}
        </h1>
      </header>

      <main className="max-w-6xl px-10 lg:px-0 mx-auto">
        <p className="px-5 lg:px-20 leading-snug text-lg">
          {t.rich("intro", {
            colored: (chunks) => <span className="text-rose-500">{chunks}</span>,
          })}
        </p>

        {/* User Eligibility */}
        <div className="flex flex-col lg:flex-row justify-center py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("user_eligibility")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="text-sm">{t("user_eligibility_description")}</p>
          </div>
        </div>

        {/* Account Creation and Responsibility */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("account_creation")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <ul className="space-y-4 text-sm">
              <li>
                {t.rich("account_information", {
                  colored: (chunks) => <span className="font-semibold">{chunks}</span>,
                })}
              </li>
              <li>
                {t.rich("password_security", {
                  colored: (chunks) => <span className="font-semibold">{chunks}</span>,
                })}
              </li>
            </ul>
          </div>
        </div>

        {/* Use of Services */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("use_of_services")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <ul className="space-y-4 text-sm">
              <li>
                {t.rich("permitted_use", {
                  colored: (chunks) => <span className="font-semibold">{chunks}</span>,
                })}
              </li>
              <li>
                {t.rich("prohibited_use", {
                  colored: (chunks) => <span className="font-semibold">{chunks}</span>,
                })}
              </li>
            </ul>
          </div>
        </div>

        {/* Subscription Fees and Payments */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("subscription_fees")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("subscription_fees_description")}</p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("intellectual_property")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("intellectual_property_description")}</p>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("limitation_liability")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("limitation_liability_description")}</p>
          </div>
        </div>

        {/* Termination */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("termination")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("termination_description")}</p>
          </div>
        </div>

        {/* Governing Law */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("governing_law")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("governing_law_description")}</p>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="flex justify-center flex-col lg:flex-row py-10">
          <div className="lg:w-1/3 pb-3">
            <h3 className="text-2xl font-semibold">{t("changes_to_terms")}</h3>
          </div>
          <div className=" lg:w-2/3">
            <p className="pb-5 font-medium">{t("changes_to_terms_description")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center flex-col lg:flex-row py-16">
          <p className="text-center text-lg">
            {t.rich("cta", {
              colored: (chunks) => <Link className="text-rose-500 hover:underline" href="/contact">{chunks}</Link>,
            })}
          </p>
        </div>
      </main>
    </Container>
  );
};

export default TermsPage;

