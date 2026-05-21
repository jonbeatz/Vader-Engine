import type { CollectionConfig } from 'payload'

/**
 * MSC Media Vault — isolated media attachments (examples/nextjs-payload only)
 * Powered by the MSC Media Engine
 */
export const MediaVault: CollectionConfig = {
  slug: 'media-vault',
  labels: { singular: 'Media Vault Asset', plural: 'Media Vault' },
  admin: {
    useAsTitle: 'alt',
    group: 'MSC Content Engine',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Accessibility text for the attachment.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional display caption.' },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data === 'object' && !data.alt && data.filename) {
          const base = String(data.filename).replace(/\.[^.]+$/i, '').replace(/[-_]+/g, ' ')
          data.alt = base || 'Media asset'
        }
        return data
      },
    ],
  },
}
