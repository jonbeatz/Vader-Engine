import { STATIC_PROJECTS, STATIC_STACK, type SiteData, type SiteProject } from './static-site-data';
import { getVaderPayload } from './get-payload';

export type { SiteData, SiteProject, SiteStackItem } from './static-site-data';

export async function loadSiteData(): Promise<SiteData> {
  try {
    const payload = await getVaderPayload();
    const [projectsResult, stackResult] = await Promise.all([
      payload.find({
        collection: 'vader-projects',
        sort: 'sortOrder',
        limit: 50,
        depth: 0,
      }),
      payload.find({
        collection: 'vader-stack',
        sort: 'sortOrder',
        limit: 50,
        depth: 0,
      }),
    ]);

    return {
      projects: projectsResult.docs.map((doc) => ({
        id: String(doc.id),
        title: doc.title as string,
        description: doc.description as string,
        status: doc.status as SiteProject['status'],
        githubUrl: doc.githubUrl as string | null | undefined,
        tags: doc.tags as SiteProject['tags'],
      })),
      stackItems: stackResult.docs.map((doc) => ({
        id: String(doc.id),
        label: doc.label as string,
      })),
    };
  } catch {
    return { projects: STATIC_PROJECTS, stackItems: STATIC_STACK };
  }
}
