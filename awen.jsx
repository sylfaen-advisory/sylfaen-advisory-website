/* global React */
const { useState, useEffect, useMemo } = React;

// === Awen mock data ===

const SAMPLE_DOCS = [
  { id: 1, name: "PRJ-SYL-XX-XX-DR-A-001001.pdf", rule: "ISO 19650 · BS 1192", status: "pass", conf: "98%" },
  { id: 2, name: "PRJ-SYL-XX-XX-DR-A-001002.pdf", rule: "ISO 19650 · BS 1192", status: "pass", conf: "97%" },
  { id: 3, name: "drawing_RevB_final.dwg", rule: "Naming · BS 1192", status: "fail", conf: "100%" },
  { id: 4, name: "PRJ-SYL-04-ZZ-M3-S-200017.ifc", rule: "Container · ISO 19650-2", status: "warn", conf: "84%" },
  { id: 5, name: "PRJ-SYL-XX-01-RP-Q-000043.docx", rule: "Metadata completeness", status: "pass", conf: "96%" },
  { id: 6, name: "Site_Survey_v3.xlsx", rule: "Naming · workflow state", status: "fail", conf: "100%" },
  { id: 7, name: "PRJ-SYL-02-B1-DR-S-101204.rvt", rule: "Container · revision", status: "warn", conf: "76%" },
  { id: 8, name: "PRJ-SYL-XX-XX-SP-A-000012.pdf", rule: "ISO 19650 · BS 1192", status: "pass", conf: "99%" },
  { id: 9, name: "Asite_Export_Mar26.zip", rule: "Naming · container type", status: "fail", conf: "100%" },
  { id: 10, name: "PRJ-SYL-03-02-VS-A-300041.nwd", rule: "Metadata · suitability code", status: "warn", conf: "81%" },
];

const DOC_CHECKS = {
  pass: [
    { type: "pass", lbl: "Project code", det: "PRJ-SYL — matches register", pct: "" },
    { type: "pass", lbl: "Originator code", det: "Valid against asset team list", pct: "" },
    { type: "pass", lbl: "Container type", det: "DR (drawing) — permitted in WIP", pct: "" },
    { type: "pass", lbl: "Suitability code", det: "S2 — Information for non-contractual use", pct: "" },
    { type: "pass", lbl: "Revision sequence", det: "P03.2 follows P03.1", pct: "" },
    { type: "warn", lbl: "Metadata completeness", det: "Title & purpose-of-issue present; client-ref empty", pct: "92%" },
  ],
  fail: [
    { type: "fail", lbl: "Naming convention", det: "Free-text filename — 7 of 9 fields missing", pct: "" },
    { type: "fail", lbl: "Container code", det: "No origin/role/zone identifier present", pct: "" },
    { type: "fail", lbl: "Suitability code", det: "Cannot infer status from filename", pct: "" },
    { type: "warn", lbl: "Permitted in WIP", det: "Container is in Work-in-Progress folder", pct: "" },
    { type: "pass", lbl: "Virus scan", det: "Clean — ClamAV 2026.04", pct: "" },
  ],
  warn: [
    { type: "pass", lbl: "Project code", det: "PRJ-SYL — matches register", pct: "" },
    { type: "pass", lbl: "Container code", det: "Valid 7-field structure", pct: "" },
    { type: "warn", lbl: "Suitability code", det: "S0 (initial issue) but rev is P02.3", pct: "84%" },
    { type: "warn", lbl: "Metadata: client-ref", det: "Missing — required by EIR §4.3", pct: "" },
    { type: "pass", lbl: "Geometry checksum", det: "Matches uploaded artefact", pct: "" },
  ],
};

const COMPLIANCE_BARS = [
  { k: "Naming convention", v: 91, ok: "pass", n: "2,588 / 2,847" },
  { k: "Container codes", v: 87, ok: "pass", n: "2,477 / 2,847" },
  { k: "Metadata completeness", v: 78, ok: "warn", n: "2,221 / 2,847" },
  { k: "Suitability codes", v: 82, ok: "warn", n: "2,334 / 2,847" },
  { k: "Workflow adoption", v: 54, ok: "fail", n: "1,537 / 2,847" },
  { k: "Revision discipline", v: 88, ok: "pass", n: "2,506 / 2,847" },
  { k: "Approval audit trail", v: 71, ok: "warn", n: "2,021 / 2,847" },
];

const ACTIVITY = [
  { t: "09:42", g: "pass", body: "Container batch validated", det: "47 documents · package WP-04", user: "auto" },
  { t: "09:38", g: "warn", body: "Suitability code mismatch flagged", det: "3 docs · awaiting reviewer", user: "auto" },
  { t: "09:21", g: "pass", body: "Naming convention enforced on upload", det: "1 doc rejected at CDE boundary", user: "asite" },
  { t: "08:55", g: "pass", body: "EIR §4.3 metadata fields confirmed", det: "Sample n=120 · 96.7% complete", user: "auto" },
  { t: "08:30", g: "fail", body: "Free-text upload blocked", det: "User notified · pattern documented", user: "asite" },
  { t: "08:12", g: "pass", body: "Health Check weekly report compiled", det: "Delivered to client portal", user: "awen" },
  { t: "yest.", g: "pass", body: "BEP §6 alignment review complete", det: "12 sections · 0 deviations", user: "m.evans" },
  { t: "yest.", g: "warn", body: "Workflow adoption below threshold", det: "WP-07 at 51% · trend declining 4w", user: "auto" },
];

// === Components ===

function AwenChrome() {
  return (
    <div className="awen-chrome">
      <div className="awen-chrome-left">
        <div className="awen-chrome-dots"><span></span><span></span><span></span></div>
        <img src="assets/awen-logo-dark.svg" alt="Awen" style={{ height: 22, display: 'block', opacity: 0.95 }} />
        <span style={{ color: 'rgba(241,237,227,0.35)', fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
          v4.2 · sample workspace
        </span>
      </div>
      <div className="awen-chrome-right">
        <span>live</span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

function AwenTabs({ active, onChange }) {
  const tabs = [
    { id: "docs", num: "01", lbl: "Documents" },
    { id: "comp", num: "02", lbl: "Compliance" },
    { id: "act", num: "03", lbl: "Activity" },
  ];
  return (
    <div className="awen-tabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`awen-tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="num">{t.num}</span>
          {t.lbl}
        </button>
      ))}
    </div>
  );
}

function AwenDocsTab() {
  const [selected, setSelected] = useState(3);
  const doc = SAMPLE_DOCS.find(d => d.id === selected);
  const checks = DOC_CHECKS[doc.status];

  return (
    <div className="awen-doc-grid">
      <div className="awen-panel">
        <div className="awen-panel-head">
          <span className="awen-panel-title">Document register · WIP</span>
          <span className="awen-panel-aux">2,847 total · scanning live</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {SAMPLE_DOCS.map(d => (
            <div
              key={d.id}
              className={`awen-doc-row ${selected === d.id ? 'selected' : ''}`}
              onClick={() => setSelected(d.id)}
            >
              <span className={`status ${d.status}`}></span>
              <span className="name">{d.name}</span>
              <span className="rule">{d.rule}</span>
              <span className="conf">{d.conf}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="awen-detail">
        <div className="awen-detail-head">
          <span className="awen-detail-meta">Selected · ID #{doc.id}</span>
          <span className="awen-detail-name">{doc.name}</span>
          <span className="awen-detail-meta" style={{ marginTop: 4 }}>
            Rule set · {doc.rule} · confidence {doc.conf}
          </span>
        </div>
        <div className="awen-checks">
          {checks.map((c, i) => (
            <div key={i} className={`awen-check ${c.type}`}>
              <span className="icon">{c.type === 'pass' ? '✓' : c.type === 'warn' ? '!' : '✕'}</span>
              <span className="lbl">
                {c.lbl}
                {c.det && <span className="det">{c.det}</span>}
              </span>
              <span className="pct">{c.pct}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(241,237,227,0.08)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={btnDark}>Generate remediation note</button>
          <button style={btnDarkGhost}>Open in CDE</button>
        </div>
      </div>
    </div>
  );
}

const btnDark = {
  fontFamily: 'var(--mono)',
  fontSize: '10.5px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '10px 14px',
  background: 'var(--bg)',
  color: 'var(--ink)',
  border: '1px solid var(--bg)',
  cursor: 'pointer',
};

const btnDarkGhost = {
  ...btnDark,
  background: 'transparent',
  color: 'rgba(241,237,227,0.78)',
  border: '1px solid rgba(241,237,227,0.18)',
};

function AwenCompTab() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="awen-comp">
      <div className="awen-comp-aside">
        <div className="awen-score">
          <div className="label">Composite compliance · 14d</div>
          <div className="v">73<span className="pct">%</span></div>
          <div className="trend">
            <span className="delta">↑ 32 pts</span> from 41% baseline · 14 Apr
          </div>
        </div>
        <div className="awen-score">
          <div className="label">Documents in scope</div>
          <div className="v" style={{ fontSize: 56 }}>2,847</div>
          <div className="trend">
            <span>14 work packages · 6 platforms</span>
          </div>
        </div>
      </div>

      <div className="awen-bars">
        <div className="awen-panel-head" style={{ marginBottom: 8 }}>
          <span className="awen-panel-title">Compliance by rule</span>
          <span className="awen-panel-aux">ISO 19650-2:2018 · BS 1192</span>
        </div>
        {COMPLIANCE_BARS.map((b, i) => (
          <div key={i} className="awen-bar">
            <div className="awen-bar-head">
              <span>{b.k}</span>
              <span className="pct">{b.v}%</span>
            </div>
            <div className="awen-bar-track">
              <div
                className={`awen-bar-fill ${b.ok}`}
                style={{
                  width: animated ? `${b.v}%` : '0%',
                  transitionDelay: `${i * 80}ms`,
                }}
              ></div>
            </div>
            <div className="awen-bar-meta">{b.n} containers</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spark({ data, accent = "var(--accent)" }) {
  const w = 240, h = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * step;
    const y = h - ((d - min) / range) * (h - 8) - 4;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg className="awen-spark-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={area} fill={accent} opacity="0.12" />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.4" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={accent} />
    </svg>
  );
}

function AwenActTab() {
  return (
    <div className="awen-act">
      <div className="awen-feed">
        <div className="awen-panel-head" style={{ marginBottom: 0 }}>
          <span className="awen-panel-title">Activity · last 24 hours</span>
          <span className="awen-panel-aux">All events · auto + human</span>
        </div>
        {ACTIVITY.map((a, i) => (
          <div key={i} className="awen-feed-item">
            <span className="time">{a.t}</span>
            <span className={`glyph status ${a.g}`}></span>
            <span className="body">
              <strong>{a.body}.</strong> {a.det}
            </span>
            <span className="user">{a.user}</span>
          </div>
        ))}
      </div>
      <div className="awen-sparkstack">
        <div className="awen-spark-card">
          <div className="awen-spark-head">
            <span className="awen-spark-label">Compliance · 30d</span>
            <span className="awen-spark-v">73%</span>
          </div>
          <Spark data={[41, 44, 48, 52, 51, 56, 59, 61, 63, 64, 66, 68, 70, 72, 73]} />
        </div>
        <div className="awen-spark-card">
          <div className="awen-spark-head">
            <span className="awen-spark-label">Documents validated</span>
            <span className="awen-spark-v">2,847</span>
          </div>
          <Spark data={[800, 1100, 1340, 1580, 1720, 1980, 2120, 2310, 2480, 2590, 2702, 2780, 2820, 2847]} accent="#C9A24A" />
        </div>
        <div className="awen-spark-card">
          <div className="awen-spark-head">
            <span className="awen-spark-label">Remediation queue</span>
            <span className="awen-spark-v">147</span>
          </div>
          <Spark data={[420, 388, 360, 332, 308, 282, 254, 230, 209, 188, 174, 161, 152, 147]} accent="#87B58E" />
        </div>
      </div>
    </div>
  );
}

function AwenDashboard() {
  const [tab, setTab] = useState("docs");
  return (
    <div className="awen-frame">
      <AwenChrome />
      <AwenTabs active={tab} onChange={setTab} />
      <div className="awen-body">
        {tab === "docs" && <AwenDocsTab />}
        {tab === "comp" && <AwenCompTab />}
        {tab === "act" && <AwenActTab />}
      </div>
    </div>
  );
}

window.AwenDashboard = AwenDashboard;
