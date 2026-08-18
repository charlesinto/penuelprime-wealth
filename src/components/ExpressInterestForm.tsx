import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { FormField, HoneypotField, SelectField } from "@/components/FormField";
import {
  TIERS,
  interestSchema,
  submitInterestApplication,
  type InterestInput,
} from "@/lib/leads.functions";

export function ExpressInterestForm({ defaultTier }: { defaultTier?: InterestInput["tier"] }) {
  const submit = useServerFn(submitInterestApplication);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InterestInput>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      tier: defaultTier ?? "tier_1",
      timeline: "",
      referralSource: "",
      company: "",
    },
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
        <h3 className="mt-5 text-2xl font-bold text-foreground">Interest registered</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your details are with the Penuel Prime team. An advisor will contact you to walk through the
          tier you selected, the current deal pipeline and the documentation involved.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setDone(false);
          }}
          className="mt-6 rounded-full bg-orange px-6 py-3 text-sm font-semibold tracking-wide text-orange-foreground transition-opacity hover:opacity-90"
        >
          Submit another interest
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
    >
      <h2 className="text-2xl font-bold tracking-tight text-foreground">Express interest</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Indicate the level you're considering. No commitment is made at this stage.
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
        <SelectField id="tier" label="Tier of interest" error={errors.tier?.message} {...register("tier")}>
          {TIERS.map((tier) => (
            <option key={tier.value} value={tier.value}>
              {tier.label}
            </option>
          ))}
        </SelectField>
        <FormField
          id="timeline"
          label="Investment timeline (optional)"
          placeholder="e.g. within 3 months"
          error={errors.timeline?.message}
          {...register("timeline")}
        />
        <FormField
          id="referralSource"
          label="How did you hear about the Club? (optional)"
          placeholder="e.g. referral, LinkedIn, Penuel Prime advisor"
          error={errors.referralSource?.message}
          {...register("referralSource")}
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
        className="mt-7 w-full rounded-full bg-orange px-6 py-4 text-sm font-semibold tracking-wide text-orange-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting…" : "Submit expression of interest"}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Your details are stored securely and used only by the Penuel Prime team to follow up.
      </p>
    </form>
  );
}
