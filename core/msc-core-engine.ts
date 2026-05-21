/**
 * Video embed contracts, stream providers, and portal metadata
 * Synthesized from MSC-Core-Pro-v2 UI contracts + WordPress engine module map (Presto/Bunny/ACF).
 * Provider-agnostic; wire PHP bridges (MSC-Core-scriptz, bunny-api-bridge) in consumer projects.
 */

/** Supported video delivery backends */
export type MscVideoProvider = "youtube" | "presto" | "bunny" | "hls" | "vimeo" | "custom"

/** Single playable asset reference */
export type MscVideoSource = {
  provider: MscVideoProvider
  /** Provider-native id (YouTube id, Bunny video guid, Presto media id, HLS manifest path) */
  id: string
  /** Optional signed or CDN URL when not derivable from id */
  streamUrl?: string
  /** Library / collection id (Bunny library, Presto playlist) */
  libraryId?: string
}

/** Portal card / grid row (MSC-Core-Pro VideoData universalized) */
export type MscVideoPortalItem = {
  id: string
  title: string
  category: string
  source: MscVideoSource
  thumbnail: string
  duration: string
  completed: boolean
  views?: number
  description?: string
  /** ACF or CMS field keys for dynamic mapping */
  acfKeys?: {
    featured?: string
    gallery?: string
    categoryTaxonomy?: string
  }
}

/** Analytics / completion tracking schema */
export type MscVideoTrackingEvent = {
  videoId: string
  provider: MscVideoProvider
  event: "impression" | "play" | "progress" | "complete" | "error"
  positionSec?: number
  userId?: string | number
  sessionId?: string
  occurredAt: string
}

/** WordPress / PHP engine module registry (conceptual — implement in consumer plugin) */
export type MscMediaEngineModule = {
  id: string
  title: string
  file: string
  description: string
  tags: string[]
}

export const MSC_MEDIA_ENGINE_MODULES: MscMediaEngineModule[] = [
  {
    id: "scriptz",
    title: "MSC-Core-Scriptz Engine",
    file: "MSC-Core-scriptz.php",
    description:
      "Shortcode registration, video ID resolution, and dynamic iframe injection for Presto Player embeds.",
    tags: ["PHP", "Shortcodes", "Core"],
  },
  {
    id: "acf",
    title: "ACF Field Mapping",
    file: "acf-fields.json",
    description:
      "Featured video, gallery grid, and category taxonomy bindings for page layouts.",
    tags: ["ACF", "JSON", "Fields"],
  },
  {
    id: "cache",
    title: "Cache Management Layer",
    file: "msc-cache-handler.php",
    description:
      "Static CSS generation, theme builder cache integration, and CDN purge triggers.",
    tags: ["Cache", "CDN", "Performance"],
  },
  {
    id: "bunny",
    title: "Bunny.net API Router",
    file: "bunny-api-bridge.php",
    description:
      "Streaming API auth, video library sync, and pull zone configuration.",
    tags: ["API", "Bunny.net", "Streaming"],
  },
  {
    id: "lightbox",
    title: "Lightbox Controller",
    file: "custom-lightbox.js",
    description:
      "Click interception, Presto API player init, and fullscreen overlay transitions.",
    tags: ["JavaScript", "Frontend", "UX"],
  },
]

/** Environment contract for stream/CDN integrations (placeholders only). */
export type MscStreamEnvConfig = {
  bunnyApiKey?: string
  bunnyLibraryId?: string
  bunnyCdnHostname?: string
  prestoLicenseKey?: string
  youtubeApiKey?: string
}

export function msc_resolveStreamEnv(): MscStreamEnvConfig {
  return {
    bunnyApiKey: process.env.MSC_BUNNY_API_KEY,
    bunnyLibraryId: process.env.MSC_BUNNY_LIBRARY_ID,
    bunnyCdnHostname: process.env.MSC_BUNNY_CDN_HOST,
    prestoLicenseKey: process.env.MSC_PRESTO_LICENSE_KEY,
    youtubeApiKey: process.env.MSC_YOUTUBE_API_KEY,
  }
}

/**
 * Build embed URL for a video source (no hardcoded brand domains).
 */
export function msc_buildVideoEmbedUrl(source: MscVideoSource): string {
  const { provider, id, streamUrl } = source
  if (streamUrl?.trim()) return streamUrl.trim()

  switch (provider) {
    case "youtube":
      return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`
    case "vimeo":
      return `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1`
    case "bunny":
      return streamUrl ?? `https://iframe.mediadelivery.net/embed/${source.libraryId ?? "YOUR_LIBRARY_ID"}/${encodeURIComponent(id)}`
    case "presto":
      return streamUrl ?? `https://your-cms-origin.test/?presto_player=${encodeURIComponent(id)}`
    case "hls":
      return id.startsWith("http") ? id : `/media/streams/${encodeURIComponent(id)}.m3u8`
    case "custom":
      return id
    default:
      return ""
  }
}

/**
 * Map legacy YouTube-only rows to MscVideoPortalItem.
 */
export function msc_videoDataFromYoutube(row: {
  id: string
  title: string
  category: string
  youtubeId: string
  thumbnail: string
  duration: string
  completed: boolean
  views?: number
  description?: string
}): MscVideoPortalItem {
  return {
    ...row,
    source: { provider: "youtube", id: row.youtubeId },
  }
}

/**
 * Thumbnail URL when only provider id is known (YouTube default).
 */
export function msc_defaultThumbnailForSource(source: MscVideoSource): string {
  if (source.provider === "youtube" && source.id) {
    return `https://img.youtube.com/vi/${source.id}/hqdefault.jpg`
  }
  return "/media/placeholders/video-thumbnail.jpg"
}

/**
 * Five-step pipeline labels (MSC-Core-Pro instruction flow).
 */
export const MSC_VIDEO_PIPELINE_STEPS = [
  {
    number: "01",
    title: "Content Creation",
    description:
      "Upload video to your CDN (e.g. Bunny.net). Encoding and delivery run on the provider.",
  },
  {
    number: "02",
    title: "Player Assignment",
    description:
      "Map videos to Presto Player or CMS fields. Engine resolves ids to display context.",
  },
  {
    number: "03",
    title: "Lightbox Rendering",
    description:
      "Viewer click activates the player API with a branded fullscreen experience.",
  },
  {
    number: "04",
    title: "Dynamic Field Mapping",
    description:
      "ACF or Payload relationships pull featured/gallery video data into layouts.",
  },
  {
    number: "05",
    title: "Engine Optimization",
    description:
      "Cache management, lazy loading, and CDN routing preserve page performance.",
  },
] as const

/**
 * Record a tracking event (stub — persist via consumer analytics adapter).
 */
export function msc_createVideoTrackingEvent(
  partial: Omit<MscVideoTrackingEvent, "occurredAt">,
): MscVideoTrackingEvent {
  return {
    ...partial,
    occurredAt: new Date().toISOString(),
  }
}

export type MscVideoAnalyticsAdapter = {
  track: (event: MscVideoTrackingEvent) => Promise<void>
}

export async function msc_trackVideoEvent(
  adapter: MscVideoAnalyticsAdapter,
  event: MscVideoTrackingEvent,
): Promise<void> {
  await adapter.track(event)
}
