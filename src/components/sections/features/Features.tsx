"use client";
import { useTranslations } from "next-intl";
import FeatureCard from "./FeatureCard";
import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import ColoredTitle from "@/components/coloredTitle/ColoredTitle";


const getCardColor = (title: string) => {
  return title.includes("Loyalty") ||
    title.includes("Segments") ||
    title.includes("Analytics") ||
    title.includes("Notifications")
    ? "rose-500"
    : "purple-600";
};
const Features = () => {
  const t = useTranslations("features");

  const cards = t.raw("cards") as Array<{
    title: string;
    description: string;
    icon: keyof typeof dynamicIconImports;
  }>;
  return (
    <Container>
       <section
      id="features"
      className="w-full flex flex-col items-center my-10"
    >
      <header className=" mt-20 space-y-5 flex flex-col items-center  ">
       <ColoredTitle json_key="features" className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl p-5 lg:p-0"/>

        <div className=" max-w-2xl lg:max-w-3xl mt-5 text-center">
          <p className="text-lg lg:text-xl/8   text-gray-600 dark:text-gray-500 font-medium">
            {t("subtitle")}
          </p>
        </div>
      </header>
      <main className="w-full flex justify-center  mt-10 p-10 px-12 flex-wrap gap-5">
        {cards.map((card) => {

          const color = getCardColor(card.title);
          return (
            <FeatureCard
              key={card.title}
              color={color}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          );
        })}
      </main>
    </section>
    </Container>
   
  );
};

export default Features;
