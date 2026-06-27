"use client";

import { useState } from "react";
import { sceneCategories } from "@/data/scenes";
import { trackEvent } from "@/lib/analytics-client";

type Status = "idle" | "submitting" | "success" | "error";
type Theme = "dark" | "light";

interface Props {
  theme?: Theme;
  compact?: boolean;
}

const themeClasses: Record<
  Theme,
  {
    label: string;
    optional: string;
    input: string;
    inputWrapper: string;
    checkbox: string;
    success: string;
    button: string;
    meta: string;
    alert: string;
  }
> = {
  dark: {
    label: "text-paper/60",
    optional: "text-paper/30",
    input:
      "text-paper placeholder:text-paper/30 focus:border-accent border-paper/20",
    inputWrapper: "bg-transparent",
    checkbox:
      "h-4 w-4 rounded border-paper/25 bg-transparent text-accent focus:ring-accent",
    success: "border border-paper/20 text-paper",
    button:
      "bg-paper text-ink hover:bg-accent hover:text-paper disabled:opacity-60",
    meta: "text-paper/50",
    alert: "border border-accent/40 text-accent",
  },
  light: {
    label: "text-muted",
    optional: "text-muted/60",
    input:
      "text-ink placeholder:text-muted/60 focus:border-accent border-rule bg-transparent",
    inputWrapper: "bg-transparent",
    checkbox:
      "h-4 w-4 rounded border-rule bg-paper text-accent focus:ring-accent",
    success: "border border-rule text-ink",
    button:
      "bg-ink text-paper hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed",
    meta: "text-muted",
    alert: "border border-accent/40 text-accent",
  },
};

export default function NominationForm({
  theme = "dark",
  compact = false,
}: Props) {
  const styles = themeClasses[theme];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const surface = compact ? "nomination_page" : "homepage_form";

  function markStart() {
    if (started) return;
    setStarted(true);
    trackEvent("nomination_start", { location: surface, surface });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    markStart();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const sourceLink = String(formData.get("sourceLink") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const honey = String(formData.get("company") ?? "").trim();

    if (honey) {
      trackEvent("nomination_success", {
        location: surface,
        surface,
        status: "honeypot",
      });
      setStatus("success");
      form.reset();
      return;
    }

    if (!looksLikeUrl(sourceLink)) {
      trackEvent("nomination_error", {
        location: surface,
        surface,
        status: "invalid_source_link",
      });
      setStatus("error");
      setError("Please include a usable source link so the archive can verify the scene.");
      return;
    }

    if (email && !looksLikeEmail(email)) {
      trackEvent("nomination_error", {
        location: surface,
        surface,
        status: "invalid_email",
      });
      setStatus("error");
      setError("That email address doesn't look valid yet.");
      return;
    }

    const payload = {
      scene: String(formData.get("scene") ?? ""),
      sourceLink,
      timestamp: String(formData.get("timestamp") ?? ""),
      languageGuess: String(formData.get("languageGuess") ?? ""),
      rememberedLine: String(formData.get("rememberedLine") ?? ""),
      why: String(formData.get("why") ?? ""),
      categoryGuess: String(formData.get("categoryGuess") ?? ""),
      name: String(formData.get("name") ?? ""),
      email,
      canHelpTranslateOrVerify: formData.get("canHelpTranslateOrVerify") === "on",
      company: honey,
    };

    trackEvent("nomination_submit", {
      location: surface,
      surface,
      category: payload.categoryGuess,
    });

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      trackEvent("nomination_success", {
        location: surface,
        surface,
        category: payload.categoryGuess,
      });
      setStatus("success");
      form.reset();
      setStarted(false);
    } catch (err) {
      trackEvent("nomination_error", {
        location: surface,
        surface,
        category: payload.categoryGuess,
        status: err instanceof Error ? err.message : "submission_error",
      });
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`${styles.success} p-8 sm:p-10`}
      >
        <div className="text-[10px] uppercase tracking-ultra text-accent">
          Received
        </div>
        <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Thank you. It&apos;s in the weekly queue now.
        </h3>
        <p className={`mt-4 max-w-prose-tight text-[16px] leading-[1.6] ${styles.meta}`}>
          We log every nomination with its source trail so it can move from
          candidate to research, verification, and eventually the archive.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-8 text-[10px] uppercase tracking-ultra transition-colors hover:text-accent ${styles.meta}`}
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={markStart}
      className="space-y-7"
      noValidate
    >
      <Field
        theme={theme}
        label="Scene / movie / show / person"
        name="scene"
        required
        placeholder="e.g. Rush Hour 2, a local news segment, or a politician"
      />
      <Field
        theme={theme}
        label="Source link"
        name="sourceLink"
        required
        type="url"
        placeholder="YouTube, IMDb, article, campaign page, clip, or archive link"
      />
      <Field
        theme={theme}
        label="Timestamp"
        name="timestamp"
        optional
        placeholder="00:47:12 if you know it"
      />
      <div className={`grid gap-7 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          theme={theme}
          label="Language guess"
          name="languageGuess"
          required
          placeholder="e.g. Cantonese, Taishanese, mixed Cantonese/English"
        />
        <SelectField
          theme={theme}
          label="Category guess"
          name="categoryGuess"
          required
          options={sceneCategories}
        />
      </div>
      <FieldArea
        theme={theme}
        label="What do you remember being said?"
        name="rememberedLine"
        placeholder="Original line, translation, or just the emotional gist if that’s all you remember."
      />
      <p className={`-mt-3 text-sm leading-[1.6] ${styles.meta}`}>
        You can nominate a scene even if you do not know the exact words yet.
        Approximate memory is still useful.
      </p>
      <FieldArea
        theme={theme}
        label="Why does it matter?"
        name="why"
        required
        placeholder="What felt culturally specific, revealing, or unforgettable about the scene?"
      />
      <div className={`grid gap-7 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          theme={theme}
          label="Name"
          name="name"
          optional
          placeholder="Optional public credit name"
        />
        <Field
          theme={theme}
          label="Email"
          name="email"
          optional
          type="email"
          placeholder="Optional, if you want a follow-up"
        />
      </div>
      <label className="flex items-start gap-3">
        <input
          name="canHelpTranslateOrVerify"
          type="checkbox"
          className={styles.checkbox}
        />
        <span className={`text-sm leading-[1.6] ${styles.meta}`}>
          I can help translate or verify this.
        </span>
      </label>
      <label className="hidden" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <div role="alert" className={`${styles.alert} px-4 py-3 text-sm`}>
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`group inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${styles.button}`}
        >
          {status === "submitting" ? "Sending..." : "Submit nomination"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <span className={`text-[10px] uppercase tracking-ultra ${styles.meta}`}>
          Static-first workflow · editorial review follows
        </span>
      </div>
    </form>
  );
}

function looksLikeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function Field({
  theme,
  label,
  name,
  required,
  optional,
  type = "text",
  placeholder,
}: {
  theme: Theme;
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const styles = themeClasses[theme];

  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className={`text-[10px] uppercase tracking-ultra ${styles.label}`}>
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </span>
        {optional && (
          <span className={`text-[10px] uppercase tracking-ultra ${styles.optional}`}>
            Optional
          </span>
        )}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`mt-2 w-full border-0 border-b py-2.5 text-[17px] outline-none transition-colors ${styles.inputWrapper} ${styles.input}`}
      />
    </label>
  );
}

function SelectField({
  theme,
  label,
  name,
  options,
  required,
}: {
  theme: Theme;
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
}) {
  const styles = themeClasses[theme];

  return (
    <label className="block">
      <div className={`text-[10px] uppercase tracking-ultra ${styles.label}`}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </div>
      <select
        name={name}
        required={required}
        defaultValue=""
        className={`mt-2 w-full appearance-none border-0 border-b py-2.5 text-[17px] outline-none transition-colors ${styles.inputWrapper} ${styles.input}`}
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldArea({
  theme,
  label,
  name,
  required,
  placeholder,
}: {
  theme: Theme;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  const styles = themeClasses[theme];

  return (
    <label className="block">
      <span className={`text-[10px] uppercase tracking-ultra ${styles.label}`}>
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <textarea
        name={name}
        rows={3}
        required={required}
        placeholder={placeholder}
        className={`mt-2 w-full resize-none border-0 border-b py-2.5 text-[17px] outline-none transition-colors ${styles.inputWrapper} ${styles.input}`}
      />
    </label>
  );
}
