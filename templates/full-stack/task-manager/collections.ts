/**
 * Task & Client Vault Collection Schema Definitions
 * Project: {{PROJECT_NAME}}
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
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
};

export const MscClients: CollectionConfig = {
  slug: 'msc-clients',
  admin: {
    useAsTitle: 'studioName',
  },
  fields: [
    { name: 'studioName', type: 'text', required: true },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'vaderAccentColor', type: 'text', defaultValue: '#00ffcc' },
  ],
};

export const MscTasks: CollectionConfig = {
  slug: 'msc-tasks',
  admin: {
    useAsTitle: 'taskTitle',
  },
  fields: [
    { name: 'taskTitle', type: 'text', required: true },
    {
      name: 'assignedClient',
      type: 'relationship',
      relationTo: 'msc-clients',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Backlog', value: 'backlog' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Review', value: 'review' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'backlog',
    },
  ],
};
