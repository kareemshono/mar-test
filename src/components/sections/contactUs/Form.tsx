'use client';

import { motion } from "framer-motion";
import { useForm as useRHF } from "react-hook-form";  // ← React Hook Form
import { useForm as useFormspree, ValidationError } from "@formspree/react";  // ← Formspree
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";



const formSchema = z.object({
  firstName: z.string().min(2, "First Name Should At Least Be 2 Characters"),
  lastName: z.string().min(2, "Last Name Should At Least Be 2 Characters"),
  email: z.email("Invalid email"),
  company: z.string().min(2, "This Field Is Required"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess: () => void;
  header?:string;
}

export default function Form({ onSuccess, header }: ContactFormProps) {
   // Formspree state & submit handler
const formId = process.env.NEXT_PUBLIC_FORM_ID;

if (!formId) {
  throw new Error("Missing NEXT_PUBLIC_FORM_ID environment variable. Check your .env and Vercel settings.");
}
  const [state, formspreeSubmit] = useFormspree(formId);
  const t = useTranslations("contact.form");
const [showSuccess, setShowSuccess] = useState(false);
 

  // React Hook Form (for validation + register)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useRHF<FormData>({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = async (data: FormData) => {
    
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("message", data.message);
    formData.append("_subject", "Mario - New Contact Form Submission");
    formData.append("form_type", "contact"); // Hidden identifier

 try {
      await formspreeSubmit(formData);
    
      // Handle success without useEffect
  if (!showSuccess) {
    setShowSuccess(true);
    reset();
    onSuccess();
       toast.success("Message sent successfully! We'll get back to you soon. ", {
        duration: 5000,
      });
  }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        duration: 6000,
      });
     
    }
 
  };
 
  return (
    <Card className="p-8 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 relative overflow-hidden">
      <motion.div
        className="absolute -inset-1 bg-rose-500/10 rounded-xl blur-xl opacity-0"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
        <p className="text-sm text-slate-900 dark:text-gray-200 text-center mx-auto max-w-md mb-5">{header}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        {/* Hidden inputs (for formspree) */}
        <input type="hidden" name="_subject" value="New Contact Form Submission" />
        <input type="hidden" name="form_type" value="contact form" />
        <div className="grid md:grid-cols-2 gap-5">
          {["firstName", "lastName"].map((field) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: field === "firstName" ? 0.1 : 0.2 }}
            >
              <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-rose-500"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {t(field)}
              </label>
              <Input
                {...register(field as keyof FormData)}
                placeholder={t(`placeholder_${field}`)}
                className="focus:border-rose-500 transition-all"
              />
              {errors[field as keyof FormData] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field as keyof FormData]?.message}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {["email", "company"].map((field) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (field === "company" ? 0.1 : 0) }}
          >
            <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-purple-500"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              {t(field)}
            </label>
            <Input
              {...register(field as keyof FormData)}
              type={field === "email" ? "email" : "text"}
              placeholder={t(`placeholder_${field}`)}
              className="focus:border-purple-500 transition-all"
            />
            {errors[field as keyof FormData] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field as keyof FormData]?.message}
              </p>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-rose-500"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            {t("message")}
          </label>
          <Textarea
            {...register("message")}
            placeholder={t("placeholder_message")}
            rows={5}
            className="resize-none focus:border-rose-500"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
          
          <ValidationError errors={state.errors} className="text-destructive"/>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting || state.submitting}
            className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-500/30"
          >
            {state.submitting ? "Sending..." : t("submit")}
            <Send className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </form>
    </Card>
  );
}