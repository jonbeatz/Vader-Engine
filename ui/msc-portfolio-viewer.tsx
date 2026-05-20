"use client"

/**
 * MSC Portfolio Viewer — responsive Studio Dark grid for Payload showcase entries
 * Requires: msc-shield.css (msc-dashboard-container, msc-card-panel tokens)
 */

import type { MscPortfolioRecord } from "../core/msc-portfolio-collection"

export type MscPortfolioItem = MscPortfolioRecord

export type MscPortfolioViewerProps = {
  items: MscPortfolioItem[]
  titleOverride?: string
  onSelectItem?: (item: MscPortfolioItem) => void
}

export function MscPortfolioViewer({
  items,
  titleOverride = "Project Showcase",
  onSelectItem,
}: MscPortfolioViewerProps) {
  const sortedItems = [...items].sort(
    (a, b) => (a.manualSortIndex ?? 0) - (b.manualSortIndex ?? 0),
  )

  return (
    <section className="msc-dashboard-container msc-viewport-shield">
      <header style={{ marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, color: "var(--msc-text-primary)", fontSize: "2rem" }}>
          {titleOverride}
        </h2>
        <div
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: "var(--msc-accent)",
            marginTop: "0.5rem",
            borderRadius: "2px",
          }}
        />
      </header>

      {sortedItems.length === 0 ? (
        <div className="msc-card-panel" style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ margin: 0, color: "var(--msc-text-secondary)" }}>
            No portfolio entries found in this collection catalog.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {sortedItems.map((item) => (
            <article
              key={item.id}
              className="msc-card-panel"
              style={{
                overflow: "hidden",
                padding: 0,
                cursor: onSelectItem ? "pointer" : "default",
              }}
              onClick={() => onSelectItem?.(item)}
              onKeyDown={(e) => e.key === "Enter" && onSelectItem?.(item)}
              role={onSelectItem ? "button" : undefined}
              tabIndex={onSelectItem ? 0 : undefined}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "var(--msc-bg-main)",
                  position: "relative",
                }}
              >
                <img
                  src={item.featuredImage.url}
                  alt={item.featuredImage.alt || item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    color: "var(--msc-text-primary)",
                    fontSize: "1.1rem",
                  }}
                >
                  {item.title}
                </h3>

                {item.description ? (
                  <p
                    style={{
                      margin: "0 0 1rem",
                      color: "var(--msc-text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                ) : null}

                {item.tags && item.tags.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {item.tags.map((t) => (
                      <span
                        key={t.id}
                        style={{
                          backgroundColor: "var(--msc-bg-surface-hover)",
                          color: "var(--msc-text-secondary)",
                          fontSize: "0.75rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          border: "1px solid var(--msc-border-color)",
                        }}
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

    </section>
  )
}

export default MscPortfolioViewer
