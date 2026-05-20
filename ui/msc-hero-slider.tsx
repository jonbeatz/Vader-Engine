"use client"

/**
 * MSC Hero Slider — universal carousel shell (React / Next.js compatible)
 * Pair with ui/msc-hero-slider.css and msc-shield.css design tokens.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type MscHeroSlide = {
  /** Root-relative image path or absolute URL */
  image: string
  alt: string
  isActive?: boolean
  eyebrow?: string
  headline: [string, string, string]
  sub?: string
  primaryCtaHref?: string
  primaryCtaLabel?: string
  secondaryCtaHref?: string
  secondaryCtaLabel?: string
}

export type MscHeroStat = {
  value: string
  label: string
  highlight?: boolean
}

export type MscHeroSliderProps = {
  slides?: MscHeroSlide[] | null
  stats?: MscHeroStat[] | null
  /** Subtract fixed header height from min-height */
  stickyHeaderOffset?: boolean
  /** Auto-advance interval ms; 0 = disabled */
  autoplayMs?: number
  className?: string
  renderPrimaryCta?: (slide: MscHeroSlide) => ReactNode
  renderSecondaryCta?: (slide: MscHeroSlide) => ReactNode
}

const MSC_PLACEHOLDER_SLIDES: MscHeroSlide[] = [
  {
    image: "/media/hero-slide-01.jpg",
    alt: "Hero background slide one",
    isActive: true,
    eyebrow: "Feature highlight",
    headline: ["Line one.", "Line two.", "Accent line."],
    sub: "Replace with CMS-driven copy and media relationships.",
    primaryCtaHref: "#contact",
    secondaryCtaHref: "#demos",
  },
  {
    image: "/media/hero-slide-02.jpg",
    alt: "Hero background slide two",
    isActive: true,
    eyebrow: "Secondary message",
    headline: ["Headline A.", "Headline B.", "Headline C."],
    sub: "Configure slides via props or your headless CMS global.",
  },
]

function msc_filterActiveSlides(slides: MscHeroSlide[]): MscHeroSlide[] {
  const active = slides.filter((s) => s.isActive !== false)
  return active.length > 0 ? active : slides
}

export function MscHeroSlider({
  slides: slidesProp,
  stats,
  stickyHeaderOffset = false,
  autoplayMs = 0,
  className = "",
  renderPrimaryCta,
  renderSecondaryCta,
}: MscHeroSliderProps) {
  const slides = useMemo(() => {
    const source =
      slidesProp && slidesProp.length > 0 ? slidesProp : MSC_PLACEHOLDER_SLIDES
    return msc_filterActiveSlides(source)
  }, [slidesProp])

  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setCurrent((c) => (slides.length === 0 ? 0 : Math.min(c, slides.length - 1)))
  }, [slides.length])

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true)
    setCurrent(index)
    window.setTimeout(() => setIsTransitioning(false), 350)
  }, [])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo, slides.length])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo, slides.length])

  useEffect(() => {
    if (!autoplayMs || slides.length < 2) return
    const id = window.setInterval(() => {
      setCurrent((c) => {
        const n = (c + 1) % slides.length
        setIsTransitioning(true)
        window.setTimeout(() => setIsTransitioning(false), 350)
        return n
      })
    }, autoplayMs)
    return () => window.clearInterval(id)
  }, [autoplayMs, slides.length])

  if (slides.length === 0) return null

  const slide = slides[current]

  return (
    <section
      id="msc-hero"
      className={[
        "msc-hero-slider",
        stickyHeaderOffset ? "msc-hero-slider--with-header-offset" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
    >
      {slides.map((s, i) => (
        <div
          key={`${s.image}-${i}`}
          className={[
            "msc-hero-slider__slide-layer",
            i === current ? "msc-hero-slider__slide-layer--active" : "",
          ].join(" ")}
          aria-hidden={i !== current}
        >
          <img
            src={s.image}
            alt={s.alt}
            className="msc-hero-slider__slide-image"
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      ))}

      <div className="msc-hero-slider__overlay-gradient-v" aria-hidden />
      <div className="msc-hero-slider__overlay-gradient-h" aria-hidden />

      <div
        className={[
          "msc-hero-slider__content",
          isTransitioning ? "msc-hero-slider__content--transitioning" : "",
        ].join(" ")}
      >
        {slide.eyebrow ? (
          <div className="msc-hero-slider__eyebrow">
            <span className="msc-hero-slider__eyebrow-dot" aria-hidden />
            <span>{slide.eyebrow}</span>
          </div>
        ) : null}

        <h1 className="msc-hero-slider__headline">
          <span className="block">{slide.headline[0]}</span>
          <span className="block">{slide.headline[1]}</span>
          <span className="msc-hero-slider__headline-accent block">
            {slide.headline[2]}
          </span>
        </h1>

        {slide.sub ? <p className="msc-hero-slider__sub">{slide.sub}</p> : null}

        <div className="msc-hero-slider__actions" style={{ marginTop: "2.5rem" }}>
          {renderPrimaryCta?.(slide) ?? (
            <a
              href={slide.primaryCtaHref ?? "#contact"}
              className="msc-hero-slider__cta msc-hero-slider__cta--primary"
              style={{
                display: "inline-block",
                padding: "0.875rem 2rem",
                borderRadius: "var(--msc-radius, 8px)",
                background: "var(--msc-accent, #e02b20)",
                color: "var(--msc-text-primary, #fff)",
                textDecoration: "none",
                fontWeight: 600,
                transition: "var(--msc-transition, all 0.25s ease-in-out)",
              }}
            >
              {slide.primaryCtaLabel ?? "Primary action"}
            </a>
          )}
          {renderSecondaryCta?.(slide) ?? (
            <a
              href={slide.secondaryCtaHref ?? "#demos"}
              className="msc-hero-slider__cta msc-hero-slider__cta--secondary"
              style={{
                display: "inline-block",
                marginLeft: "1rem",
                padding: "0.875rem 2rem",
                borderRadius: "var(--msc-radius, 8px)",
                border: "1px solid var(--msc-border-color, #2d2d2d)",
                color: "var(--msc-text-primary, #fff)",
                textDecoration: "none",
              }}
            >
              {slide.secondaryCtaLabel ?? "Secondary action"}
            </a>
          )}
        </div>

        <div className="msc-hero-slider__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "msc-hero-slider__dot",
                i === current
                  ? "msc-hero-slider__dot--active"
                  : "msc-hero-slider__dot--inactive",
              ].join(" ")}
            />
          ))}
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.75rem",
              color: "var(--msc-text-secondary, #b3b3b3)",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {stats && stats.length > 0 ? (
          <div
            className="msc-hero-slider__stats"
            style={{
              marginTop: "4rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1rem",
              maxWidth: "48rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="msc-card-panel"
                style={{
                  borderColor: stat.highlight
                    ? "var(--msc-accent, #e02b20)"
                    : undefined,
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: stat.highlight
                      ? "var(--msc-accent, #e02b20)"
                      : "var(--msc-text-primary, #fff)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: "0.375rem",
                    fontSize: "0.75rem",
                    color: "var(--msc-text-secondary, #b3b3b3)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="msc-hero-slider__nav msc-hero-slider__nav--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="msc-hero-slider__nav msc-hero-slider__nav--next"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      ) : null}
    </section>
  )
}
