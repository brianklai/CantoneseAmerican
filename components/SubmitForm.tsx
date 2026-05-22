"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubmitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
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
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="submit"
      className="relative overflow-hidden border-b border-rule bg-ink text-paper"
    >
      <div
        aria-hidden
        className="absolute -top-16 -right-8 sm:-right-12 font-serif text-[260px] sm:text-[360px] leading-none text-paper/[0.04] select-none pointer-events-none hidden md:block"
      >
        廣
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              Submit
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-[-0.01em] text-balance">
              Nominate a scene where your culture felt{" "}
              <span className="italic text-accent">American.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-[16px] leading-[1.6] max-w-prose-tight">
              A movie, a TV moment, a song lyric, a sign on a street. If it made
              you feel at home in America, we want it in the archive.
            </p>
            <div className="mt-8 text-[10px] uppercase tracking-ultra text-paper/50">
              All cultures welcome · Series 001 is Cantonese
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {status === "success" ? (
              <SuccessState onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-7" noValidate>
                <Field
                  label="Scene / movie / show"
                  name="scene"
                  required
                  placeholder="e.g. Rush Hour 2 (2001)"
                />
                <Field
                  label="Culture or language"
                  name="culture"
                  required
                  placeholder="e.g. Cantonese"
                />
                <Field
                  label="Link or timestamp"
                  name="link"
                  placeholder="YouTube link, IMDb, or 00:47:12"
                />
                <FieldArea
                  label="What was said?"
                  name="quote"
                  placeholder="The line, in original or translation."
                />
                <FieldArea
                  label="Why did it matter?"
                  name="why"
                  required
                  placeholder="A sentence or two — what it meant to you."
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  optional
                  placeholder="optional — if you want a reply"
                />

                {error && (
                  <div
                    role="alert"
                    className="text-sm text-accent border border-accent/40 px-4 py-3"
                  >
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-3 bg-paper text-ink px-6 py-3.5 text-sm font-medium hover:bg-accent hover:text-paper transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting"
                      ? "Sending…"
                      : "Submit to the archive"}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                  <span className="text-[10px] uppercase tracking-ultra text-paper/50">
                    No account · No spam
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  optional,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-ultra text-paper/60">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </span>
        {optional && (
          <span className="text-[10px] uppercase tracking-ultra text-paper/30">
            Optional
          </span>
        )}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-0 border-b border-paper/20 focus:border-accent outline-none py-2.5 text-[17px] text-paper placeholder:text-paper/30 transition-colors"
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-ultra text-paper/60">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <textarea
        name={name}
        rows={3}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-0 border-b border-paper/20 focus:border-accent outline-none py-2.5 text-[17px] text-paper placeholder:text-paper/30 transition-colors resize-none"
      />
    </label>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-paper/20 p-8 sm:p-10"
    >
      <div className="text-[10px] uppercase tracking-ultra text-accent">
        Received
      </div>
      <h3 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight">
        Thank you. It's in the archive now.
      </h3>
      <p className="mt-4 text-paper/70 text-[16px] leading-[1.6] max-w-prose-tight">
        We read every submission. If yours becomes a feature, we'll credit you —
        unless you'd rather we didn't.
      </p>
      <button
        onClick={onReset}
        className="mt-8 text-[10px] uppercase tracking-ultra text-paper/60 hover:text-accent transition-colors"
      >
        Submit another →
      </button>
    </div>
  );
}
