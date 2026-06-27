import {
  getSceneMetaDescription,
  getSceneSearchTitle,
  scenes,
  type Scene,
  type SceneSource,
  type TranscriptLine,
} from "../data/scenes.ts";

type IssueLevel = "ERROR" | "WARN";

interface Issue {
  level: IssueLevel;
  sceneId: string;
  message: string;
}

const issues: Issue[] = [];

for (const scene of scenes) {
  validateScene(scene);
}

reportIssues();

function validateScene(scene: Scene) {
  requireText(scene, "id", scene.id);
  requireText(scene, "slug", scene.slug);
  requireText(scene, "title", scene.title);
  requireText(scene, "category", scene.category);
  requireText(scene, "media.mediaStatus", scene.media.mediaStatus);
  requireText(scene, "confidenceStatus", scene.confidenceStatus);
  requireText(scene, "editorialStatus", scene.editorialStatus);

  if (scene.lastVerifiedAt && !isIsoDate(scene.lastVerifiedAt)) {
    warn(scene, `lastVerifiedAt should be YYYY-MM-DD, received "${scene.lastVerifiedAt}"`);
  }

  scene.sources.forEach((source, index) => validateSource(scene, source, index));

  if (scene.transcriptLines.length > 0) {
    scene.transcriptLines.forEach((line, index) =>
      validateTranscriptLine(scene, line, index),
    );
  }

  if (scene.status === "published") {
    validatePublishedScene(scene);
  }

  if (scene.status !== "published" && scene.publishedAt.trim()) {
    warn(scene, "draft or hidden scene should not carry a publishedAt date");
  }

  if (
    scene.status === "published" &&
    !["published", "needs-native-review", "needs-transcription"].includes(
      scene.editorialStatus,
    )
  ) {
    warn(
      scene,
      `published scene should usually have editorialStatus="published", received "${scene.editorialStatus}"`,
    );
  }

  if (scene.editorialStatus === "ready-to-publish") {
    validateReadyToPublishScene(scene);
  }

  if (
    scene.confidenceStatus === "Needs review" &&
    scene.verificationNotes.length === 0 &&
    (scene.status === "published" || scene.editorialStatus === "ready-to-publish")
  ) {
    warn(scene, "confidenceStatus is Needs review but verificationNotes are empty");
  }

  if (
    scene.confidenceStatus === "Needs review" &&
    !scene.lastVerifiedAt &&
    (scene.status === "published" || scene.editorialStatus === "ready-to-publish")
  ) {
    warn(scene, "confidenceStatus is Needs review but lastVerifiedAt is missing");
  }

  if (scene.media.mediaStatus === "removed" && !scene.media.removalNote?.trim()) {
    warn(scene, "removed media should include a removalNote for transparency");
  }
}

function validatePublishedScene(scene: Scene) {
  if (!scene.description.trim() && !scene.subtitle.trim()) {
    error(scene, "scene needs either a description or a subtitle");
  }

  requireText(scene, "publishedAt", scene.publishedAt);

  if (!isIsoDate(scene.publishedAt)) {
    error(scene, `publishedAt should be YYYY-MM-DD, received "${scene.publishedAt}"`);
  }

  if (
    !scene.poster.title.trim() ||
    !scene.poster.subtitle.trim() ||
    !scene.poster.topMeta.trim()
  ) {
    error(
      scene,
      "poster.title, poster.subtitle, and poster.topMeta are required for share images",
    );
  }

  if (scene.sources.length === 0) {
    error(scene, "published scene must include at least one source");
  }

  const hasRightsTrail =
    Boolean(scene.media.officialUrl?.trim()) ||
    Boolean(scene.media.rightsHolder.trim()) ||
    Boolean(scene.media.rightsNotes?.trim());

  if (!hasRightsTrail) {
    error(
      scene,
      "scene needs either an officialUrl or a rightsHolder/rightsNotes trail",
    );
  }

  if (
    scene.transcriptLines.length === 0 &&
    scene.transcriptReviewNotes?.length === 0 &&
    !["needs-transcription", "needs-native-review"].includes(scene.editorialStatus)
  ) {
    warn(
      scene,
      'scene has no transcript lines; consider editorialStatus="needs-transcription" if transcription is still pending',
    );
  }

  if (!scene.sources.some((source) => source.type === "official")) {
    warn(
      scene,
      "no official source is attached yet; archive entry may still need stronger citation",
    );
  }

  if (!scene.media.officialUrl?.trim() && !scene.media.rightsNotes?.trim()) {
    warn(scene, "published scene should include an officialUrl or rights note");
  }

  if (!scene.ogTitle?.trim()) {
    warn(scene, "published scene is missing ogTitle for stronger search/social metadata");
  }

  if (!scene.ogDescription?.trim()) {
    warn(
      scene,
      "published scene is missing ogDescription for stronger search/social metadata",
    );
  }

  if (!getSceneSearchTitle(scene).trim() || !getSceneMetaDescription(scene).trim()) {
    error(scene, "published scene metadata helpers returned empty title or description");
  }

  if (!scene.coverTitle?.trim()) {
    warn(scene, "published scene is missing coverTitle for social packaging");
  }

  if (!scene.shortCaption?.trim()) {
    warn(scene, "published scene is missing shortCaption for social packaging");
  }

  if (!scene.hashtags || scene.hashtags.length === 0) {
    warn(scene, "published scene is missing hashtags for social packaging");
  }
}

function validateReadyToPublishScene(scene: Scene) {
  if (!scene.coverTitle?.trim()) {
    warn(scene, "ready-to-publish scene is missing coverTitle");
  }

  if (!scene.shortCaption?.trim()) {
    warn(scene, "ready-to-publish scene is missing shortCaption");
  }

  if (!scene.hashtags || scene.hashtags.length === 0) {
    warn(scene, "ready-to-publish scene is missing hashtags");
  }

  if (!scene.socialHook?.trim()) {
    warn(scene, "ready-to-publish scene is missing socialHook");
  }

  if (!scene.callToAction?.trim()) {
    warn(scene, "ready-to-publish scene is missing callToAction");
  }

  if (scene.sources.length === 0) {
    warn(scene, "ready-to-publish scene should include at least one source");
  }

  const hasRightsTrail =
    Boolean(scene.media.officialUrl?.trim()) ||
    Boolean(scene.media.rightsHolder.trim()) ||
    Boolean(scene.media.rightsNotes?.trim());

  if (!hasRightsTrail) {
    warn(scene, "ready-to-publish scene should include an officialUrl or rights note");
  }

  if (scene.transcriptLines.length > 0) {
    scene.transcriptLines.forEach((line, index) =>
      validateTranscriptLine(scene, line, index),
    );
  }
}

function validateSource(scene: Scene, source: SceneSource, index: number) {
  const prefix = `sources[${index}]`;

  requireText(scene, `${prefix}.label`, source.label);
  requireText(scene, `${prefix}.url`, source.url);
  requireText(scene, `${prefix}.type`, source.type);

  if (source.supports.length === 0) {
    warn(scene, `${prefix} should explain what it supports`);
  }

  if (source.accessedAt && !isIsoDate(source.accessedAt)) {
    warn(
      scene,
      `${prefix}.accessedAt should be YYYY-MM-DD, received "${source.accessedAt}"`,
    );
  }
}

function validateTranscriptLine(scene: Scene, line: TranscriptLine, index: number) {
  const prefix = `transcriptLines[${index}]`;

  if (!line.original?.trim() && !line.text?.trim()) {
    error(scene, `${prefix} needs either original or text`);
  }

  if (!line.translation?.trim()) {
    warn(scene, `${prefix}.translation is missing`);
  }

  requireText(scene, `${prefix}.confidence`, line.confidence);

  if (
    line.flags?.some((flag) => flag === "derogatory-language") &&
    scene.contentWarnings?.length === 0
  ) {
    warn(scene, `${prefix} has derogatory-language flag but no content warning`);
  }
}

function requireText(scene: Scene, field: string, value: string | undefined) {
  if (!value || value.trim() === "") {
    error(scene, `${field} is required`);
  }
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function error(scene: Scene, message: string) {
  issues.push({ level: "ERROR", sceneId: scene.id, message });
}

function warn(scene: Scene, message: string) {
  issues.push({ level: "WARN", sceneId: scene.id, message });
}

function reportIssues() {
  const publishedCount = scenes.filter((scene) => scene.status === "published").length;
  const draftCount = scenes.filter((scene) => scene.status === "draft").length;

  if (issues.length === 0) {
    console.log(
      `validate:scenes OK - checked ${scenes.length} scene(s): ${publishedCount} published, ${draftCount} draft.`,
    );
    return;
  }

  const errors = issues.filter((issue) => issue.level === "ERROR");
  const warnings = issues.filter((issue) => issue.level === "WARN");

  console.log(
    `validate:scenes checked ${scenes.length} scene(s): ${publishedCount} published, ${draftCount} draft, ${errors.length} error(s), ${warnings.length} warning(s).`,
  );

  for (const issue of issues) {
    console.log(`${issue.level} scene ${issue.sceneId}: ${issue.message}`);
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}
