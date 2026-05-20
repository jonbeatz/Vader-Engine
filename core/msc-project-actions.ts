/**
 * MSC Project Actions — create/link projects, members, and client relationships
 * Adapter pattern: consumers implement persistence (Payload, REST, custom ORM).
 */

export type MscProjectStatus = 'local' | 'live'

export type MscProjectMember = {
  id: string | number
  email?: string | null
  username?: string | null
  avatarUrl?: string | null
}

export type MscProjectCredential = {
  id: string
  label: string
  username: string
  password: string
}

export type MscCreateProjectInput = {
  name: string
  ownerUserId: string | number
  memberIds?: Array<string | number>
  /** Optional external client/account link (CRM id, tenant id, etc.) */
  clientRefId?: string | number | null
  thumbnailUrl?: string
  thumbnailMediaId?: string | number | null
  localPath?: string
  liveUrl?: string
  status: MscProjectStatus
  localNotes?: string
  liveNotes?: string
  credentials?: MscProjectCredential[]
  manualRank?: number
}

export type MscProjectRecord = MscCreateProjectInput & {
  id: string | number
  members: MscProjectMember[]
  progress?: number
  createdAt?: string
  updatedAt?: string
}

export type MscProjectActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export type MscProjectPersistenceAdapter = {
  createProject: (input: MscCreateProjectInput) => Promise<MscProjectRecord>
  listProjectsForUser: (userId: string | number, role: string) => Promise<MscProjectRecord[]>
  updateProjectMembers: (
    projectId: string | number,
    memberIds: Array<string | number>,
  ) => Promise<MscProjectRecord>
}

export function msc_generateCredentialId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `cred-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/**
 * Validate Add Project wizard payload before persistence.
 */
export function msc_validateCreateProjectInput(
  input: Partial<MscCreateProjectInput>,
): MscProjectActionResult<MscCreateProjectInput> {
  const name = input.name?.trim() ?? ''
  const localPath = input.localPath?.trim() ?? ''
  const liveUrl = input.liveUrl?.trim() ?? ''
  const status = input.status ?? 'local'

  if (!name) return { ok: false, error: 'Project name is required.' }
  if (!localPath && !liveUrl) {
    return { ok: false, error: 'Add a local path or live URL before creating the project.' }
  }
  if (status === 'local' && !localPath) {
    return { ok: false, error: 'Local status requires a local path.' }
  }
  if (status === 'live' && !liveUrl) {
    return { ok: false, error: 'Live status requires a live URL.' }
  }
  if (!input.ownerUserId) {
    return { ok: false, error: 'Owner user is required.' }
  }

  const credentials = input.credentials ?? []
  const complete = credentials.filter(
    (c) => c.label.trim() && c.username.trim() && c.password.trim(),
  )
  const partial = credentials.some(
    (c) =>
      [c.label, c.username, c.password].some((v) => v.trim().length > 0) &&
      !(c.label.trim() && c.username.trim() && c.password.trim()),
  )
  if (partial) {
    return { ok: false, error: 'Complete all credential fields or remove incomplete entries.' }
  }

  return {
    ok: true,
    data: {
      name,
      ownerUserId: input.ownerUserId,
      memberIds: input.memberIds ?? [],
      clientRefId: input.clientRefId ?? null,
      thumbnailUrl: input.thumbnailUrl?.trim(),
      thumbnailMediaId: input.thumbnailMediaId ?? null,
      localPath,
      liveUrl: liveUrl || undefined,
      status,
      localNotes: input.localNotes?.trim(),
      liveNotes: input.liveNotes?.trim(),
      credentials: complete.map((c) => ({ ...c, id: c.id || msc_generateCredentialId() })),
      manualRank: input.manualRank ?? 0,
    },
  }
}

export async function msc_createProject(
  adapter: MscProjectPersistenceAdapter,
  input: Partial<MscCreateProjectInput>,
): Promise<MscProjectActionResult<MscProjectRecord>> {
  const validated = msc_validateCreateProjectInput(input)
  if (!validated.ok) return validated
  try {
    const created = await adapter.createProject(validated.data)
    return { ok: true, data: created }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Unable to create project.',
    }
  }
}

export function msc_mapMemberIdsToRows(
  ids: Array<string | number>,
  directory: MscProjectMember[],
): MscProjectMember[] {
  const map = new Map(directory.map((m) => [String(m.id), m]))
  return ids.map((id) => map.get(String(id))).filter(Boolean) as MscProjectMember[]
}

export function msc_projectMemberLabel(member: MscProjectMember): string {
  return member.username?.trim() || member.email?.trim() || `User ${member.id}`
}

export function msc_projectMemberInitials(member: MscProjectMember): string {
  const label = msc_projectMemberLabel(member)
  const parts = label.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
  }
  return label.slice(0, 2).toUpperCase()
}

/**
 * Access matrix for relational fields (document in CMS rules).
 */
export const MSC_PROJECT_ACCESS = {
  read: 'owner OR member',
  write: 'owner OR admin/master-admin',
  membersPicker: 'admin/master-admin on create; owner can update members',
  clientLink: 'optional externalRefId — no hardcoded CRM slug',
} as const
