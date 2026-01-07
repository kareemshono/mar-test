'use client';
import { useForm as useRHF } from "react-hook-form";
import { useForm as useFormspree, ValidationError } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.email("Invalid email"),
  phone: z.string().min(9, "Phone number too short").max(15, "Phone number too long"),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  plan: { name: string; price: string } | null;
  isOpen: boolean;
  onClose: () => void;
};

const PlanDialog = ({ plan, isOpen, onClose }: Props) => {
  const [state, formspreeSubmit] = useFormspree(process.env.NEXT_PUBLIC_FORM_ID as string);
  const t = useTranslations("pricing")
  const [showSuccess, setShowSuccess] = useState(false);
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
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("plan_name", plan?.name || "");
    formData.append("plan_price", plan?.price || "");
    formData.append("form_type", "Plan_Selection"); 
    formData.append("_subject", "Mario - New Plan Selection Request");

    try {
      await formspreeSubmit(formData); 
        setShowSuccess(true);
      reset();
      onClose();
       toast.success(t("planSuccessToast"), { duration: 5000 });

    } catch (error) {
      toast.error(t("planErrorToast"), { duration: 6000 });
    }
  };


  if (!plan) return null;
  if (state.errors) return <ValidationError errors={state.errors} className="text-destructive"/>
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rtl:text-right">
        <DialogHeader className="rtl:text-right rtl:mt-2">
          <DialogTitle >
            {t.rich("dialogTitle",{
              green:(chunks) => <span className="text-green-500">{plan.name}</span>
            })}
            
          </DialogTitle>
          <DialogDescription>
            {t("dialogDescription")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden fields for Formspree */}
          <input type="hidden" name="plan_name" value={plan.name} />
          <input type="hidden" name="plan_price" value={plan.price} />
          <input type="hidden" name="form_type" value="select_plan" />
          <input type="hidden" name="_subject" value="New Plan Selection Request" />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("dialogNameLabel")}</Label>
              <Input id="name" {...register("name")} placeholder="Your Name" />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">{t("dialogEmailLabel")}</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">{t("dialogPhoneLabel")}</Label>
              <Input id="phone"  {...register("phone")} placeholder="" />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">{t("cancelBtn")}</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || state.submitting}>
              {state.submitting ? "Sending..." : t("confirmReqBtn")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDialog;