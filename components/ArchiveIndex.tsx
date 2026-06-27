"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import TrackedLink from "@/components/TrackedLink";
import {
  confidenceStatuses,
  editorialStatuses,
  formatEditorialStatus,
  formatSceneDecade,
  formatSceneSource,
  getSceneDecade,
  getSceneDisplayNumber,
  type Scene,
  workTypes,
} from "@/data/scenes";
import { trackEvent } from "@/lib/analytics-client";

export default function ArchiveIndex({ scenes }: { scenes: Scene[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [confidenceStatus, setConfidenceStatus] = useState("");
  const [editorialStatus, setEditorialStatus] = useState("");
  const [decade, setDecade] = useState("");
  const [year, setYear] = useState("");
  const [workType, setWorkType] = useState("");
  const deferredQuery = useDeferredValue(query);

  const categories = uniqueValues(scenes.map((scene) => scene.category));
  const languages = uniqueValues(scenes.flatMap((scene) => scene.languageTags));
  const decades = uniqueValues(
    scenes
      .map((scene) => getSceneDecade(scene))
      .filter((value): value is number => typeof value === "number"),
  ).sort((a, b) => b - a);
  const years = uniqueValues(
    scenes
      .map((scene) => scene.year)
      .filter((value): value is number => typeof value === "number"),
  ).sort((a, b) => b - a);

  const filteredScenes = scenes.filter((scene) => {
    const searchableText = [
      scene.title,
      scene.subtitle,
      scene.description,
      scene.workTitle,
      scene.creator,
      scene.director,
      scene.network,
      scene.studio,
      ...scene.languageTags,
      ...scene.locationTags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

    return (
      matchesQuery &&
      (category === "" || scene.category === category) &&
      (language === "" || scene.languageTags.includes(language)) &&
      (confidenceStatus === "" || scene.confidenceStatus === confidenceStatus) &&
      (editorialStatus === "" || scene.editorialStatus === editorialStatus) &&
      (workType === "" || scene.workType === workType) &&
      (decade === "" || String(getSceneDecade(scene)) === decade) &&
      (year === "" || String(scene.year ?? "") === year)
    );
  });

  const hasActiveFilters =
    query !== "" ||
    category !== "" ||
    language !== "" ||
    confidenceStatus !== "" ||
    editorialStatus !== "" ||
    decade !== "" ||
    year !== "" ||
    workType !== "";

  function clearFilters() {
    setQuery("");
    setCategory("");
    setLanguage("");
    setConfidenceStatus("");
    setEditorialStatus("");
    setDecade("");
    setYear("");
    setWorkType("");
    trackEvent("category_filter", {
      filter: "clear",
      value: "all",
      surface: "archive_index",
    });
  }

  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Archive index
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
              Search the record,
              <br />
              <span className="italic">scene by scene.</span>
            </h1>
            <p className="mt-5 max-w-prose-tight text-lg leading-[1.55] text-ink/78 text-pretty">
              Published entries stay readable even while verification,
              transcription, or media handling continues behind the scenes.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="border border-rule p-5 sm:p-6">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <FilterInput
                  label="Search"
                  value={query}
                  onChange={setQuery}
                  placeholder="Don Cheadle, bus scene, Los Angeles..."
                />
                <FilterSelect
                  label="Category"
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                    trackEvent("category_filter", {
                      filter: "category",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={categories}
                />
                <FilterSelect
                  label="Language"
                  value={language}
                  onChange={(value) => {
                    setLanguage(value);
                    trackEvent("category_filter", {
                      filter: "language",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={languages}
                />
                <FilterSelect
                  label="Confidence"
                  value={confidenceStatus}
                  onChange={(value) => {
                    setConfidenceStatus(value);
                    trackEvent("category_filter", {
                      filter: "confidence",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={[...confidenceStatuses]}
                />
                <FilterSelect
                  label="Editorial status"
                  value={editorialStatus}
                  onChange={(value) => {
                    setEditorialStatus(value);
                    trackEvent("category_filter", {
                      filter: "editorial_status",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={editorialStatuses.map((status) =>
                    formatEditorialStatus(status),
                  )}
                  actualValues={[...editorialStatuses]}
                />
                <FilterSelect
                  label="Decade"
                  value={decade}
                  onChange={(value) => {
                    setDecade(value);
                    trackEvent("category_filter", {
                      filter: "decade",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={decades.map((value) => `${value}s`)}
                  actualValues={decades.map(String)}
                />
                <FilterSelect
                  label="Year"
                  value={year}
                  onChange={(value) => {
                    setYear(value);
                    trackEvent("category_filter", {
                      filter: "year",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={years.map(String)}
                />
                <FilterSelect
                  label="Work type"
                  value={workType}
                  onChange={(value) => {
                    setWorkType(value);
                    trackEvent("category_filter", {
                      filter: "work_type",
                      value: value || "all",
                      surface: "archive_index",
                    });
                  }}
                  options={[...workTypes]}
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  {filteredScenes.length} result{filteredScenes.length === 1 ? "" : "s"} ·{" "}
                  {scenes.length} published in archive
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-accent"
                  >
                    Clear filters →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {filteredScenes.map((scene) => (
            <Link
              key={scene.id}
              href={`/archive/${scene.slug}`}
              className="group border border-rule bg-paper p-5 transition-colors hover:border-ink"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-ultra text-muted">
                <span>No. {getSceneDisplayNumber(scene)}</span>
                <span>{scene.workType ?? "Work type pending"}</span>
              </div>
              <div className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.01em] text-ink">
                {scene.title}
              </div>
              <p className="mt-3 text-[15px] leading-[1.7] text-ink/74">
                {scene.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>{scene.category}</Tag>
                <Tag>{scene.confidenceStatus}</Tag>
                <Tag>{formatEditorialStatus(scene.editorialStatus)}</Tag>
                <Tag>{formatSceneDecade(scene)}</Tag>
              </div>
              <div className="mt-5 text-sm text-muted">{formatSceneSource(scene)}</div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                <span>{scene.languageTags.join(" · ")}</span>
                <span>
                  {scene.lastVerifiedAt
                    ? `Verified ${formatShortDate(scene.lastVerifiedAt)}`
                    : "Verification pending"}
                </span>
              </div>
              <div className="mt-5 text-sm text-ink/72 transition-transform group-hover:translate-x-1">
                Read archive entry →
              </div>
            </Link>
          ))}
        </div>

        {filteredScenes.length === 0 && (
          <div className="mt-12 border border-dashed border-rule px-6 py-10 sm:mt-16 sm:px-8">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              No exact match yet
            </div>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
              The archive may know the feeling even if this filter set doesn&apos;t.
            </h2>
            <p className="mt-4 max-w-prose-tight text-[16px] leading-[1.7] text-ink/72">
              Try clearing a few filters, searching by a work title instead of a
              quote, or nominate the scene you&apos;re looking for so it can enter the
              weekly queue.
            </p>
            <div className="mt-6">
              <TrackedLink
                href="/nominate"
                event="nominate_click"
                payload={{ location: "archive_empty_state", surface: "archive_index" }}
                className="text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Nominate a scene →
              </TrackedLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-ultra text-muted">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-rule bg-transparent py-2.5 text-[16px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
      />
    </label>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  actualValues,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  actualValues?: string[];
}) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-ultra text-muted">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none border-0 border-b border-rule bg-transparent py-2.5 text-[16px] text-ink outline-none transition-colors focus:border-accent"
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option
            key={`${label}-${option}`}
            value={actualValues ? actualValues[index] : option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </span>
  );
}

function uniqueValues<T>(items: T[]) {
  return Array.from(new Set(items));
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
