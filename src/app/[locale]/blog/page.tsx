"use client";

import Container from "@/components/layout/componentWrapper/ComponentWrapper";
import { useTranslations } from "next-intl";
import PostCard from "./PostCard";
import SubscribeForm from "./SubscribeForm";

const BlogPage = () => {
  const t = useTranslations("blog_page");

  const posts = t.raw("posts") as Array<{ number: string; title: string; description: string }>;

  return (
    <Container>
      <header className="w-full px-16 flex flex-col gap-5 flex-col-reverse  lg:flex-row justify-between items-start my-10">
        <div className="w-full lg:w-2/3">
          <h1 className="mt-16 text-slate-900 dark:text-gray-100 mb-3 text-4xl">{t("introduction")}</h1>
          <p className="max-w-2xl text-lg  text-slate-900 dark:text-gray-100 leading-relaxed">
            {t.rich("introduction_para", {
              colored: (chunks) => <span className="text-rose-500 text-xl">{chunks}</span>,
            })}
          </p>
        </div>

      <div className="relative w-full lg:w-1/3 flex items-center justify-center h-64 overflow-hidden">
  {/* Floating Trophy */}
  <div className="absolute animate-bounce delay-200">
    <svg className="w-24 h-24 drop-shadow-2xl text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.09 6.26L17.82 6.82L14.41 10.1L15.5 14.82L12 12.82L8.5 14.82L9.59 10.1L6.18 6.82L10.91 6.26L12 2Z" />
      <path d="M12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17Z" />
    </svg>
  </div>

  {/* Floating Badge */}
  <div className="absolute top-10 left-10 animate-bounce delay-500">
    <svg className="w-20 h-20 drop-shadow-2xl text-rose-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 20V18C21 15.88 18.37 14.2 15 14V12C15 10.9 14.1 10 13 10H11C9.9 10 9 10.9 9 12V14C5.63 14.2 3 15.88 3 18V20h11Z" />
    </svg>
  </div>

  {/* Floating Star Points */}
  <div className="absolute bottom-8 right-8 animate-bounce">
    <svg className="w-28 h-28 drop-shadow-2xl text-purple-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  </div>

  {/* Small floating confetti particles */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 left-20 w-4 h-4 bg-rose-500/70 rounded-full animate-ping delay-1000"></div>
    <div className="absolute top-32 right-16 w-3 h-3 bg-purple-500/70 rounded-full animate-ping delay-700"></div>
    <div className="absolute bottom-16 left-32 w-5 h-5 bg-yellow-400/60 rounded-full animate-ping delay-300"></div>
    <div className="absolute bottom-24 right-24 w-4 h-4 bg-rose-500/60 rounded-full animate-ping delay-1200"></div>
  </div>

  {/* Optional: subtle background blob for depth */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-rose-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
  </div>
</div>
      </header>

      <main className="py-20 px-10">
        <h1 className="text-4xl leading-wide text-slate-900 dark:text-neutral-200 text-center mb-12">
          {t("recent_posts")}
        </h1>

        {/* Grid with PostCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto py-20 space-y-5">
          <h1 className="text-4xl text-slate-900 dark:text-white md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text py-3 text-transparent">
              {t("stay_updated")}
            </span>
            {t("stay_updated_subtitle")}
          </h1>

          <p className="text-xl md:text-xl text-slate-900 dark:text-gray-300 lg:max-w-4xl text-start   leading-relaxed mb-10">
            {t("subtitle")}
          </p>

          <div className="flex gap-2">
        <SubscribeForm />
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {t("no_spam")}
          </p>
        </div>
      </main>
    </Container>
  );
};

export default BlogPage;
