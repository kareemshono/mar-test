"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm as useRHF } from "react-hook-form";  // ← React Hook Form
import { useForm as useFormspree, ValidationError } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import z from "zod";



 export default function SubscribeForm() {
  const t = useTranslations("blog_page");
  // Inside BlogPage component, before return
const subscribeSchema = z.object({
  email: z.string().email(t("invalid_email")),
});

type SubscribeData = z.infer<typeof subscribeSchema>;
const formId = process.env.NEXT_PUBLIC_FORM_ID;

if (!formId) {
  throw new Error("Missing NEXT_PUBLIC_FORM_ID environment variable. Check your .env and Vercel settings.");
}
  const [state, formspreeSubmit] = useFormspree(formId);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useRHF<SubscribeData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("_subject", "Mario - New Blog Subscription Request");
    formData.append("form_type", "blog_subscription");

    try {
      await formspreeSubmit(formData);

      if (state.succeeded) {
        reset();
        toast.success(t("subscription_success") || "Subscribed successfully! Welcome to the list 🎉", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error(t("subscription_error") || "Failed to subscribe. Please try again.", {
        duration: 6000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full max-w-md ">
      <div className="flex-1">
        <Input
          {...register("email")}
          type="email"
          placeholder={t("enter_email")}
          className="w-full  text-base focus:border-rose-500 transition-all"
          disabled={state.submitting}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
        )}
        <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1 ml-1" />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || state.submitting || state.succeeded}
        className=" px-8 flex gap-2 items-center bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {state.submitting ? (
          "Subscribing..."
        ) : state.succeeded ? (
          "Subscribed!"
        ) : (
          <>
            <MailCheck className="w-5 h-5" />
            {t("subscribe")}
          </>
        )}
      </Button>
    </form>
  );
}