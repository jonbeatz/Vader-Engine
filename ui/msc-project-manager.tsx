'use client';

/**
 * MSC Project Manager — Add Project wizard, project grid, member avatar cluster
 * Requires: msc-shield-load.css (or Shield → Layout → Components → msc-dashboard.css)
 */

import { useCallback, useState } from 'react';
import type {
  MscCreateProjectInput,
  MscProjectMember,
  MscProjectPersistenceAdapter,
  MscProjectRecord,
} from '../core/msc-project-actions';
import {
  msc_createProject,
  msc_projectMemberInitials,
  msc_projectMemberLabel,
} from '../core/msc-project-actions';

export type MscWizardStep = 'identity' | 'connectivity' | 'credentials' | 'status';

const WIZARD_STEPS: { id: MscWizardStep; label: string }[] = [
  { id: 'identity', label: 'Identity' },
  { id: 'connectivity', label: 'Connectivity' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'status', label: 'Status' },
];

export type MscAddProjectModalProps = {
  open: boolean;
  onClose: () => void;
  ownerUserId: string | number;
  adapter: MscProjectPersistenceAdapter;
  memberDirectory?: MscProjectMember[];
  onCreated?: (project: MscProjectRecord) => void;
};

export function MscAddProjectModal({
  open,
  onClose,
  ownerUserId,
  adapter,
  memberDirectory = [],
  onCreated,
}: MscAddProjectModalProps) {
  const [step, setStep] = useState<MscWizardStep>('identity');
  const [name, setName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [localPath, setLocalPath] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState<'local' | 'live'>('local');
  const [localNotes, setLocalNotes] = useState('');
  const [liveNotes, setLiveNotes] = useState('');
  const [memberIds, setMemberIds] = useState<Array<string | number>>([]);
  const [clientRefId, setClientRefId] = useState<string>('');
  const [credentials, setCredentials] = useState<
    Array<{ label: string; username: string; password: string; visible: boolean }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = useCallback(() => {
    setStep('identity');
    setName('');
    setThumbnailUrl('');
    setLocalPath('');
    setLiveUrl('');
    setStatus('local');
    setLocalNotes('');
    setLiveNotes('');
    setMemberIds([]);
    setClientRefId('');
    setCredentials([]);
    setError(null);
    setSubmitting(false);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === step);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    const result = await msc_createProject(adapter, {
      name,
      ownerUserId,
      memberIds,
      clientRefId: clientRefId.trim() || null,
      thumbnailUrl,
      localPath,
      liveUrl,
      status,
      localNotes,
      liveNotes,
      credentials: credentials.map((c, i) => ({
        id: `cred-${i}`,
        label: c.label,
        username: c.username,
        password: c.password,
      })),
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onCreated?.(result.data);
    handleClose();
  };

  if (!open) return null;

  return (
    <div
      className="msc-dashboard-wrapper msc-dashboard-container msc-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="msc-add-project-title"
    >
      <div className="msc-card-panel msc-modal-panel">
        <header className="msc-modal-header">
          <h2 id="msc-add-project-title" className="msc-modal-title">
            Add Project
          </h2>
          <button type="button" onClick={handleClose} aria-label="Close">
            ✕
          </button>
        </header>

        <nav aria-label="Wizard steps" className="msc-wizard-nav">
          {WIZARD_STEPS.map((s, i) => (
            <span
              key={s.id}
              className={
                i === stepIndex ? 'msc-wizard-step msc-wizard-step--active' : 'msc-wizard-step'
              }
            >
              {s.label}
            </span>
          ))}
        </nav>

        {step === 'identity' && (
          <div>
            <label>
              Project name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
            <label style={{ display: 'block', marginTop: '1rem' }}>
              Thumbnail URL (optional)
              <input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="/media/project-thumb.jpg"
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
            {memberDirectory.length > 0 ? (
              <fieldset style={{ marginTop: '1rem', border: '1px solid var(--msc-border-color)' }}>
                <legend>Team members</legend>
                {memberDirectory.map((m) => (
                  <label key={String(m.id)} style={{ display: 'block', marginBottom: '0.35rem' }}>
                    <input
                      type="checkbox"
                      checked={memberIds.some((id) => String(id) === String(m.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMemberIds((prev) => [...prev, m.id]);
                        } else {
                          setMemberIds((prev) => prev.filter((id) => String(id) !== String(m.id)));
                        }
                      }}
                    />{' '}
                    {msc_projectMemberLabel(m)}
                  </label>
                ))}
              </fieldset>
            ) : null}
            <label style={{ display: 'block', marginTop: '1rem' }}>
              Client reference ID (optional)
              <input
                value={clientRefId}
                onChange={(e) => setClientRefId(e.target.value)}
                placeholder="External CRM / tenant id"
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          </div>
        )}

        {step === 'connectivity' && (
          <div>
            <label>
              Local path
              <input
                value={localPath}
                onChange={(e) => setLocalPath(e.target.value)}
                placeholder="Relative repo or workspace path"
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
            <label style={{ display: 'block', marginTop: '1rem' }}>
              Live URL
              <input
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://"
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          </div>
        )}

        {step === 'credentials' && (
          <div>
            {credentials.map((c, index) => (
              <div key={index} className="msc-card-panel msc-credential-row">
                <input
                  placeholder="Label"
                  value={c.label}
                  onChange={(e) => {
                    const next = [...credentials];
                    next[index] = { ...next[index], label: e.target.value };
                    setCredentials(next);
                  }}
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
                <input
                  placeholder="Username"
                  value={c.username}
                  onChange={(e) => {
                    const next = [...credentials];
                    next[index] = { ...next[index], username: e.target.value };
                    setCredentials(next);
                  }}
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
                <div className="msc-credential-actions">
                  <input
                    type={c.visible ? 'text' : 'password'}
                    placeholder="Password"
                    value={c.password}
                    onChange={(e) => {
                      const next = [...credentials];
                      next[index] = { ...next[index], password: e.target.value };
                      setCredentials(next);
                    }}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...credentials];
                      next[index] = { ...next[index], visible: !next[index].visible };
                      setCredentials(next);
                    }}
                  >
                    {c.visible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCredentials((prev) => [
                  ...prev,
                  { label: '', username: '', password: '', visible: false },
                ])
              }
            >
              + Add credential
            </button>
          </div>
        )}

        {step === 'status' && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem' }}>
              <input
                type="radio"
                name="msc-status"
                checked={status === 'local'}
                onChange={() => setStatus('local')}
              />{' '}
              Local
            </label>
            <label style={{ display: 'block', marginBottom: '0.75rem' }}>
              <input
                type="radio"
                name="msc-status"
                checked={status === 'live'}
                onChange={() => setStatus('live')}
              />{' '}
              Live
            </label>
            <textarea
              placeholder="Local notes"
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              style={{ width: '100%', minHeight: '4rem' }}
            />
            <textarea
              placeholder="Live notes"
              value={liveNotes}
              onChange={(e) => setLiveNotes(e.target.value)}
              style={{ width: '100%', minHeight: '4rem', marginTop: '0.75rem' }}
            />
          </div>
        )}

        {error ? (
          <p role="alert" style={{ color: 'var(--msc-accent)', marginTop: '1rem' }}>
            {error}
          </p>
        ) : null}

        <footer style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStep(WIZARD_STEPS[stepIndex - 1].id)}
          >
            Back
          </button>
          {stepIndex < WIZARD_STEPS.length - 1 ? (
            <button type="button" onClick={() => setStep(WIZARD_STEPS[stepIndex + 1].id)}>
              Next
            </button>
          ) : (
            <button type="button" disabled={submitting} onClick={handleSubmit}>
              {submitting ? 'Creating…' : 'Create project'}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

export type MscMemberClusterProps = {
  members: MscProjectMember[];
  stackLimit?: number;
};

export function MscMemberCluster({ members, stackLimit = 3 }: MscMemberClusterProps) {
  if (members.length === 0) return null;
  const limit = Math.max(1, stackLimit);
  const visible = members.slice(0, limit);
  const overflow = members.length - visible.length;

  return (
    <div className="msc-member-cluster">
      <div style={{ display: 'flex' }}>
        {visible.map((m) => (
          <span
            key={String(m.id)}
            title={msc_projectMemberLabel(m)}
            style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              border: '1px solid var(--msc-border-color)',
              background: 'var(--msc-bg-surface-hover)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.65rem',
              marginLeft: '-0.35rem',
              overflow: 'hidden',
            }}
          >
            {m.avatarUrl ? (
              <img
                src={m.avatarUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              msc_projectMemberInitials(m)
            )}
          </span>
        ))}
        {overflow > 0 ? (
          <span
            style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              fontSize: '0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--msc-bg-surface)',
              border: '1px solid var(--msc-border-color)',
              marginLeft: '-0.35rem',
            }}
          >
            +{overflow}
          </span>
        ) : null}
      </div>
      <details>
        <summary
          style={{ cursor: 'pointer', fontSize: '0.75rem', color: 'var(--msc-text-secondary)' }}
        >
          {members.length} member{members.length === 1 ? '' : 's'}
        </summary>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0' }}>
          {members.map((m) => (
            <li key={String(m.id)} style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
              {msc_projectMemberLabel(m)}
              {m.email ? (
                <span style={{ color: 'var(--msc-text-secondary)', marginLeft: '0.35rem' }}>
                  {m.email}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export type MscProjectGridProps = {
  projects: MscProjectRecord[];
  onSelect?: (project: MscProjectRecord) => void;
  onAddProject?: () => void;
};

export function MscProjectGrid({ projects, onSelect, onAddProject }: MscProjectGridProps) {
  return (
    <div className="msc-dashboard-wrapper msc-dashboard-container msc-viewport-shield">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h2 style={{ margin: 0 }}>Projects</h2>
        {onAddProject ? (
          <button
            type="button"
            onClick={onAddProject}
            style={{
              background: 'var(--msc-accent)',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--msc-radius)',
            }}
          >
            + Add Project
          </button>
        ) : null}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {projects.map((p) => (
          <article
            key={String(p.id)}
            className="msc-card-panel"
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
            onClick={() => onSelect?.(p)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect?.(p)}
            role={onSelect ? 'button' : undefined}
            tabIndex={onSelect ? 0 : undefined}
          >
            {p.thumbnailUrl ? (
              <img
                src={p.thumbnailUrl}
                alt=""
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderRadius: 'var(--msc-radius)',
                  marginBottom: '0.75rem',
                }}
              />
            ) : null}
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--msc-text-primary)' }}>{p.name}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--msc-text-secondary)' }}>
              {p.status === 'live' ? p.liveUrl || 'Live' : p.localPath || 'Local'}
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <MscMemberCluster members={p.members ?? []} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
