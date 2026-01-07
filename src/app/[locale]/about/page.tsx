"use client"
import Container from "@/components/layout/componentWrapper/ComponentWrapper"
import { Button } from "@/components/ui/button"
import { Timeline } from "@/components/ui/timeline"
import { MoveRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import AboutCard from "./AboutCard"

const AboutPage = () => {
  const t = useTranslations("about_page");
  const data = [
    {
      key:"intro",
      title: t("introduction_header"),
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
           {t.rich("introduction_description",{
            colored:(chunks) => <span className="text-rose-500">{chunks}</span>
           })}
          </p>
        </div>
      ),
    },
    {
      key:"ourstory",
      title: t("ourstory_header"),
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            {t.rich("ourstory_description",{
              colored:(chunks) => <span className="text-rose-500">{chunks}</span>
            })}
          </p>
          <p className="text-2xl text-slate-900 dark:text-neutral-200 font-semibold mb-5">{t("set_apart")}</p>
          <p>
            {t("set_apart_description")}
          </p>
          <ul className="mt-5 p-5 space-y-5">
            <li className=" text-slate-900 dark:text-gray-400">
              {t.rich("set_apart_li1",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className=" text-slate-900 dark:text-gray-400">
              {t.rich("set_apart_li2",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className=" text-slate-900 dark:text-gray-400">
              {t.rich("set_apart_li3",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className=" text-slate-900 dark:text-gray-400">
              {t.rich("set_apart_li4",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
          </ul>
          
        </div>
      ),
    },
    {
      key:"ourvision",
      title: t("ourvision_title"),
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            {t("ourvision_description")}
          </p>

         
        </div>
      ),
    },
    {
      key:"ourvalues",
      title: t("ourvalues_title"),
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
            {t("ourvision_description")}
          </p>
          <ul className="mt-5 p-5 space-y-5">
            <li className="text-slate-900 dark:text-gray-400">
              {t.rich("ourvalues_li1",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className="text-slate-900 dark:text-gray-400">
              {t.rich("ourvalues_li2",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className="text-slate-900 dark:text-gray-400">
              {t.rich("ourvalues_li3",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
            <li className="text-slate-900 dark:text-gray-400">
              {t.rich("ourvalues_li4",{
                colored:(chunks) => <span className="font-bold dark:text-white">{chunks}</span>
              })}
            </li>
          </ul>
         
        </div>
      ),
    },
  ];
  return (
   <Container>
      <div className="relative w-full overflow-clip py-10">
        <Timeline data={data} />

        <div className="lg:px-25 lg:py-10">
          <h3 className="text-4xl mb-5 text-slate-900 dark:text-neutral-200 px-5 font-semibold">
            {t("howcanwehelp")}
          </h3>
          <p className="max-w-3xl px-5 font-medium text-gray-800 dark:text-gray-300">
            {t.rich("howcanwehelpdescription", {
              colored: (chunks) => <span className="text-rose-500">{chunks}</span>,
            })}
          </p>

          {/* Cards Section */}
          <div className="flex flex-col lg:flex-row gap-5 p-10 my-20">
            <AboutCard
              icon={"users"}
              title={t.rich("employee_training", {
                colored: (chunks) => (
                  <span className="font-bold dark:text-white text-lg">
                    {chunks} <br /> <br />
                  </span>
                ),
              })}
            />
            <AboutCard
              icon={"award"}
              title={t.rich("customer_loyalty", {
                colored: (chunks) => (
                  <span className="font-bold dark:text-white text-lg">
                    {chunks} <br /> <br />
                  </span>
                ),
              })}
            />
            <AboutCard
              icon="chart-no-axes-combined"
              title={t.rich("sales_marketing", {
                colored: (chunks) => (
                  <span className="font-bold dark:text-white text-lg">
                    {chunks} <br /> <br />
                  </span>
                ),
              })}
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col mt-10 w-85 lg:w-full items-center space-y-3 p-10 rounded-3xl max-w-2xl mx-auto border-2 border-dashed border-rose-500/30 dark:border-rose-500/50 bg-rose-50/10">
            <p className="mt-5 text-center py-5 text-slate-900 dark:text-gray-200 font-medium max-w-xl text-lg tracking-wide leading-widest">
              {t("cta")}
            </p>
            <Link href="/contact">
              <Button className="mx-auto bg-rose-500 text-white flex gap-2 hover:bg-rose-600 cursor-pointer items-center">
                {t("cta_button")}
                <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AboutPage;

