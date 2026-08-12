"use client";

import { useState } from "react";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* A Web3Forms access key is public by design — it ends up in the client bundle
   either way, and all it can do is deliver a message to Spencer's inbox. It is
   committed rather than left to a gitignored .env.local so a deploy from a fresh
   clone doesn't silently ship a dead form. The env var still wins if set.
   Absent means no backend yet, so the form says so rather than dropping
   messages — see docs/TODO.md Phase 4. */
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "a5e534dd-43bd-4249-98d2-83c322126568";
const ENDPOINT = "https://api.web3forms.com/submit";

const fields = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "you@example.com" },
  { name: "subject", label: "Subject", placeholder: "What's this about?" },
  {
    name: "message",
    label: "Message",
    placeholder: "Say hello…",
    multiline: true,
  },
] as const;

type FieldName = (typeof fields)[number]["name"];
type Values = Record<FieldName, string>;

const empty: Values = { name: "", email: "", subject: "", message: "" };

function validate({ name, email, subject, message }: Values) {
  const errors: Partial<Values> = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!subject.trim()) errors.subject = "Please add a subject.";
  if (!message.trim()) errors.message = "Please write a message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...values,
          botcheck: new FormData(event.currentTarget).get("botcheck"),
        }),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-3">
        <div className="mb-4 flex size-13 items-center justify-center rounded-full bg-music/20 text-music-deep">
          <Check aria-hidden="true" className="size-7" />
        </div>
        <p className="font-display text-xl font-semibold">Message sent</p>
        <p className="mt-1.5 mb-5 text-sm/[1.6] text-ink-soft">
          Thanks for reaching out — I&rsquo;ll get back to you soon.
        </p>
        <Button
          tone="contact"
          variant="outline"
          size="sm"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
      {status === "error" && (
        <Banner>
          Something went wrong sending your message. Please try again.
        </Banner>
      )}
      {!ACCESS_KEY && (
        <Banner>
          This form isn&rsquo;t connected to a mailbox yet — use the email
          address on the left and I&rsquo;ll get it.
        </Banner>
      )}

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {fields.map(({ name, label, placeholder, ...rest }) => {
        const multiline = "multiline" in rest;
        const invalid = Boolean(errors[name]);
        const control = cn(
          "w-full rounded-md border bg-surface px-3 text-sm text-ink shadow-xs outline-none",
          "transition-[border-color,box-shadow] duration-150 placeholder:text-ink-soft/60",
          "hover:border-ink-soft/35 focus-visible:border-contact focus-visible:ring-3 focus-visible:ring-contact/25",
          invalid
            ? "border-contact-deep ring-3 ring-contact-deep/20"
            : "border-ink-soft/20",
        );

        return (
          <div
            key={name}
            className={cn("mb-4.5 grid gap-2", multiline && "flex-1")}
          >
            <label htmlFor={name} className="text-sm font-medium">
              {label}
            </label>
            {multiline ? (
              <textarea
                id={name}
                name={name}
                rows={5}
                placeholder={placeholder}
                value={values[name]}
                onChange={(e) =>
                  setValues({ ...values, [name]: e.target.value })
                }
                aria-invalid={invalid}
                aria-describedby={invalid ? `${name}-error` : undefined}
                className={cn(control, "min-h-20 flex-1 resize-y py-2")}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={name === "email" ? "email" : "text"}
                placeholder={placeholder}
                value={values[name]}
                onChange={(e) =>
                  setValues({ ...values, [name]: e.target.value })
                }
                aria-invalid={invalid}
                aria-describedby={invalid ? `${name}-error` : undefined}
                className={cn(control, "h-9")}
              />
            )}
            {invalid && (
              <p id={`${name}-error`} className="text-xs text-contact-deep">
                {errors[name]}
              </p>
            )}
          </div>
        );
      })}

      <Button
        type="submit"
        tone="contact"
        disabled={status === "sending" || !ACCESS_KEY}
        className="mt-2 py-4 text-base"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" />
            Sending…
          </>
        ) : (
          "Send Email"
        )}
      </Button>
    </form>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="mb-4 flex items-center gap-2 rounded-lg bg-contact/10 px-3.5 py-3 text-[13.5px] font-semibold text-contact-deep"
    >
      <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
