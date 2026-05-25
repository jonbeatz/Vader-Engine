import { STATIC_PROJECTS, STATIC_STACK, type SiteData } from './static-site-data';

export type { SiteData, SiteProject, SiteStackItem } from './static-site-data';

export async function loadSiteData(): Promise<SiteData> {
  return { projects: STATIC_PROJECTS, stackItems: STATIC_STACK };
}
