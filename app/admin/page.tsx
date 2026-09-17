"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Copy,
  Eye,
  FileText,
  FolderKanban,
  Globe,
  Inbox,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [activeSectionId, setActiveSectionId] = useState("site_settings");
  const [status, setStatus] = useState<Status>(emptyStatus);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dirtySections, setDirtySections] = useState<Set<string>>(new Set());
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [sectionQuery, setSectionQuery] = useState("");
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) || sections[0],
    [activeSectionId, sections],
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
    const totalCollectionItems = sections.reduce((total, section) => {
      if (section.kind !== "collection") return total;
      const items = content[section.id];
      return total + (Array.isArray(items) ? items.length : 0);
    }, 0);

    const newSubmissions = submissions.filter((s) => s.status === "new").length;

    return [
      { label: "Active CMS Sections", value: String(sections.length), icon: Layers, note: "Managed dynamic components" },
      { label: "Portfolio Projects", value: String(Array.isArray(content["case_studies"]) ? (content["case_studies"] as unknown[]).length : 0), icon: FolderKanban, note: "Live showcase items" },
      { label: "Client Inquiries", value: String(submissions.length), icon: Inbox, note: `${newSubmissions} new pending leads` },
      { label: "Unsaved Changes", value: String(dirtySections.size), icon: Sparkles, note: dirtySections.size ? "Pending publish" : "All changes synced" },
    ];
  }, [content, dirtySections.size, sections, submissions]);

  const markDirty = useCallback((sectionId: string) => {
    setDirtySections((current) => new Set(current).add(sectionId));
  }, []);

  const loadContent = useCallback(async () => {
    setStatus({ type: "loading", message: "Syncing content database…" });
    const response = await fetch("/api/admin/content");
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Unable to load CMS content." });
      return;
    }

    setSections(data.sections || []);
    setDefaults(data.defaults || {});
    setContent(data.content || {});
    setActiveSectionId((current) =>
      data.sections?.some((section: CmsSection) => section.id === current)
        ? current
        : data.sections?.[0]?.id || "site_settings",
    );
    setDirtySections(new Set());
    setStatus({ type: "success", message: "CMS database synced." });
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
    setStatus({ type: "loading", message: "Verifying credentials…" });

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
      setStatus({ type: "error", message: data.error || "Access denied. Invalid credentials." });
      return;
    }

    setAuthenticated(true);
    setStatus({ type: "success", message: "Access granted to Control Room." });
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
    setStatus({ type: "loading", message: "Publishing section to database…" });
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: sectionId, content: content[sectionId] }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Failed to publish changes." });
      return;
    }

    setDirtySections((current) => {
      const next = new Set(current);
      next.delete(sectionId);
      return next;
    });
    setLastSavedAt(new Date().toLocaleTimeString());
    setStatus({ type: "success", message: `Section '${sectionId}' published successfully.` });
  }

  async function saveAllChanges() {
    const ids = dirtySections.size ? Array.from(dirtySections) : sections.map((section) => section.id);
    setStatus({ type: "loading", message: `Publishing ${ids.length} section${ids.length === 1 ? "" : "s"}…` });

    for (const sectionId of ids) {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sectionId, content: content[sectionId] }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || `Failed to save section ${sectionId}.` });
        return;
      }
    }

    setDirtySections(new Set());
    setLastSavedAt(new Date().toLocaleTimeString());
    setStatus({ type: "success", message: "All content changes published live." });
  }

  function resetSection(sectionId: string) {
    markDirty(sectionId);
    setContent((current) => ({ ...current, [sectionId]: defaults[sectionId] }));
    setStatus({ type: "success", message: "Restored defaults. Click save to publish live." });
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ type: "loading", message: "Uploading asset to storage…" });

    const response = await fetch("/api/admin/media", { method: "POST", body: formData });
    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.error || "Media upload failed." });
      return;
    }

    form.reset();
    setUploadedMediaUrl(data.publicUrl);
    setStatus({ type: "success", message: `File stored at: ${data.publicUrl}` });
  }

  async function updateSubmissionStatus(id: string, nextStatus: string) {
    const response = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (response.ok) {
      setSubmissions((current) =>
        current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)),
      );
    }
  }

  if (checkingSession) {
    return (
      <main className="dark-admin-page">
        <div className="dark-admin-card dark-admin-loading">
          <Loader2 className="animate-spin text-cyan-400" size={24} />
          <span>Authenticating Admin Session…</span>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="dark-admin-page flex items-center justify-center p-4">
        <section className="dark-admin-card dark-admin-login">
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <ShieldCheck size={28} />
            <span className="text-xs uppercase tracking-widest font-bold">Admin Portal Control Room</span>
          </div>
          <h1>System Control.</h1>
          <p className="text-gray-400 mb-6 text-sm">
            Sign in to manage dynamic content, real-time portfolio items, and client inquiries.
          </p>
          <form onSubmit={login} className="space-y-4">
            <label className="dark-admin-label">
              <span>Admin Email</span>
              <input name="email" type="email" autoComplete="email" placeholder="admin@fentech.co.ke" required />
            </label>
            <label className="dark-admin-label">
              <span>Security Password</span>
              <input name="password" type="password" autoComplete="current-password" placeholder="••••••••••••" required />
            </label>
            <button type="submit" className="dark-admin-btn-primary w-full mt-2">
              Sign In to Control Room <ArrowRight size={16} />
            </button>
          </form>
          {status.message ? (
            <div className={`dark-admin-status ${status.type} mt-4`}>{status.message}</div>
          ) : null}
        </section>
      </main>
    );
  }

  return (
    <main className="dark-admin-page">
      {/* Top Header Navigation */}
      <header className="dark-admin-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              Control Room
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.4
              </span>
            </h1>
            <p className="text-xs text-gray-400">JemSA Media Tech / FenTech Digital Admin Hub</p>
          </div>
        </div>

        <div className="dark-admin-topbar-actions">
          {lastSavedAt ? (
            <span className="dark-admin-saved-pill">
              <CheckCircle2 size={14} className="text-emerald-400" /> Synced at {lastSavedAt}
            </span>
          ) : null}
          <Link href="/" target="_blank" className="dark-admin-btn-ghost">
            <Globe size={15} /> View Live Site ↗
          </Link>
          <button type="button" className="dark-admin-btn-ghost" onClick={() => void loadContent()}>
            <RefreshCw size={15} /> Reload Data
          </button>
          <button type="button" className="dark-admin-btn-primary" onClick={() => void saveAllChanges()}>
            Publish All {dirtySections.size ? `(${dirtySections.size})` : ""}
          </button>
          <button type="button" className="dark-admin-btn-danger" onClick={() => void logout()}>
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {status.message ? (
        <div className={`dark-admin-status ${status.type} mb-6`}>{status.message}</div>
      ) : null}

      {/* Main Control Grid */}
      <div className="dark-admin-layout">
        {/* Left Sidebar Nav Tabs */}
        <aside className="dark-admin-sidebar">
          <div className="mb-4">
            <label className="dark-admin-search">
              <Search size={15} className="text-gray-400" />
              <input
                value={sectionQuery}
                onChange={(e) => setSectionQuery(e.target.value)}
                placeholder="Search CMS sections..."
              />
            </label>
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              className={`dark-sidebar-nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard size={17} />
              <span>Overview & Stats</span>
            </button>

            <button
              type="button"
              className={`dark-sidebar-nav-btn ${activeTab === "submissions" ? "active" : ""}`}
              onClick={() => setActiveTab("submissions")}
            >
              <Inbox size={17} />
              <span className="flex-1 text-left">Client Enquiries</span>
              {submissions.filter((s) => s.status === "new").length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-cyan-500 text-gray-950 font-bold rounded-full">
                  {submissions.filter((s) => s.status === "new").length}
                </span>
              )}
            </button>

            <button
              type="button"
              className={`dark-sidebar-nav-btn ${activeTab === "cms" ? "active" : ""}`}
              onClick={() => setActiveTab("cms")}
            >
              <Layers size={17} />
              <span>CMS Components</span>
            </button>

            <button
              type="button"
              className={`dark-sidebar-nav-btn ${activeTab === "media" ? "active" : ""}`}
              onClick={() => setActiveTab("media")}
            >
              <Upload size={17} />
              <span>Media Assets</span>
            </button>
          </nav>

          {activeTab === "cms" && (
            <div className="mt-6 pt-4 border-t border-gray-800 space-y-1">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 px-3 mb-2">
                Editable Sections ({visibleSections.length})
              </p>
              {visibleSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`dark-section-list-btn ${activeSectionId === sec.id ? "active" : ""}`}
                  onClick={() => setActiveSectionId(sec.id)}
                >
                  <FileText size={14} className="text-gray-400" />
                  <span className="truncate flex-1 text-left">{sec.label}</span>
                  {dirtySections.has(sec.id) && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Center Workspace Content */}
        <section className="dark-admin-workspace">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="dark-admin-card dark-stat-card">
                      <div className="flex items-center justify-between text-gray-400 mb-3">
                        <span className="text-xs uppercase font-semibold tracking-wider">{stat.label}</span>
                        <Icon size={18} className="text-indigo-400" />
                      </div>
                      <div className="text-3xl font-light text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.note}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Launch Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dark-admin-card">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                    <FolderKanban size={18} className="text-cyan-400" /> Case Studies & Work
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Manage portfolio projects, client case studies, live URLs, and tech stacks displayed across the platform.
                  </p>
                  <button
                    type="button"
                    className="dark-admin-btn-ghost text-xs"
                    onClick={() => {
                      setActiveTab("cms");
                      setActiveSectionId("case_studies");
                    }}
                  >
                    Edit Case Studies <ArrowRight size={14} />
                  </button>
                </div>

                <div className="dark-admin-card">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                    <BarChart3 size={18} className="text-cyan-400" /> Recent Inquiries
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    View incoming lead submissions from the contact form, process priority requests, and update deal status.
                  </p>
                  <button
                    type="button"
                    className="dark-admin-btn-ghost text-xs"
                    onClick={() => setActiveTab("submissions")}
                  >
                    Open Lead Inbox <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <SubmissionsPanel
              submissions={submissions}
              onRefresh={loadSubmissions}
              onStatusChange={updateSubmissionStatus}
            />
          )}

          {activeTab === "media" && (
            <MediaPanel onUpload={uploadMedia} uploadedUrl={uploadedMediaUrl} />
          )}

          {activeTab === "cms" && activeSection && (
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
          )}
        </section>
      </div>
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
  const singular = (section as CmsCollectionSection).singular || "Item";

  return (
    <article className="dark-admin-card">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">{section.id}</span>
          <h2 className="text-2xl font-light text-white tracking-tight">{section.label}</h2>
          <p className="text-sm text-gray-400 mt-1">{section.help}</p>
          <div className="flex items-center gap-3 mt-2 text-xs">
            {dirty ? (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                Unsaved modifications
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Synced with database
              </span>
            )}
            {itemCount !== null && (
              <span className="text-gray-400">
                {itemCount} {itemCount === 1 ? singular.toLowerCase() : `${singular.toLowerCase()}s`}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {previewHref && (
            <Link href={previewHref} target="_blank" className="dark-admin-btn-ghost text-xs">
              <Eye size={14} /> Preview
            </Link>
          )}
          <button type="button" className="dark-admin-btn-ghost text-xs" onClick={() => onReset(section.id)}>
            Restore Defaults
          </button>
          <button type="button" className="dark-admin-btn-primary text-xs" onClick={() => onSave(section.id)}>
            Save Section
          </button>
        </div>
      </header>

      {section.kind === "object" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="space-y-4">
          <button
            type="button"
            className="dark-admin-btn-primary text-xs"
            onClick={() => onAdd(section)}
          >
            <Plus size={15} /> Add New {singular}
          </button>

          {(Array.isArray(value) ? (value as Record<string, unknown>[]) : []).map((item, index) => (
            <section key={`${section.id}-${index}`} className="dark-collection-item">
              <header className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800">
                <div>
                  <strong className="text-sm font-medium text-white block">
                    {getCollectionItemTitle(singular, item, index)}
                  </strong>
                  <span className="text-xs text-gray-400">{getCollectionItemSubtitle(item)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="dark-admin-btn-ghost text-xs"
                    onClick={() => onDuplicate(section.id, index)}
                  >
                    <Copy size={13} /> Duplicate
                  </button>
                  <button
                    type="button"
                    className="dark-admin-btn-danger text-xs"
                    onClick={() => onRemove(section.id, index)}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    work: "/work",
    contact: "/contact",
    services_collection: "/services",
    case_studies: "/work",
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
  return title ? String(title) : `${singular} #${index + 1}`;
}

function getCollectionItemSubtitle(item: Record<string, unknown>) {
  const subtitle = item.category || item.industry || item.label || item.description || item.id;
  return subtitle ? String(subtitle) : "Editable item";
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
      <label className="dark-admin-checkbox md:col-span-2">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <span>{field.label}</span>
      </label>
    );
  }

  const isFullWidth = field.type === "textarea" || field.key.includes("details") || field.key.includes("about");

  return (
    <label className={`dark-admin-label ${isFullWidth ? "md:col-span-2" : ""}`}>
      <span>{field.label}</span>
      {field.type === "textarea" ? (
        <>
          <textarea
            rows={field.key.toLowerCase().includes("body") || field.key.toLowerCase().includes("details") ? 6 : 3}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
          />
          <small className="text-[10px] text-gray-500 text-right block mt-1">{String(value).length} chars</small>
        </>
      ) : (
        <input type={field.type} value={String(value)} onChange={(e) => onChange(e.target.value)} />
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
    <article className="dark-admin-card">
      <header className="pb-6 mb-6 border-b border-gray-800">
        <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Asset Vault</span>
        <h2 className="text-2xl font-light text-white tracking-tight">Upload Media & Images</h2>
        <p className="text-sm text-gray-400 mt-1">
          Upload project screenshots, team photos, or documents directly to Supabase Cloud Storage.
        </p>
      </header>

      <form className="max-w-xl space-y-4" onSubmit={onUpload}>
        <label className="dark-admin-label">
          <span>Select Media File</span>
          <input name="file" type="file" accept="image/*,video/*,application/pdf" required />
        </label>
        <label className="dark-admin-label">
          <span>Target Path / Filename</span>
          <input name="path" placeholder="projects/jemsa-dashboard.webp" required />
        </label>
        <button type="submit" className="dark-admin-btn-primary">
          <Upload size={16} /> Upload Asset
        </button>
      </form>

      {uploadedUrl ? (
        <div className="mt-6 p-4 rounded-lg bg-gray-900 border border-indigo-500/30 flex flex-col gap-2">
          <span className="text-xs text-gray-400 uppercase font-semibold">Latest Uploaded Asset URL</span>
          <code className="text-xs text-cyan-300 bg-gray-950 p-2 rounded break-all border border-gray-800">
            {uploadedUrl}
          </code>
          <button type="button" className="dark-admin-btn-ghost text-xs self-start" onClick={() => void copyUploadedUrl()}>
            <Copy size={13} /> Copy Asset URL
          </button>
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
    <article className="dark-admin-card">
      <header className="flex items-center justify-between pb-6 mb-6 border-b border-gray-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Lead Pipeline</span>
          <h2 className="text-2xl font-light text-white tracking-tight">Client Contact Enquiries</h2>
          <p className="text-sm text-gray-400 mt-1">
            Real-time contact requests submitted through the FenTech website contact page.
          </p>
        </div>
        <button type="button" className="dark-admin-btn-ghost text-xs" onClick={onRefresh}>
          <RefreshCw size={14} /> Sync Inbox
        </button>
      </header>

      <div className="space-y-4">
        {submissions.length ? (
          submissions.map((submission) => (
            <div key={submission.id} className="dark-submission-card">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-gray-400">
                    {new Date(submission.created_at).toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {submission.service_required}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white">
                  {submission.first_name} {submission.last_name}
                </h3>
                <p className="text-sm text-cyan-400 mt-0.5">
                  {submission.email} {submission.phone ? `· ${submission.phone}` : ""}
                  {submission.company ? ` (${submission.company})` : ""}
                </p>
                <p className="text-sm text-gray-300 mt-3 bg-gray-950 p-3 rounded border border-gray-800">
                  {submission.message}
                </p>
              </div>

              <div className="md:w-44 flex flex-col gap-2">
                <span className="text-[11px] uppercase text-gray-500 font-semibold">Lead Status</span>
                <select
                  className="dark-admin-select"
                  value={submission.status}
                  onChange={(e) => onStatusChange(submission.id, e.target.value)}
                >
                  {submissionStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">No client enquiries in the database.</div>
        )}
      </div>
    </article>
  );
}
