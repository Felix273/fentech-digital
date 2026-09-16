"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Eye,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import type { CmsCollectionSection, CmsSection } from "@/lib/admin/cms";

type ContentMap = Record<string, unknown>;
type Status = { type: "idle" | "loading" | "success" | "error"; message: string };
type Submission = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service_required: string;
  priority?: string;
  message: string;
  status: string;
  created_at: string;
};

const emptyStatus: Status = { type: "idle", message: "" };
const submissionStatuses = ["new", "contacted", "qualified", "won", "lost", "archived"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [defaults, setDefaults] = useState<ContentMap>({});
  const [content, setContent] = useState<ContentMap>({});
  const [activeId, setActiveId] = useState("site_settings");
  const [status, setStatus] = useState<Status>(emptyStatus);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dirtySections, setDirtySections] = useState<Set<string>>(new Set());
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [sectionQuery, setSectionQuery] = useState("");
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) || sections[0],
    [activeId, sections],
  );

  const visibleSections = useMemo(() => {
    const query = sectionQuery.trim().toLowerCase();
    if (!query) return sections;
    return sections.filter((section) => (
      section.label.toLowerCase().includes(query) ||
      section.id.toLowerCase().includes(query) ||
      section.help.toLowerCase().includes(query)
    ));
  }, [sectionQuery, sections]);

  const dashboardStats = useMemo(() => {
    const collectionItems = sections.reduce((total, section) => {
      if (section.kind !== "collection") return total;
      const items = content[section.id];
      return total + (Array.isArray(items) ? items.length : 0);
    }, 0);

    return [
      { label: "Editable sections", value: String(sections.length) },
      { label: "Collection items", value: String(collectionItems) },
      { label: "Client enquiries", value: String(submissions.length) },
      { label: "Unsaved sections", value: String(dirtySections.size) },
    ];
  }, [content, dirtySections.size, sections, submissions.length]);

  const markDirty = useCallback((sectionId: string) => {
    setDirtySections((current) => new Set(current).add(sectionId));
  }, []);

  const loadContent = useCallback(async () => {
    setStatus({ type: "loading", message: "Loading content…" });
    const response = await fetch("/api/admin/content");
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Unable to load content." });
      return;
    }

    setSections(data.sections);
    setDefaults(data.defaults);
    setContent(data.content);
    setActiveId((current) => data.sections?.some((section: CmsSection) => section.id === current) ? current : data.sections?.[0]?.id || "site_settings");
    setDirtySections(new Set());
    setStatus({ type: "success", message: "Content loaded." });
  }, []);

  const loadSubmissions = useCallback(async () => {
    const response = await fetch("/api/admin/submissions");
    const data = await response.json();
    if (response.ok) {
      setSubmissions(data.submissions || []);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => {
        setAuthenticated(Boolean(data.authenticated));
        if (data.authenticated) {
          void loadContent();
          void loadSubmissions();
        }
      })
      .finally(() => setCheckingSession(false));
  }, [loadContent, loadSubmissions]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ type: "loading", message: "Signing in…" });

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Unable to sign in." });
      return;
    }

    setAuthenticated(true);
    setStatus({ type: "success", message: "Signed in." });
    await loadContent();
    await loadSubmissions();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setSections([]);
    setContent({});
    setSubmissions([]);
  }

  function updateObject(sectionId: string, key: string, value: string | boolean) {
    markDirty(sectionId);
    setContent((current) => ({
      ...current,
      [sectionId]: {
        ...((current[sectionId] as Record<string, unknown>) || {}),
        [key]: value,
      },
    }));
  }

  function updateCollection(sectionId: string, index: number, key: string, value: string | boolean) {
    markDirty(sectionId);
    setContent((current) => {
      const items = Array.isArray(current[sectionId]) ? [...current[sectionId] as Record<string, unknown>[]] : [];
      items[index] = { ...(items[index] || {}), [key]: value };
      return { ...current, [sectionId]: items };
    });
  }

  function addCollectionItem(section: Extract<CmsSection, { kind: "collection" }>) {
    markDirty(section.id);
    setContent((current) => {
      const items = Array.isArray(current[section.id]) ? [...current[section.id] as Record<string, unknown>[]] : [];
      return { ...current, [section.id]: [...items, { ...section.empty }] };
    });
  }

  function removeCollectionItem(sectionId: string, index: number) {
    markDirty(sectionId);
    setContent((current) => {
      const items = Array.isArray(current[sectionId]) ? [...current[sectionId] as Record<string, unknown>[]] : [];
      items.splice(index, 1);
      return { ...current, [sectionId]: items };
    });
  }

  function duplicateCollectionItem(sectionId: string, index: number) {
    markDirty(sectionId);
    setContent((current) => {
      const items = Array.isArray(current[sectionId]) ? [...current[sectionId] as Record<string, unknown>[]] : [];
      const source = items[index] || {};
      const copy = {
        ...source,
        id: source.id ? `${source.id}-copy` : "",
        name: source.name ? `${source.name} copy` : source.name,
        title: source.title ? `${source.title} copy` : source.title,
      };
      items.splice(index + 1, 0, copy);
      return { ...current, [sectionId]: items };
    });
  }

  async function saveSection(sectionId: string) {
    setStatus({ type: "loading", message: "Saving changes…" });
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sectionId, content: content[sectionId] }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Unable to save content." });
      return;
    }

    setDirtySections((current) => {
      const next = new Set(current);
      next.delete(sectionId);
      return next;
    });
    setLastSavedAt(new Date().toLocaleTimeString());
    setStatus({ type: "success", message: "Changes saved." });
  }

  async function saveAllChanges() {
    const ids = dirtySections.size ? Array.from(dirtySections) : sections.map((section) => section.id);
    setStatus({ type: "loading", message: `Saving ${ids.length} section${ids.length === 1 ? "" : "s"}…` });

    for (const sectionId of ids) {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sectionId, content: content[sectionId] }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || `Unable to save ${sectionId}.` });
        return;
      }
    }

    setDirtySections(new Set());
    setLastSavedAt(new Date().toLocaleTimeString());
    setStatus({ type: "success", message: "All changes saved." });
  }

  function resetSection(sectionId: string) {
    markDirty(sectionId);
    setContent((current) => ({ ...current, [sectionId]: defaults[sectionId] }));
    setStatus({ type: "success", message: "Default content loaded. Save to publish it." });
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ type: "loading", message: "Uploading media…" });

    const response = await fetch("/api/admin/media", { method: "POST", body: formData });
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Upload failed." });
      return;
    }

    form.reset();
    setUploadedMediaUrl(data.publicUrl);
    setStatus({ type: "success", message: `Uploaded: ${data.publicUrl}` });
  }

  async function updateSubmissionStatus(id: string, nextStatus: string) {
    const response = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (response.ok) {
      setSubmissions((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    }
  }

  if (checkingSession) {
    return (
      <main className="admin-page">
        <div className="admin-loading"><Loader2 className="animate-spin" /> Checking admin session…</div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p className="label">FenTech CMS</p>
          <h1>Website control room.</h1>
          <p>Sign in to manage content, media and client enquiries.</p>
          <form onSubmit={login}>
            <label>Email <input name="email" type="email" autoComplete="email" required /></label>
            <label>Password <input name="password" type="password" autoComplete="current-password" required /></label>
            <button type="submit">Sign in <ArrowRight size={16} /></button>
          </form>
          {status.message ? <p className={`admin-status ${status.type}`}>{status.message}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-topbar">
        <div>
          <p className="label">FenTech CMS</p>
          <h1>Website control room.</h1>
        </div>
        <div className="admin-topbar-actions">
          {lastSavedAt ? <span className="admin-saved-pill"><CheckCircle2 size={15} /> Saved {lastSavedAt}</span> : null}
          <Link href="/" target="_blank">View site ↗</Link>
          <button type="button" onClick={() => void loadContent()}><RefreshCw size={16} /> Refresh</button>
          <button type="button" className="primary" onClick={() => void saveAllChanges()}>
            Save all {dirtySections.size ? `(${dirtySections.size})` : ""}
          </button>
          <button type="button" onClick={() => void logout()}><LogOut size={16} /> Sign out</button>
        </div>
      </section>

      {status.message ? <p className={`admin-status ${status.type}`}>{status.message}</p> : null}

      <section className="admin-stats" aria-label="CMS overview">
        {dashboardStats.map((item) => (
          <div key={item.label} className="admin-stat">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="admin-layout">
        <aside className="admin-sidebar">
          <label className="admin-search">
            <Search size={16} />
            <input
              value={sectionQuery}
              onChange={(event) => setSectionQuery(event.target.value)}
              placeholder="Search CMS"
              aria-label="Search CMS sections"
            />
          </label>

          {visibleSections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className={activeId === section.id ? "active" : ""}
              onClick={() => setActiveId(section.id)}
            >
              <span>{String(sections.findIndex((item) => item.id === section.id) + 1).padStart(2, "0")}</span>
              <strong>{section.label}</strong>
              {dirtySections.has(section.id) ? <i aria-label="Unsaved changes" /> : null}
            </button>
          ))}
          <button type="button" className={activeId === "submissions" ? "active" : ""} onClick={() => setActiveId("submissions")}>
            <span>↳</span> Enquiries
          </button>
          <button type="button" className={activeId === "media" ? "active" : ""} onClick={() => setActiveId("media")}>
            <span>↳</span> Media
          </button>
        </aside>

        <section className="admin-workspace">
          {activeId === "media" ? (
            <MediaPanel onUpload={uploadMedia} uploadedUrl={uploadedMediaUrl} />
          ) : activeId === "submissions" ? (
            <SubmissionsPanel submissions={submissions} onRefresh={loadSubmissions} onStatusChange={updateSubmissionStatus} />
          ) : activeSection ? (
            <EditorPanel
              section={activeSection}
              value={content[activeSection.id]}
              onObjectChange={updateObject}
              onCollectionChange={updateCollection}
              onAdd={addCollectionItem}
              onRemove={removeCollectionItem}
              onDuplicate={duplicateCollectionItem}
              onReset={resetSection}
              onSave={saveSection}
              dirty={dirtySections.has(activeSection.id)}
            />
          ) : null}
        </section>
      </section>
    </main>
  );
}

function EditorPanel({
  section,
  value,
  onObjectChange,
  onCollectionChange,
  onAdd,
  onRemove,
  onDuplicate,
  onReset,
  onSave,
  dirty,
}: {
  section: CmsSection;
  value: unknown;
  onObjectChange: (sectionId: string, key: string, value: string | boolean) => void;
  onCollectionChange: (sectionId: string, index: number, key: string, value: string | boolean) => void;
  onAdd: (section: Extract<CmsSection, { kind: "collection" }>) => void;
  onRemove: (sectionId: string, index: number) => void;
  onDuplicate: (sectionId: string, index: number) => void;
  onReset: (sectionId: string) => void;
  onSave: (sectionId: string) => void;
  dirty: boolean;
}) {
  const previewHref = getPreviewHref(section.id);
  const itemCount = Array.isArray(value) ? value.length : null;
  const singular = (section as CmsCollectionSection).singular;

  return (
    <article className="admin-card">
      <header>
        <div>
          <p className="label">{section.id}</p>
          <h2>{section.label}</h2>
          <p>{section.help}</p>
          <div className="admin-meta-row">
            {dirty ? <span className="admin-dirty">Unsaved changes</span> : <span>Published content loaded</span>}
            {itemCount !== null ? <span>{itemCount} {itemCount === 1 ? singular.toLowerCase() : `${singular.toLowerCase()}s`}</span> : null}
          </div>
        </div>
        <div className="admin-card-actions">
          {previewHref ? <Link href={previewHref} target="_blank"><Eye size={16} /> Preview</Link> : null}
          <button type="button" onClick={() => onReset(section.id)}>Reset</button>
          <button type="button" className="primary" onClick={() => onSave(section.id)}>Save changes</button>
        </div>
      </header>

      {section.kind === "object" ? (
        <div className="admin-field-grid">
          {section.fields.map((field) => (
            <AdminField
              key={field.key}
              field={field}
              value={String(((value as Record<string, unknown>) || {})[field.key] || "")}
              onChange={(nextValue) => onObjectChange(section.id, field.key, nextValue)}
            />
          ))}
        </div>
      ) : (
        <div className="admin-collection">
          <button type="button" className="primary admin-add-button" onClick={() => onAdd(section)}>
            <Plus size={16} /> Add {section.singular}
          </button>
          {(Array.isArray(value) ? value as Record<string, unknown>[] : []).map((item, index) => (
            <section key={`${section.id}-${index}`} className="admin-collection-item">
              <header>
                <div>
                  <strong>{getCollectionItemTitle(section.singular, item, index)}</strong>
                  <span>{getCollectionItemSubtitle(item)}</span>
                </div>
                <div className="admin-item-actions">
                  <button type="button" onClick={() => onDuplicate(section.id, index)}><Copy size={15} /> Duplicate</button>
                  <button type="button" className="danger" onClick={() => onRemove(section.id, index)}><Trash2 size={15} /> Remove</button>
                </div>
              </header>
              <div className="admin-field-grid">
                {section.fields.map((field) => (
                  <AdminField
                    key={field.key}
                    field={field}
                    value={field.type === "checkbox" ? Boolean(item[field.key]) : String(item[field.key] || "")}
                    onChange={(nextValue) => onCollectionChange(section.id, index, field.key, nextValue)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}

function getPreviewHref(sectionId: string) {
  const routes: Record<string, string> = {
    site_settings: "/",
    homepage: "/",
    about: "/about",
    services: "/services",
    work: "/case-studies",
    contact: "/contact",
    services_collection: "/services",
    case_studies: "/case-studies",
    testimonials: "/",
    industries: "/",
    metrics: "/",
    differentiators: "/",
    process_steps: "/services",
    technologies: "/",
  };

  return routes[sectionId];
}

function getCollectionItemTitle(singular: string, item: Record<string, unknown>, index: number) {
  const title = item.title || item.name || item.value || item.email;
  return title ? String(title) : `${singular} ${index + 1}`;
}

function getCollectionItemSubtitle(item: Record<string, unknown>) {
  const subtitle = item.category || item.industry || item.label || item.description || item.id;
  return subtitle ? String(subtitle) : "Editable collection item";
}

function AdminField({
  field,
  value,
  onChange,
}: {
  field: { key: string; label: string; type: string };
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="admin-check">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <label className={field.type === "textarea" ? "admin-field full" : "admin-field"}>
      <span>{field.label}</span>
      {field.type === "textarea" ? (
        <>
          <textarea rows={field.key.toLowerCase().includes("body") || field.key.toLowerCase().includes("details") ? 7 : 4} value={String(value)} onChange={(event) => onChange(event.target.value)} />
          <small>{String(value).length} characters</small>
        </>
      ) : (
        <input type={field.type} value={String(value)} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function MediaPanel({
  onUpload,
  uploadedUrl,
}: {
  onUpload: (event: FormEvent<HTMLFormElement>) => void;
  uploadedUrl: string;
}) {
  async function copyUploadedUrl() {
    if (!uploadedUrl) return;
    await navigator.clipboard.writeText(uploadedUrl);
  }

  return (
    <article className="admin-card">
      <header>
        <div>
          <p className="label">Media</p>
          <h2>Upload media</h2>
          <p>Upload files to Supabase Storage and paste the returned public URL into content image fields.</p>
        </div>
      </header>
      <form className="admin-media-form" onSubmit={onUpload}>
        <label>File <input name="file" type="file" accept="image/*,video/*,application/pdf" required /></label>
        <label>Path <input name="path" placeholder="projects/dashboard.webp" required /></label>
        <button type="submit"><Upload size={16} /> Upload</button>
      </form>
      {uploadedUrl ? (
        <div className="admin-upload-result">
          <span>Latest upload URL</span>
          <code>{uploadedUrl}</code>
          <button type="button" onClick={() => void copyUploadedUrl()}><Copy size={15} /> Copy URL</button>
        </div>
      ) : null}
    </article>
  );
}

function SubmissionsPanel({
  submissions,
  onRefresh,
  onStatusChange,
}: {
  submissions: Submission[];
  onRefresh: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <article className="admin-card">
      <header>
        <div>
          <p className="label">Enquiries</p>
          <h2>Contact submissions</h2>
          <p>Recent leads from the website contact form.</p>
        </div>
        <button type="button" onClick={onRefresh}><RefreshCw size={16} /> Refresh</button>
      </header>

      <div className="submission-list">
        {submissions.length ? submissions.map((submission) => (
          <section key={submission.id} className="submission-item">
            <div>
              <p className="label">{new Date(submission.created_at).toLocaleString()}</p>
              <h3>{submission.first_name} {submission.last_name}</h3>
              <p>{submission.email}{submission.phone ? ` · ${submission.phone}` : ""}</p>
              <p><strong>{submission.service_required}</strong>{submission.company ? ` · ${submission.company}` : ""}</p>
              <p>{submission.message}</p>
            </div>
            <select value={submission.status} onChange={(event) => onStatusChange(submission.id, event.target.value)}>
              {submissionStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </section>
        )) : <p>No enquiries yet.</p>}
      </div>
    </article>
  );
}
