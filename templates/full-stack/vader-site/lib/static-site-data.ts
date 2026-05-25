/**
 * Frozen vaderlabz.com baseline — used when ENABLE_PAYLOAD is not true.
 */
export type SiteProject = {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'building' | 'coming-soon';
  githubUrl?: string | null;
  tags?: { label: string; id?: string }[];
};

export type SiteStackItem = {
  id: string;
  label: string;
};

export type SiteData = {
  projects: SiteProject[];
  stackItems: SiteStackItem[];
};

export const STATIC_PROJECTS: SiteProject[] = [
  {
    id: 'static-1',
    title: 'Boilerplate-v2',
    description:
      'Cursor-native full-stack boilerplate with a 60-point self-grader, isolated Next.js / Payload / WordPress sandboxes, Vader Protocol UI shield, Biome linting, and MCP-ready agent workflows.',
    status: 'active',
    githubUrl: 'https://github.com/jonbeatz/Boilerplate-v2',
    tags: [
      { label: 'Next.js' },
      { label: 'Payload CMS' },
      { label: 'WordPress' },
      { label: 'Biome' },
      { label: 'MCP' },
    ],
  },
  {
    id: 'static-2',
    title: 'Node-Launcher',
    description:
      'Vader Project Engine — Station Prime. Full-stack Electron launcher with renderer sandboxing, SQLite, and forge workflow automation.',
    status: 'active',
    githubUrl: 'https://github.com/jonbeatz/Node-Launcher',
    tags: [
      { label: 'Electron' },
      { label: 'Node.js' },
      { label: 'SQLite' },
      { label: 'Next.js' },
    ],
  },
  {
    id: 'static-3',
    title: 'MSC-Projectz',
    description:
      'Projects management app and personal dashboard for tracking builds, experiments, and dev progress across the VaderLabz ecosystem.',
    status: 'building',
    githubUrl: 'https://github.com/jonbeatz/MSC-Projectz',
    tags: [{ label: 'Node.js' }, { label: 'React' }, { label: 'TypeScript' }],
  },
];

export const STATIC_STACK: SiteStackItem[] = [
  'Next.js',
  'Node.js',
  'React',
  'TypeScript',
  'Payload CMS',
  'WordPress',
  'SQLite',
  'Electron',
  'Biome',
  'MCP Workflows',
  'AI/LLM',
  'Cursor',
  'Vitest',
  'Playwright',
  'Docker',
  'GitHub Actions',
].map((name, index) => ({ id: `static-stack-${index}`, label: `// ${name}` }));
