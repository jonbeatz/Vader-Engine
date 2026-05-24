/**
 * Task & Client Vault Collection Schema Definitions
 * Project: {{PROJECT_NAME}}
 */

export const MscClients = {
  slug: 'msc-clients',
  admin: {
    useAsTitle: 'studioName',
  },
  fields: [
    { name: 'studioName', type: 'text', required: true },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'vaderAccentColor', type: 'text', defaultValue: '#00ffcc' }
  ],
};

export const MscTasks = {
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
      options: ['backlog', 'in-progress', 'review', 'completed'],
      defaultValue: 'backlog',
    }
  ],
};
