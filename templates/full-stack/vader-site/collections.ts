/**
 * VaderLabz site collections — {{PROJECT_NAME}}
 */
import type { CollectionConfig } from 'payload';

export const MscUsers: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: 'email', type: 'email', required: true, unique: true }],
};

export const VaderProjects: CollectionConfig = {
  slug: 'vader-projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'sortOrder'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'ACTIVE', value: 'active' },
        { label: 'BUILDING', value: 'building' },
        { label: 'COMING SOON', value: 'coming-soon' },
      ],
    },
    { name: 'githubUrl', type: 'text' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};

export const VaderStackItems: CollectionConfig = {
  slug: 'vader-stack',
  admin: { useAsTitle: 'label', defaultColumns: ['label', 'sortOrder'] },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
