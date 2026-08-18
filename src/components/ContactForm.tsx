import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { FormField, HoneypotField, TextAreaField } from "@/components/FormField";
import { contactSchema, submitContactMessage, type ContactInput } from "@/lib/leads.functions";

export function ContactForm() {
  const submit = useServerFn(submitContactMessage);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "", company: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const result = await submit({ data: values });
      if (result.status === "error") {
        setFormError(result.message);
        return;
      }
      setDone(true);
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong. Please check your connection and try again.");
    }
  });

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-2xl text-brand">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-bold text-foreground">Message received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. A member of the Penuel Prime team will respond to your enquiry
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
    >
      <h2 className="text-2xl font-bold tracking-tight text-foreground">Contact us</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Not ready to commit? Send us a question and we'll come back to you.
      </p>

      <HoneypotField {...register("company")} />

      <div className="mt-6 space-y-5">
        <FormField
          id="fullName"
          label="Full name"
          placeholder="Adaeze Okonkwo"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="+234 801 234 5678"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextAreaField
          id="message"
          label="Message"
          placeholder="Tell us what you'd like to know about the Club."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {formError && (
        <p role="alert" className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full bg-brand px-6 py-4 text-sm font-semibold tracking-wide text-brand-foreground transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
