'use client';

/**
 * MSC Portfolio Viewer — responsive Studio Dark grid for Payload showcase entries
 * Requires: msc-shield-load.css (or Shield → Layout → Components → msc-portfolio.css)
 */

import type { MscPortfolioRecord } from '../core/msc-portfolio-collection';

export type MscPortfolioItem = MscPortfolioRecord;

export type MscPortfolioViewerProps = {
  items: MscPortfolioItem[];
  titleOverride?: string;
  onSelectItem?: (item: MscPortfolioItem) => void;
};

export function MscPortfolioViewer({
  items,
  titleOverride = 'Project Showcase',
  onSelectItem,
}: MscPortfolioViewerProps) {
  const sortedItems = [...items].sort(
    (a, b) => (a.manualSortIndex ?? 0) - (b.manualSortIndex ?? 0),
  );

  return (
    <section className="msc-dashboard-container msc-viewport-shield">
      <div className="msc-portfolio-wrapper">
        <header className="msc-portfolio-header">
          <h2 className="msc-portfolio-title">{titleOverride}</h2>
          <div className="msc-portfolio-accent-bar" aria-hidden="true" />
        </header>

        {sortedItems.length === 0 ? (
          <div className="msc-card-panel msc-portfolio-empty">
            <p className="msc-portfolio-empty-text">
              No portfolio entries found in this collection catalog.
            </p>
          </div>
        ) : (
          <div className="msc-grid-auto-fill">
            {sortedItems.map((item) => (
              <article
                key={item.id}
                className={`msc-card-panel msc-portfolio-card${onSelectItem ? ' msc-portfolio-card--interactive' : ''}`}
                onClick={() => onSelectItem?.(item)}
                onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(item)}
                role={onSelectItem ? 'button' : undefined}
                tabIndex={onSelectItem ? 0 : undefined}
              >
                <div className="msc-portfolio-media">
                  <img
                    src={item.featuredImage.url}
                    alt={item.featuredImage.alt || item.title}
                    loading="lazy"
                  />
                </div>

                <div className="msc-portfolio-body">
                  <h3 className="msc-portfolio-item-title">{item.title}</h3>

                  {item.description ? (
                    <p className="msc-portfolio-item-desc">{item.description}</p>
                  ) : null}

                  {item.tags && item.tags.length > 0 ? (
                    <div className="msc-portfolio-tags">
                      {item.tags.map((t) => (
                        <span key={t.id} className="msc-portfolio-tag">
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
      </div>
    </section>
  );
}

export default MscPortfolioViewer;
