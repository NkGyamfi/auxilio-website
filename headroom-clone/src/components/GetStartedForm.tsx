"use client";

import { useState, type FormEvent } from "react";
import { HologramIcon, SelectChevronIcon } from "@/components/icons";
import {
  BUSINESS_TYPE_OPTIONS,
  TEAM_SIZE_OPTIONS,
  type GetStartedFormValues,
} from "@/types/headroom";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: GetStartedFormValues = {
  email: "",
  businessName: "",
  businessType: "",
  teamSize: "",
  description: "",
};

const INPUT_CLASSES =
  "h-12 rounded-md border border-white/30 bg-white/10 p-4 text-base text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:border-white/80 disabled:opacity-50";

const SELECT_CLASSES =
  "h-12 w-full appearance-none rounded-md border border-white/30 bg-white/10 px-4 pr-10 text-base leading-tight text-white/50 focus-visible:border-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-50";

export function GetStartedForm() {
  const [values, setValues] = useState<GetStartedFormValues>(INITIAL_VALUES);

  const isValid =
    values.email.trim() !== "" &&
    EMAIL_PATTERN.test(values.email) &&
    values.businessName.trim() !== "" &&
    values.businessType !== "" &&
    values.teamSize !== "" &&
    values.description.trim() !== "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
      id="get-started"
      className="relative z-10 px-6 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-12"
    >
      <div className="mx-auto my-10 flex max-w-2xl grow flex-col gap-8 rounded-lg bg-white/10 p-6 pb-8 backdrop-blur-lg sm:my-20 sm:w-full sm:px-12 sm:py-8 sm:pb-12">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-heading text-2xl font-bold text-white">
            Tell us about your business
          </h3>
          <HologramIcon className="h-16 w-16 shrink-0 text-white" />
        </div>
        <p className="text-white">
          We&apos;ll learn how your business runs, build your system, and
          ship it. Backed by our 90-day money-back guarantee.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={values.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            className={INPUT_CLASSES}
          />
          <input
            type="text"
            required
            placeholder="Business name"
            value={values.businessName}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, businessName: e.target.value }))
            }
            className={INPUT_CLASSES}
          />
          <div className="relative">
            <select
              required
              value={values.businessType}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  businessType: e.target
                    .value as GetStartedFormValues["businessType"],
                }))
              }
              className={SELECT_CLASSES}
            >
              <option value="" disabled>
                Select business type
              </option>
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <SelectChevronIcon className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-white/80" />
          </div>
          <div className="relative">
            <select
              required
              value={values.teamSize}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  teamSize: e.target
                    .value as GetStartedFormValues["teamSize"],
                }))
              }
              className={SELECT_CLASSES}
            >
              <option value="" disabled>
                Select team size
              </option>
              {TEAM_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <SelectChevronIcon className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-white/80" />
          </div>
          <textarea
            required
            placeholder="Brief description of your business and what you're looking to achieve"
            value={values.description}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
            className="h-24 resize-none rounded-md border border-white/30 bg-white/10 p-4 text-base text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:border-white/80 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isValid}
            className="relative inline-flex select-none items-center justify-center gap-x-1.5 rounded-md border font-medium transition-colors h-12 w-full sm:w-min px-4 text-base border-primary bg-primary text-white hover:bg-primary/80 disabled:border-transparent disabled:bg-brand/30 disabled:text-white/30 disabled:pointer-events-none"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
