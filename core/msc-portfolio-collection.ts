/**
 * MSC Portfolio Collection — reusable Payload factory for public showcase entries
 * Media uploads use the `media` collection (msc-payload-media-hooks).
 */

import type { CollectionConfig } from 'payload';
import type { MscAuthRole } from './msc-auth-admin';
import { msc_toRelativePublicMediaUrl } from './msc-payload-media-hooks';

type MscPortfolioUser = { id?: string | number; role?: MscAuthRole | string | null };

function msc_slugifyTitle(title: string): string {
  return (
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'portfolio-item'
  );
}

function msc_canAdminPortfolio(user: MscPortfolioUser | null | undefined): boolean {
  const role = user?.role;
  return role === 'master-admin' || role === 'admin';
}

function msc_isMasterAdmin(user: MscPortfolioUser | null | undefined): boolean {
  return user?.role === 'master-admin';
}

/** Normalized portfolio row for UI consumers (after Payload fetch). */
export type MscPortfolioRecord = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tags?: Array<{ id: string; tag: string }>;
  manualSortIndex?: number;
  featuredImage: {
    url: string;
    alt?: string;
  };
};

function msc_resolveMediaUrl(media: unknown): { url: string; alt?: string } | null {
  if (!media || typeof media !== 'object') return null;
  const m = media as Record<string, unknown>;
  const rawUrl = typeof m.url === 'string' ? m.url : '';
  if (!rawUrl) return null;
  const alt = typeof m.alt === 'string' ? m.alt : undefined;
  return {
    url: msc_toRelativePublicMediaUrl(rawUrl),
    alt,
  };
}

/**
 * Map a Payload `msc_portfolio` document (depth ≥ 1 on featuredImage) to a grid item.
 */
export function msc_mapPayloadPortfolioDoc(doc: unknown): MscPortfolioRecord | null {
  if (!doc || typeof doc !== 'object') return null;
  const row = doc as Record<string, unknown>;
  const id = row.id != null ? String(row.id) : '';
  const title = typeof row.title === 'string' ? row.title : '';
  const slug = typeof row.slug === 'string' ? row.slug : '';
  if (!id || !title || !slug) return null;

  const featured = msc_resolveMediaUrl(row.featuredImage);
  if (!featured) return null;

  const tagsRaw = row.tags;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
        .map((entry, index) => {
          if (!entry || typeof entry !== 'object') return null;
          const tag = (entry as { tag?: string; id?: string }).tag;
          if (!tag) return null;
          const tagId =
            (entry as { id?: string }).id != null
              ? String((entry as { id: string }).id)
              : `tag-${index}`;
          return { id: tagId, tag };
        })
        .filter((t): t is { id: string; tag: string } => t !== null)
    : undefined;

  return {
    id,
    title,
    slug,
    description: typeof row.description === 'string' ? row.description : undefined,
    tags,
    manualSortIndex:
      typeof row.manualSortIndex === 'number'
        ? row.manualSortIndex
        : Number(row.manualSortIndex) || 0,
    featuredImage: featured,
  };
}

/**
 * Portfolio collection — publicly readable; admin/master-admin write; master-admin delete.
 */
export const msc_portfolio: CollectionConfig = {
  slug: 'msc_portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'manualSortIndex', 'updatedAt'],
    group: 'Core Framework',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => msc_canAdminPortfolio(user as MscPortfolioUser),
    update: ({ req: { user } }) => msc_canAdminPortfolio(user as MscPortfolioUser),
    delete: ({ req: { user } }) => msc_isMasterAdmin(user as MscPortfolioUser),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data || typeof data !== 'object') return;
        const next = data as Record<string, unknown>;
        const title = typeof next.title === 'string' ? next.title.trim() : '';
        const slugRaw = typeof next.slug === 'string' ? next.slug.trim() : '';
        if (title && (!slugRaw || operation === 'create')) {
          next.slug = msc_slugifyTitle(slugRaw || title);
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug — auto-generated from title when left blank on create.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Portfolio Tags / Categories',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'manualSortIndex',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Custom grid order — lower numbers appear first.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
};

export default msc_portfolio;
