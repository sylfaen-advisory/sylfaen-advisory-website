/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   Awen — Document generation workspace (interactive demo)
   Two views: (1) document picker grid → (2) EIR section builder
   with live "generate" (streaming) and "approve" interactions.
   ============================================================ */

// --- Minimal line icons (functional UI chrome) ---
const I = {
  brief: (s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>),
  doc: (s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></svg>),
  grid: (s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
  gear: (s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>),
  info: (s = 18) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>),
  plus: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>),
  eye: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.5" /><path d="M3 3l18 18" /></svg>),
  moon: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>),
  logout: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>),
  bolt: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>),
  refresh: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6M3 22v-6h6" /><path d="M3.5 9a9 9 0 0 1 14.85-3.36L21 8M20.5 15a9 9 0 0 1-14.85 3.36L3 16" /></svg>),
  download: (s = 15) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></svg>),
  chevL: (s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>),
  chevR: (s = 16) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>),
  // card icons
  clipboard: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>),
  list: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" /></svg>),
  org: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-2h12v2" /></svg>),
  home: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 21v-7h6v7" /></svg>),
  chart: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><rect x="5" y="11" width="3" height="7" /><rect x="10.5" y="6" width="3" height="12" /><rect x="16" y="14" width="3" height="4" /></svg>),
  tag: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10z" /><circle cx="8" cy="8" r="1.6" /></svg>),
  server: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>),
  filedoc: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>),
  checksq: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M8 12l3 3 5-6" /></svg>),
  wrench: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4z" /></svg>),
  calendar: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>),
  people: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="8.5" r="2.5" /><path d="M16 14.2c2.8.4 5 2.8 5 5.8" /></svg>),
  database: (s = 22) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>),
};

// --- The Awen three-ray mark ---
function AwenMark({ size = 26 }) {
  return (
    <svg viewBox="0 0 64 68" width={size} className="awn-rail-logo" aria-label="Awen">
      <polygon points="18,0 30,0 44,58 4,58" fill="#0c6d75" />
      <polygon points="34,0 46,0 54,58 38,58" fill="#2db8bf" />
      <polygon points="50,0 62,0 62,58 58,58" fill="#8fafc0" />
      <rect x="2" y="61" width="62" height="2.5" fill="#2db8bf" />
    </svg>
  );
}

// === Picker data ===
const APPOINTING = [
  { abbr: "EIR", title: "Exchange Information Requirements", desc: "Defines information requirements at project outset", icon: "clipboard", badges: [{ t: "1/4 sections" }, { t: "Client document", teal: true }], feature: true },
  { abbr: "PIR", title: "Project Information Requirements", desc: "Milestone-tied information requirements for a specific project delivery phase", icon: "clipboard" },
  { abbr: "OIR", title: "Organisational Information Requirements", desc: "Organisational-level information requirements", icon: "org", badges: [{ t: "Client document", teal: true }] },
  { abbr: "AIR", title: "Asset Information Requirements", desc: "Information requirements for the operational asset", icon: "home", badges: [{ t: "0/6 sections" }, { t: "Client document", teal: true }] },
  { abbr: "CCA", title: "Capability and Capacity Assessment", desc: "Pre-qualification assessment of team BIM capability and capacity", icon: "chart" },
  { abbr: "NP", title: "Naming Protocol", desc: "Information container naming conventions and controlled vocabulary", icon: "tag" },
  { abbr: "CDE", title: "CDE Protocol", desc: "Rules for the Common Data Environment", icon: "server" },
];
const APPOINTED = [
  { abbr: "Pre-BEP", title: "BIM Execution Plan — Pre-appointment", desc: "Proposed approach submitted before appointment", icon: "filedoc" },
  { abbr: "Post-BEP", title: "BIM Execution Plan — Post-appointment", desc: "Agreed plan following appointment", icon: "checksq" },
  { abbr: "IMP", title: "Information Management Procedure", desc: "Process for managing project information", icon: "wrench" },
  { abbr: "MIDP", title: "Master Information Delivery Plan", desc: "Programme for all information deliverables", icon: "calendar" },
  { abbr: "RM", title: "Responsibility Matrix", desc: "RACI matrix for information responsibilities", icon: "people" },
  { abbr: "AIM", title: "Asset Information Model — Delivery Plan", desc: "How the asset information model will be maintained throughout the operational life of the asset", icon: "database" },
];

// === EIR section tree ===
// content blocks: {h2}|{h3}|{p}|{clause}|{callout:{label,text}}
// inline tokens in text: [[teal mark]]  {{client-to-confirm}}
const PURPOSE_BLOCKS = [
  { t: "h2", x: "1.1  Purpose" },
  { t: "p", x: "This Exchange Information Requirements document is issued by [[Riverside Properties Group]] as the Appointing Party for the [[Northgate Quarter — Phase 2]] development, covering the design and delivery information requirements for the scheme and governing both the pre-appointment BEP assessment and all subsequent information production obligations under [[BS EN ISO 19650-2]]." },
  { t: "p", x: "The scheme comprises 285 residential units across two mixed-tenure blocks and 1,200 m² of ground-floor commercial space on a 1.4-hectare brownfield site, procured under a two-stage design and build contract with a target practical completion of Q3 2027." },
  { t: "h2", x: "1.2  Information Management Goals and Objectives" },
  { t: "h3", x: "1.2.1  Goals" },
  { t: "clause", x: "The delivery team shall maintain the integrity of the project information model throughout all stages of information production and handover." },
  { t: "clause", x: "The delivery team shall ensure all information production remains aligned with the Organisational Information Requirements (OIR)." },
  { t: "clause", x: "The delivery team shall maintain a golden thread of building information in accordance with the Building Safety Act 2022." },
  { t: "clause", x: "The delivery team shall produce spatially coordinated information that is free from unresolved clashes at each information exchange." },
  { t: "clause", x: "The delivery team shall deliver a complete Asset Information Model (AIM) at project handover in accordance with the asset information requirements defined in this document." },
  { t: "callout", label: "Building Safety Act 2022 — Higher-Risk Buildings", x: "This appointment is subject to the Building Safety Act 2022. Gateway obligations are defined in Section 2.9.2. Higher-Risk Building status is {{[CLIENT TO CONFIRM: confirm HRB status for each residential building based on final building heights]}}." },
  { t: "h3", x: "1.2.2  Objectives" },
  { t: "clause", x: "The lead appointed party shall submit a pre-appointment BEP prior to contract award." },
  { t: "clause", x: "All appointed parties shall adopt the Common Data Environment (CDE) defined in Section 4b for all information exchanges." },
  { t: "clause", x: "The lead appointed party shall assign a Level of Information Need (LOIN) to each deliverable in accordance with the Master Information Delivery Plan (MIDP)." },
  { t: "clause", x: "Each task team shall produce a clash-free federated model at each design information exchange milestone." },
  { t: "clause", x: "The lead appointed party shall ensure all information required to support Gateway 2 submission is complete, accurate, and held within the CDE." },
];

// Bespoke content for a few sections; the rest use a template.
const BESPOKE = {
  "1": PURPOSE_BLOCKS,
  "tender": [
    { t: "h2", x: "1.3  Tender Response and Pre-appointment Assessment" },
    { t: "p", x: "Each prospective lead appointed party shall submit a pre-appointment BIM Execution Plan demonstrating capability to deliver against this EIR. Submissions shall be assessed against the [[Capability and Capacity Assessment (CCA)]] criteria appended to the tender documentation." },
    { t: "clause", x: "The pre-appointment BEP shall confirm the proposed information delivery strategy and supporting resources." },
    { t: "clause", x: "Each prospective party shall return a completed Capability and Capacity Assessment for evaluation." },
    { t: "clause", x: "The Appointing Party reserves the right to request clarification of any element of the submitted response." },
  ],
  "related": [
    { t: "h2", x: "1.4  Related Documents" },
    { t: "p", x: "This Exchange Information Requirements document shall be read in conjunction with the [[Northgate Quarter — Phase 2 Project Information Requirements (PIR)]] and incorporated into all appointment documentation issued to the Lead Appointed Party and task teams." },
    { t: "clause", x: "Organisational Information Requirements (OIR) — Riverside Properties Group." },
    { t: "clause", x: "Asset Information Requirements (AIR) — operational asset specification." },
    { t: "clause", x: "Master Information Delivery Plan (MIDP) — issued post-appointment." },
  ],
};

function templateBlocks(group, name) {
  return [
    { t: "h2", x: name },
    { t: "p", x: `This section sets out the ${name.toLowerCase()} applicable to the [[Northgate Quarter — Phase 2]] appointment. All appointed parties shall comply with the requirements defined herein when producing and exchanging information through [[Asite]] as the project Common Data Environment.` },
    { t: "p", x: `Requirements are established in accordance with [[BS EN ISO 19650-2:2018]] and the UK National Annex, and apply throughout the delivery phase under the direction of [[Riverside Properties Group]] as the Appointing Party.` },
    { t: "clause", x: `Each task team shall demonstrate conformance with the ${group.toLowerCase()} defined in this section at every information exchange.` },
    { t: "clause", x: `Non-conformances shall be recorded and resolved before the affected information container is accepted into the shared area of the CDE.` },
  ];
}

const GROUPS = [
  {
    name: "Introduction", sections: [
      { id: "1", code: "1", name: "Purpose, Goals and Objectives", sub: "EIR purpose, audience statement, information management goals and objectives" },
      { id: "tender", code: "1 (cont.)", name: "Tender Response and Pre-appointment", sub: "Pre-appointment BEP assessment and submission requirements" },
      { id: "related", code: "1 (cont.)", name: "Related Documents", sub: "PIR, OIR, AIR and supporting reference documents" },
    ]
  },
  {
    name: "Information Requirements", sections: [
      { id: "2a", code: "2", name: "Purpose, Programme and Milestones", sub: "Delivery programme and information exchange milestones" },
      { id: "2b", code: "2", name: "Security, Coordination, PIM and Asset Information", sub: "Coordination of the project information model" },
      { id: "2c", code: "2b (cont.)", name: "Information Management KPIs", sub: "Performance indicators for information delivery" },
      { id: "2d", code: "2", name: "Health, Safety and CDM Obligations", sub: "CDM 2015 information duties" },
      { id: "2e", code: "2", name: "Design Risk Register", sub: "Design risk information requirements" },
    ]
  },
  {
    name: "Information Standards", sections: [
      { id: "3a", code: "3a", name: "Applicable Standards", sub: "ISO 19650 suite and supporting British Standards" },
      { id: "3b", code: "3b", name: "Naming Convention and CDE Metadata", sub: "Container naming and required metadata fields" },
      { id: "3c", code: "3c", name: "Security Classification", sub: "Information security classifications" },
      { id: "3d", code: "3d", name: "Level of Information Need", sub: "LOIN definition and assignment" },
      { id: "3e", code: "3e", name: "Data Authoring and Exchange Formats", sub: "Permitted authoring tools and exchange formats" },
      { id: "3f", code: "3f", name: "Software Platforms and Quality Assurance", sub: "Approved platforms and QA process" },
    ]
  },
  {
    name: "Information Production Methods", sections: [
      { id: "4a", code: "4a", name: "Roles, Responsibilities and RACI", sub: "Information management roles" },
      { id: "4b", code: "4b", name: "Common Data Environment", sub: "CDE workflow and states" },
      { id: "4c", code: "4c", name: "Information Production Workflows", sub: "WIP, shared, published and archive" },
      { id: "4d", code: "4d", name: "Model Federation Strategy", sub: "Federation and volume strategy" },
      { id: "4e", code: "4e", name: "Clash Detection and Coordination", sub: "Coordination process and tolerances" },
      { id: "4f", code: "4f", name: "Classification System", sub: "Uniclass 2015 classification" },
      { id: "4g", code: "4g", name: "Information Delivery and Acceptance", sub: "Acceptance and authorisation process" },
      { id: "4h", code: "4h", name: "Information Container Breakdown Structure", sub: "ICBS definition" },
    ]
  },
];

const ALL_SECTIONS = GROUPS.flatMap(g => g.sections.map(s => ({ ...s, group: g.name })));
const TOTAL = ALL_SECTIONS.length;

function blocksFor(sec) {
  return BESPOKE[sec.id] || templateBlocks(sec.group, sec.name);
}

// --- inline token renderer ---
function Inline({ text }) {
  const parts = [];
  const re = /(\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("[[")) parts.push(<span key={k++} className="mark">{tok.slice(2, -2)}</span>);
    else parts.push(<span key={k++} className="confirm">{tok.slice(2, -2)}</span>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Block({ b }) {
  if (b.t === "h2") return <div className="h2">{b.x}</div>;
  if (b.t === "h3") return <div className="h3">{b.x}</div>;
  if (b.t === "clause") return <div className="clause"><Inline text={b.x} /></div>;
  if (b.t === "callout") return <div className="callout"><b>{b.label}:</b> <Inline text={b.x} /></div>;
  return <p><Inline text={b.x} /></p>;
}

// =================== TOP BAR ===================
function TopBar({ view, onBack }) {
  return (
    <div className="awn-topbar">
      {view === "picker" ? (
        <React.Fragment>
          <span className="awn-tb-label">Client</span>
          <button className="awn-tb-pill"><span className="v">Riverside Properties Group</span><span className="caret">▾</span></button>
          <span className="awn-tb-label">Project</span>
          <button className="awn-tb-pill"><span className="v">Northgate Quarter — Phase 2</span><span className="caret">▾</span></button>
          <button className="awn-tb-action">{I.plus()}<span>New Client</span></button>
          <button className="awn-tb-action">{I.plus()}<span>Add Project</span></button>
        </React.Fragment>
      ) : (
        <div className="awn-crumb">
          <button className="back" onClick={onBack}>{I.chevL(14)} Documents</button>
          <span className="sep">›</span>
          <span className="cur">EIR</span>
        </div>
      )}
      <span className="awn-tb-spacer" />
      <div className="awn-tb-right">
        <span className="awn-tb-conf">{I.eye()}<span>Confidential</span></span>
        <button className="awn-tb-icon" title="Appearance">{I.moon()}</button>
        <button className="awn-tb-icon" title="Sign out">{I.logout()}</button>
      </div>
    </div>
  );
}

// =================== NAV RAIL ===================
function Rail() {
  return (
    <div className="awn-rail">
      <AwenMark />
      <button className="awn-rail-btn" title="Projects">{I.brief(19)}</button>
      <button className="awn-rail-btn active" title="Documents">{I.doc(19)}</button>
      <button className="awn-rail-btn" title="Workspace">{I.grid(19)}</button>
      <span className="awn-rail-sp" />
      <button className="awn-rail-btn" title="Settings">{I.gear(19)}</button>
      <button className="awn-rail-btn" title="Help">{I.info(19)}</button>
    </div>
  );
}

// =================== PICKER ===================
function DocCard({ d, onOpen }) {
  return (
    <button className={`awn-card ${d.feature ? "feature" : ""}`} onClick={() => onOpen(d)}>
      {d.badges && d.badges.length > 0 && (
        <div className="awn-card-badges">
          {d.badges.map((b, i) => <span key={i} className={`awn-badge ${b.teal ? "teal" : ""}`}>{b.t}</span>)}
        </div>
      )}
      <span className="awn-card-icon">{I[d.icon](22)}</span>
      <h3 className="awn-card-title">{d.title}</h3>
      <span className="awn-card-abbr">{d.abbr}</span>
      <p className="awn-card-desc">{d.desc}</p>
    </button>
  );
}

function Picker({ onOpen }) {
  const [tab, setTab] = useState("iso");
  const [party, setParty] = useState("appointed");
  const [iso26, setIso26] = useState(false);
  return (
    <div className="awn-stage">
      <div className="awn-picker">
        <h1>Document generation</h1>
        <p className="sub">Select a document type to open the generation workspace.</p>
        <div className="awn-filters">
          <div className="awn-seg">
            {[["iso", "ISO 19650"], ["consulting", "Consulting"], ["tools", "Tools"]].map(([k, l]) => (
              <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <span className={`awn-chk ${iso26 ? "on" : ""}`} onClick={() => setIso26(v => !v)}>
            <span className="box">{iso26 ? "✓" : ""}</span> ISO 19650:2026
          </span>
          <span className="sp" />
          <div className="awn-party">
            <button className={party === "appointed" ? "on" : ""} onClick={() => setParty("appointed")}>Appointed party</button>
            <button className={party === "appointing" ? "on" : ""} onClick={() => setParty("appointing")}>Appointing party</button>
          </div>
        </div>

        <div className="awn-group-label">Appointing Party Documents</div>
        <div className="awn-cards">
          {APPOINTING.map((d, i) => <DocCard key={i} d={d} onOpen={onOpen} />)}
        </div>

        <div className="awn-group-label second">Appointed Party Documents</div>
        <div className="awn-cards">
          {APPOINTED.map((d, i) => <DocCard key={i} d={d} onOpen={onOpen} />)}
        </div>

        <div className="awn-footbar">
          <span className="awn-live-dot" /> Railway live
        </div>
      </div>
    </div>
  );
}

// =================== BUILDER ===================
function SectionTree({ activeId, status, onSelect }) {
  return (
    <div className="awn-tree">
      {GROUPS.map((g) => {
        const done = g.sections.filter(s => status[s.id] === "generated" || status[s.id] === "approved").length;
        const total = g.sections.length;
        return (
          <div key={g.name}>
            <div className="awn-tree-grp">
              <span className="g-name"><span className="chev">▾</span>{g.name}</span>
              <span className={`g-badge ${done === total ? "done" : ""}`}>{done}/{total}</span>
            </div>
            {g.sections.map((s) => {
              const st = status[s.id];
              const isDone = st === "generated" || st === "approved";
              return (
                <div key={s.id} className={`awn-sec ${activeId === s.id ? "active" : ""}`} onClick={() => onSelect(s.id)}>
                  <span className={`dot ${isDone ? "done" : ""}`} />
                  <span className="sec-txt">
                    <span className="sec-code">{s.code}</span>
                    <div className="sec-name">{s.name}</div>
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function GeneratedContent({ blocks, streaming, onSkip }) {
  // streaming: {block, char} or null (means fully shown)
  const visible = streaming ? streaming.block : blocks.length;
  return (
    <div className="awn-content">
      {streaming && (
        <div className="awn-genbar">
          <span className="pulse" /> Awen is generating this section…
          <span className="skip" onClick={onSkip}>Show all</span>
        </div>
      )}
      {blocks.map((b, i) => {
        if (i < visible) return <Block key={i} b={b} />;
        if (streaming && i === visible) {
          const partial = { ...b, x: b.x.slice(0, streaming.char) };
          return (
            <React.Fragment key={i}>
              <Block b={partial} />
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
}

function ContentPane({ sec, idx, status, setStatus, onPrev, onNext }) {
  const blocks = blocksFor(sec);
  const st = status[sec.id] || "empty";
  const [stream, setStream] = useState(null); // {block,char} while generating
  const timer = useRef(null);

  // reset stream when switching sections
  useEffect(() => { setStream(null); if (timer.current) clearTimeout(timer.current); }, [sec.id]);

  const finish = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setStream(null);
    setStatus(sec.id, "generated");
  }, [sec.id, setStatus]);

  const generate = useCallback(() => {
    setStatus(sec.id, "generating");
    let block = 0, char = 0;
    setStream({ block, char });
    const STEP = 4, INT = 14;
    const tick = () => {
      const b = blocks[block];
      if (!b) { finish(); return; }
      char += STEP;
      if (char >= b.x.length) { block += 1; char = 0; }
      if (block >= blocks.length) { finish(); return; }
      setStream({ block, char });
      timer.current = setTimeout(tick, INT);
    };
    timer.current = setTimeout(tick, 280);
  }, [blocks, sec.id, setStatus, finish]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const generating = st === "generating";
  const hasContent = st === "generated" || st === "approved" || generating;

  return (
    <div className="awn-doc">
      <div className="awn-doc-top">
        <span className="crumbs">{sec.group} › <b>{sec.code} — {sec.name}</b></span>
        <div className="awn-doc-nav">
          <button onClick={onPrev} title="Previous">{I.chevL()}</button>
          <button onClick={onNext} title="Next">{I.chevR()}</button>
        </div>
      </div>

      <div className="awn-card-doc">
        <div className="awn-sec-head">
          <span className="awn-sec-num">{idx + 1}</span>
          <div>
            <h3 className="h-ttl">{sec.group} — {sec.name}</h3>
            <p className="h-sub">{sec.sub}</p>
            {(st === "generated" || st === "approved") && <div className="h-gen">Generated just now · 3 references</div>}
          </div>
          <div className="h-right">
            {st === "approved" ? <span className="awn-pill approved">✓ Approved</span>
              : hasContent ? <span className="awn-pill draft">Draft</span> : null}
          </div>
        </div>

        <div className="awn-sec-body">
          {!hasContent ? (
            <div className="awn-empty">
              <div className="ghost">No content yet. Generate a first draft to populate this section from the project profile.</div>
              <div className="awn-gen-row">
                <span className="awn-cost">−$0.04</span>
                <button className="awn-gen-btn" onClick={generate}><span className="spark">✦</span> Generate</button>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <GeneratedContent blocks={blocks} streaming={generating ? stream : null} onSkip={finish} />
              {st === "generated" && (
                <div className="awn-approve-row">
                  <button className="awn-btn teal" onClick={() => setStatus(sec.id, "approved")}>✓ Approve section</button>
                  <button className="awn-btn" onClick={generate}>{I.refresh()} Regenerate</button>
                  <span className="note">Review · edit · approve before export</span>
                </div>
              )}
              {st === "approved" && (
                <div className="awn-approve-row">
                  <button className="awn-btn" onClick={onNext}>Next section {I.chevR(14)}</button>
                  <span className="note">Approved · ready for .docx export</span>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function Builder({ onBack }) {
  const [activeId, setActiveId] = useState("1");
  const [status, setStatusMap] = useState({}); // id -> empty|generating|generated|approved
  const setStatus = useCallback((id, v) => setStatusMap(m => ({ ...m, [id]: v })), []);

  const idx = ALL_SECTIONS.findIndex(s => s.id === activeId);
  const sec = ALL_SECTIONS[idx];
  const go = (d) => { const n = (idx + d + TOTAL) % TOTAL; setActiveId(ALL_SECTIONS[n].id); };

  const drafted = ALL_SECTIONS.filter(s => ["generated", "approved"].includes(status[s.id])).length;
  const approved = ALL_SECTIONS.filter(s => status[s.id] === "approved").length;
  const pct = Math.round((approved / TOTAL) * 100);

  return (
    <div className="awn-builder">
      <div className="awn-build-head">
        <div>
          <h2 className="ttl">Exchange Information Requirements</h2>
          <div className="meta">ISO 19650-2:2018 §5.1 / §5.2 &nbsp;·&nbsp; <b>{drafted} of {TOTAL}</b> drafted · <b>{approved}</b> approved</div>
        </div>
        <div className="awn-build-actions">
          <div className="awn-prog">
            <div className="track"><div className="fill" style={{ width: `${pct}%` }} /></div>
            <span className="lbl">{pct}% approved</span>
          </div>
          <button className="awn-btn">{I.bolt()} Generate All</button>
          <button className="awn-btn icon" title="Refresh">{I.refresh()}</button>
          <button className="awn-btn teal">{I.download()} Export .docx</button>
        </div>
      </div>
      <div className="awn-gensettings">{I.gear(14)} Generation settings</div>
      <div className="awn-build-body">
        <SectionTree activeId={activeId} status={status} onSelect={setActiveId} />
        <ContentPane
          key={sec.id}
          sec={sec}
          idx={idx}
          status={status}
          setStatus={setStatus}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </div>
  );
}

// =================== ROOT ===================
function AwenDashboard() {
  const [view, setView] = useState("picker"); // picker | builder
  return (
    <div className="awn-app">
      <TopBar view={view} onBack={() => setView("picker")} />
      <div className="awn-row">
        <Rail />
        {view === "picker"
          ? <Picker onOpen={() => setView("builder")} />
          : <Builder onBack={() => setView("picker")} />}
      </div>
    </div>
  );
}

window.AwenDashboard = AwenDashboard;
