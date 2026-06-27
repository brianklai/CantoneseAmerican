import CommentaryVideo from "@/components/CommentaryVideo";
import MediaBlock from "@/components/MediaBlock";
import SceneViewTracker from "@/components/SceneViewTracker";
import TrackedLink from "@/components/TrackedLink";
import {
  formatEditorialStatus,
  formatSceneCredits,
  formatSceneSource,
  formatSourceType,
  getNextScene,
  getPreviousScene,
  getRelatedScenes,
  getSceneDisplayNumber,
  getSceneSocialLinks,
  type Scene,
} from "@/data/scenes";

export default function SceneRecord({ scene }: { scene: Scene }) {
  const relatedScenes = getRelatedScenes(scene);
  const transcriptLead = scene.transcriptLines[0];
  const transcriptLeadText = transcriptLead ? getTranscriptText(transcriptLead) : "";
  const credits = formatSceneCredits(scene);
  const editorialVideos = scene.socialEmbeds.filter((embed) => embed.hostedUrl);
  const notices = getSceneNotices(scene);
  const previousScene = getPreviousScene(scene);
  const nextScene = getNextScene(scene);
  const socialLinks = getSceneSocialLinks(scene);

  return (
    <article className="relative">
      <SceneViewTracker
        sceneId={scene.id}
        sceneSlug={scene.slug}
        category={scene.category}
        workTitle={scene.workTitle}
      />

      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Archive scene · No. {getSceneDisplayNumber(scene)}
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] text-balance sm:text-5xl lg:text-[68px]">
                {scene.title}
              </h1>
              <p className="mt-5 max-w-prose-tight text-lg leading-[1.5] text-ink/78 text-pretty">
                {scene.subtitle}
              </p>
              <div className="mt-6 text-sm text-muted">{formatSceneSource(scene)}</div>
              <div className="mt-8 flex flex-wrap gap-2">
                <MetaTag>{scene.category}</MetaTag>
                {scene.workType && <MetaTag>{scene.workType}</MetaTag>}
                {scene.languageTags.map((tag) => (
                  <MetaTag key={tag}>{tag}</MetaTag>
                ))}
                <MetaTag>{scene.confidenceStatus}</MetaTag>
                <MetaTag>{formatEditorialStatus(scene.editorialStatus)}</MetaTag>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <MediaBlock scene={scene} />
            </div>
          </div>

          {notices.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {notices.map((notice) => (
                <NoticeCard
                  key={`${notice.title}-${notice.body}`}
                  title={notice.title}
                  body={notice.body}
                />
              ))}
            </div>
          )}

          <div className="mt-14 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-16 sm:pt-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Pull quote
              </div>
              <blockquote className="mt-4 font-serif text-2xl leading-[1.25] text-pretty sm:text-[28px]">
                &ldquo;{scene.pullQuote}&rdquo;
              </blockquote>
            </div>

            <div className="col-span-12 space-y-5 text-[17px] leading-[1.65] text-ink/85 text-pretty lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-2xl leading-[1.35] text-ink">
                {scene.description}
              </p>
              {scene.commentary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {scene.contextSections && scene.contextSections.length > 0 && (
            <div className="mt-16 grid gap-5 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:grid-cols-2">
              {scene.contextSections.map((section) => (
                <section key={section.title} className="border border-rule p-5 sm:p-6">
                  <div className="text-[10px] uppercase tracking-ultra text-muted">
                    {section.title}
                  </div>
                  <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-ink/80 text-pretty">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Transcript
              </div>
              {transcriptLead ? (
                <>
                  <div className="mt-4 font-serif text-[40px] leading-[1.05] tracking-[-0.01em] text-balance sm:text-[56px]">
                    {transcriptLeadText}
                  </div>
                  {transcriptLead.jyutping && (
                    <div className="mt-3 font-mono text-sm tracking-wide text-muted sm:text-base">
                      {transcriptLead.jyutping}
                    </div>
                  )}
                  {transcriptLead.translation && (
                    <div className="mt-3 font-serif text-xl italic text-ink/80 sm:text-2xl">
                      {transcriptLead.translation}
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  title="Transcript still in progress"
                  body="The archive entry is live, but line-by-line transcription has not been published yet."
                />
              )}
            </div>

            <div className="col-span-12 lg:col-span-8">
              {scene.transcriptLines.length > 0 ? (
                <div className="grid gap-4">
                  {scene.transcriptLines.map((line, index) => (
                    <TranscriptLineCard
                      key={line.id ?? `${getTranscriptText(line)}-${index}`}
                      line={line}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No transcript published yet"
                  body="This scene can still carry commentary, sources, and cultural notes before its final transcript is ready."
                />
              )}

              {scene.transcriptReviewNotes && scene.transcriptReviewNotes.length > 0 && (
                <div className="mt-5 border border-rule p-5 sm:p-6">
                  <div className="text-[10px] uppercase tracking-ultra text-accent">
                    Transcript notes
                  </div>
                  <div className="mt-4 grid gap-3 text-[15px] leading-[1.6] text-ink/78">
                    {scene.transcriptReviewNotes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Archive file
              </div>
            </div>
            <div className="col-span-12 grid gap-5 sm:grid-cols-2 lg:col-span-8">
              <InfoBlock
                title="Published"
                body={formatPublishedDate(scene.publishedAt)}
              />
              <InfoBlock
                title="Editorial status"
                body={formatEditorialStatus(scene.editorialStatus)}
              />
              <InfoBlock title="Confidence" body={scene.confidenceStatus} />
              <InfoBlock
                title="Last verified"
                body={
                  scene.lastVerifiedAt
                    ? formatPublishedDate(scene.lastVerifiedAt)
                    : "Verification date pending"
                }
              />
              <InfoBlock
                title="Locations"
                body={scene.locationTags.join(" · ")}
              />
              <InfoBlock
                title="Rights holder"
                body={scene.media.rightsHolder}
              />
              {credits.map((credit) => (
                <InfoBlock key={credit} title="Credit" body={credit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {(scene.socialHook || scene.shortCaption || scene.hashtags?.length || socialLinks.length > 0) && (
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
              <div className="col-span-12 lg:col-span-4">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Social packaging
                </div>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                  Built to travel,
                  <span className="italic"> without losing context.</span>
                </h2>
              </div>
              <div className="col-span-12 grid gap-5 lg:col-span-7 lg:col-start-6">
                {scene.coverTitle && (
                  <InfoBlock title="Cover title" body={scene.coverTitle} />
                )}
                {scene.socialHook && (
                  <InfoBlock title="Social hook" body={scene.socialHook} />
                )}
                {scene.shortCaption && (
                  <InfoBlock title="Short caption" body={scene.shortCaption} />
                )}
                {scene.callToAction && (
                  <InfoBlock title="Call to action" body={scene.callToAction} />
                )}
                {scene.hashtags && scene.hashtags.length > 0 && (
                  <InfoBlock
                    title="Hashtags"
                    body={scene.hashtags.join(" ")}
                  />
                )}
                {socialLinks.length > 0 && (
                  <div className="border border-rule p-5">
                    <div className="text-[10px] uppercase tracking-ultra text-muted">
                      Published links
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {socialLinks.map((link) => (
                        <TrackedLink
                          key={link.label}
                          href={link.href}
                          event="social_click"
                          payload={{
                            sceneId: scene.id,
                            sceneSlug: scene.slug,
                            platform: link.label,
                            location: "scene_page",
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink/72 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {link.label} →
                        </TrackedLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Verification
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                Source trail,
                <span className="italic"> kept visible.</span>
              </h2>
            </div>
            <div className="col-span-12 space-y-4 lg:col-span-7 lg:col-start-6">
              {scene.sources.map((source) => (
                <div key={`${source.label}-${source.url}`} className="border border-rule p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-serif text-2xl leading-tight text-ink">
                      {source.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-ultra text-muted">
                      {formatSourceType(source.type)}
                    </div>
                  </div>
                  {source.type === "official" ? (
                    <TrackedLink
                      href={source.url}
                      event="official_source_click"
                      payload={{
                        sceneId: scene.id,
                        sceneSlug: scene.slug,
                        sourceLabel: source.label,
                        location: "verification_section",
                      }}
                      target={source.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        source.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-3 block break-all text-sm text-ink/72 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {source.url}
                    </TrackedLink>
                  ) : (
                    <a
                      href={source.url}
                      target={source.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        source.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-3 block break-all text-sm text-ink/72 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {source.url}
                    </a>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {source.supports.map((support) => (
                      <MetaTag key={support}>{support}</MetaTag>
                    ))}
                  </div>
                  {source.accessedAt && (
                    <div className="mt-4 text-xs text-muted">
                      Accessed {formatPublishedDate(source.accessedAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Verification notes
              </div>
            </div>
            <div className="col-span-12 space-y-4 text-[16px] leading-[1.7] text-ink/80 text-pretty lg:col-span-7 lg:col-start-6">
              {scene.verificationNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
              {scene.media.rightsNotes && (
                <div className="border border-rule p-5 text-[15px] leading-[1.7] text-ink/75">
                  <div className="text-[10px] uppercase tracking-ultra text-muted">
                    Rights note
                  </div>
                  <p className="mt-3">{scene.media.rightsNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Why it matters
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                Cultural archive, <span className="italic">not just clip.</span>
              </h2>
            </div>

            <div className="col-span-12 grid gap-5 lg:col-span-7 lg:col-start-6">
              {scene.culturalSignificance.map((item) => (
                <div
                  key={item}
                  className="border-l-2 border-accent pl-5 text-[17px] leading-[1.65] text-ink/85 text-pretty"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Accuracy notes
              </div>
            </div>
            <div className="col-span-12 space-y-4 text-[16px] leading-[1.65] text-ink/78 text-pretty lg:col-span-7 lg:col-start-6">
              {scene.accuracyNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(editorialVideos.length > 0 || relatedScenes.length > 0) && (
        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
              {editorialVideos.length > 0 && (
                <div className="col-span-12 lg:col-span-4">
                  <CommentaryVideo
                    videoSrc={editorialVideos[0].hostedUrl!}
                    caption={editorialVideos[0].label}
                  />
                </div>
              )}

              {relatedScenes.length > 0 && (
                <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                  <div className="text-[10px] uppercase tracking-ultra text-muted">
                    Related scenes
                  </div>
                  <div className="mt-5 grid gap-4">
                    {relatedScenes.map((relatedScene) => (
                      <TrackedLink
                        key={relatedScene.id}
                        href={`/archive/${relatedScene.slug}`}
                        event="related_scene_click"
                        payload={{
                          sceneId: scene.id,
                          sceneSlug: scene.slug,
                          relatedSceneId: relatedScene.id,
                          relatedSceneSlug: relatedScene.slug,
                          location: "related_scenes",
                        }}
                        className="group border border-rule p-5 transition-colors hover:border-ink"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-[10px] uppercase tracking-ultra text-muted">
                            No. {getSceneDisplayNumber(relatedScene)} · {relatedScene.category}
                          </div>
                          <div className="text-sm text-muted transition-transform group-hover:translate-x-1">
                            Read scene →
                          </div>
                        </div>
                        <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
                          {relatedScene.title}
                        </div>
                        <p className="mt-3 max-w-prose-tight text-sm leading-[1.7] text-ink/70">
                          {relatedScene.subtitle}
                        </p>
                      </TrackedLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Continue the archive
              </div>
            </div>
            <div className="col-span-12 grid gap-4 lg:col-span-7 lg:col-start-6">
              {previousScene && (
                <SceneNavCard
                  label="Previous scene"
                  scene={previousScene}
                  currentScene={scene}
                />
              )}
              {nextScene && (
                <SceneNavCard
                  label="Next scene"
                  scene={nextScene}
                  currentScene={scene}
                />
              )}
              <div className="border border-rule p-5">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Keep it growing
                </div>
                <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
                  Nominate the next scene.
                </div>
                <p className="mt-3 max-w-prose-tight text-sm leading-[1.7] text-ink/72">
                  The archive is built week by week. If you know the next clip,
                  broadcast moment, or everyday exchange that belongs here, send
                  it into the queue.
                </p>
                <div className="mt-5">
                  <TrackedLink
                    href="/nominate"
                    event="nominate_click"
                    payload={{
                      sceneId: scene.id,
                      sceneSlug: scene.slug,
                      location: "scene_continue",
                    }}
                    className="text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    Nominate a scene →
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function MetaTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </span>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-rule p-5">
      <div className="text-[10px] uppercase tracking-ultra text-muted">{title}</div>
      <div className="mt-3 text-[15px] leading-[1.6] text-ink/80">{body}</div>
    </div>
  );
}

function NoticeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-rule bg-paper p-5">
      <div className="text-[10px] uppercase tracking-ultra text-accent">{title}</div>
      <p className="mt-3 text-[15px] leading-[1.7] text-ink/75">{body}</p>
    </div>
  );
}

function TranscriptLineCard({
  line,
  index,
}: {
  line: Scene["transcriptLines"][number];
  index: number;
}) {
  const text = getTranscriptText(line);
  const timestamp = getTranscriptTimestamp(line);

  return (
    <div className="border border-rule p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          {line.speaker ? `${line.speaker} · ` : ""}
          Line {String(index + 1).padStart(2, "0")}
        </div>
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          {timestamp} · {formatTranscriptConfidence(line.confidence)}
        </div>
      </div>

      {line.flags && line.flags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {line.flags.map((flag) => (
            <MetaTag key={flag}>{flag.replace(/-/g, " ")}</MetaTag>
          ))}
        </div>
      )}

      <div className="mt-4 font-serif text-2xl leading-[1.2] text-ink sm:text-3xl">
        {text}
      </div>
      {line.jyutping && (
        <div className="mt-3 font-mono text-sm tracking-wide text-muted">
          {line.jyutping}
        </div>
      )}
      {line.translation && (
        <div className="mt-3 text-base leading-[1.6] text-ink/80">
          {line.translation}
        </div>
      )}
      {line.notes && line.notes.length > 0 && (
        <div className="mt-4 grid gap-2 border-t border-rule pt-4 text-sm leading-[1.6] text-muted">
          {line.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-rule p-6">
      <div className="font-serif text-2xl text-ink">{title}</div>
      <p className="mt-3 text-[15px] leading-[1.7] text-ink/72">{body}</p>
    </div>
  );
}

function SceneNavCard({
  label,
  scene,
  currentScene,
}: {
  label: string;
  scene: Scene;
  currentScene: Scene;
}) {
  return (
    <TrackedLink
      href={`/archive/${scene.slug}`}
      event="related_scene_click"
      payload={{
        sceneId: currentScene.id,
        sceneSlug: currentScene.slug,
        relatedSceneId: scene.id,
        relatedSceneSlug: scene.slug,
        location: label.toLowerCase().replace(/\s+/g, "-"),
      }}
      className="group border border-rule p-5 transition-colors hover:border-ink"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          {label} · No. {getSceneDisplayNumber(scene)}
        </div>
        <div className="text-sm text-muted transition-transform group-hover:translate-x-1">
          Read scene →
        </div>
      </div>
      <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
        {scene.title}
      </div>
      <p className="mt-3 max-w-prose-tight text-sm leading-[1.7] text-ink/70">
        {scene.subtitle}
      </p>
    </TrackedLink>
  );
}

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function getSceneNotices(scene: Scene) {
  const notices: Array<{ title: string; body: string }> = [];

  if (scene.contentWarnings && scene.contentWarnings.length > 0) {
    notices.push({
      title: "Content warning",
      body: scene.contentWarnings.join(" "),
    });
  }

  if (scene.editorialStatus === "needs-native-review") {
    notices.push({
      title: "Native review needed",
      body:
        "This entry is waiting on a fluent listener to confirm line readings, dialect nuances, or translation choices.",
    });
  }

  if (scene.editorialStatus === "needs-transcription" || scene.transcriptLines.length === 0) {
    notices.push({
      title: "Transcript not finished",
      body:
        "The archive record is live, but transcription work is still underway and may be published later.",
    });
  }

  if (scene.confidenceStatus === "Unclear audio") {
    notices.push({
      title: "Audio remains unclear",
      body:
        "Some words are still difficult to hear cleanly, so the current transcript and translation should be treated as provisional.",
    });
  }

  if (scene.confidenceStatus === "Needs review") {
    notices.push({
      title: "Verification still open",
      body:
        "This page is published so the cultural record stays visible, but one or more scene details still need source-level confirmation.",
    });
  }

  return notices;
}

function getTranscriptText(line: Scene["transcriptLines"][number]) {
  return line.original ?? line.text ?? "Transcript text pending";
}

function getTranscriptTimestamp(line: Scene["transcriptLines"][number]) {
  if (line.timestampStart && line.timestampEnd) {
    return `${line.timestampStart}-${line.timestampEnd}`;
  }

  return line.timestampStart ?? line.timestamp ?? "Timestamp pending";
}

function formatTranscriptConfidence(
  confidence: Scene["transcriptLines"][number]["confidence"],
) {
  return `${confidence.replace(/-/g, " ")} confidence`;
}
