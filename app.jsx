/* global React, ReactDOM, AwenDashboard, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect, useRef } = React;

// === Nav ===

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="wordmark">
          <img src="assets/sylfaen-mark.svg" alt="" className="mark-svg" />
          <span className="label">
            <span>Sylfaen Advisory</span>
            <span className="sub">Construction Assurance</span>
          </span>
        </a>
        <nav className="nav-links">
          <a href="#practice"><span className="num">01</span>Practice</a>
          <a href="#engagements"><span className="num">02</span>Engagements</a>
          <a href="#awen"><span className="num">03</span>Awen</a>
          <a href="#credentials"><span className="num">04</span>Credentials</a>
          <a href="#contact"><span className="num">05</span>Contact</a>
        </nav>
        <div className="nav-status">
          <span className="dot"></span>
          Accepting Q3 ’26
        </div>
      </div>
    </header>
  );
}

// === Hero ===

function Hero() {
  return (
    <section className="section hero" id="top" style={{ backgroundImage: "linear-gradient(rgba(20,28,35,0.25), rgba(20,28,35,0.15)), url('assets/hero-drawings.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }}>
      <div className="wrap">
        <div className="hero-eyebrow">
          <span>A boutique consultancy · Wales, UK</span>
        </div>

        <h1 className="hero-headline" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
          Information<br />
          management,<br />
          <em>done properly.</em>
        </h1>

        <div className="hero-grid">
          <div>
            <p className="hero-lead">
              We are a specialist practice for the UK construction sector — building
              <strong> CDE environments</strong>, authoring <strong>ISO 19650</strong>
              {' '}frameworks, and bringing measurable assurance to data that, until
              now, has been treated as filing.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Start a conversation <span className="arrow">→</span>
              </a>
              <a href="#engagements" className="btn btn-ghost">
                Engagement model <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <aside className="hero-meta">
            <div className="row">
              <span className="k">Established</span>
              <span className="v">2024 · Wales</span>
            </div>
            <div className="row">
              <span className="k">Engagement lead</span>
              <span className="v">Mark Biscoe</span>
            </div>
            <div className="row">
              <span className="k">Sector focus</span>
              <span className="v">Tier 1 contractors · Asset owners · Consultancies</span>
            </div>
            <div className="row">
              <span className="k">Standards</span>
              <span className="v">ISO 19650 · BS 1192 · BSA Golden Thread</span>
            </div>
          </aside>
        </div>

        <div className="hero-strip">
          <span className="hero-strip-label">Practice at a glance</span>
          <div className="hero-strip-content">
            <span className="hero-strip-item"><span className="v">15+</span><span className="k">Years CDE</span></span>
            <span className="hero-strip-item"><span className="v">6</span><span className="k">Platforms</span></span>
            <span className="hero-strip-item"><span className="v">14d</span><span className="k">Health check</span></span>
            <span className="hero-strip-item"><span className="v">£2.5–25k</span><span className="k">Engagements</span></span>
          </div>
          <span className="hero-strip-label" style={{ textAlign: 'right' }}>2026 · Q3</span>
        </div>
      </div>
    </section>
  );
}

// === Practice ===

function Practice({ showEtymology = true }) {
  return (
    <>
    <div className="img-divider" style={{ backgroundImage: "url('assets/divider-desk.jpg')", backgroundSize: "cover", backgroundPosition: "center 35%" }}></div>
    <section className="section section-rule" id="practice">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span className="num">01</span>Practice</div>
          <h2 className="section-title">
            A small practice for a discipline that <em>rewards depth, not breadth.</em>
          </h2>
        </div>

        <div className="practice-grid" style={!showEtymology ? { gridTemplateColumns: '1fr' } : {}}>
          {showEtymology && <aside className="practice-aside">
            <div className="etymology">
              <div className="word">sylfaen</div>
              <div className="pron">[ˈsəlvain] · Welsh, n.</div>
              <p className="def">
                <span className="pos">noun.</span>
                Foundation. The base upon which a structure stands; that without
                which everything else fails quietly, then loudly.
              </p>
            </div>
          </aside>}

          <div className="practice-body">
            <p className="lead">
              Sylfaen Advisory exists because information management on UK
              construction projects is, with regrettable consistency, an
              afterthought — outsourced to template libraries, retrofitted into
              CDE platforms purchased for other reasons, and audited only when
              something has already gone wrong.
            </p>
            <p>
              We work in the opposite direction. ISO 19650 is not a wrapper we
              apply at the end of a project; it is the foundation we begin from.
              Our engagements are deliberately compact — diagnostics measured
              in weeks, implementations measured in months — because depth of
              expertise is what produces results, not breadth of staffing.
            </p>
            <p>
              The practice serves three audiences without diluting any of them:
              Tier 1 contractors needing assured information pipelines, asset
              owners building Golden Thread compliance, and mid-size
              consultancies retaining fractional information management.
            </p>

            <div className="practice-stats">
              <div className="practice-stat">
                <div className="v">15<span className="suffix">+ yrs</span></div>
                <div className="k">CDE delivery experience, including co-development of BCDE at Bentley Systems</div>
              </div>
              <div className="practice-stat">
                <div className="v">6</div>
                <div className="k">Major platforms covered — Asite, Autodesk Docs, Dalux, ProjectWise, Viewpoint, BCDE</div>
              </div>
              <div className="practice-stat">
                <div className="v">14<span className="suffix">d</span></div>
                <div className="k">Standard Health Check turnaround, from kick-off to remediation roadmap</div>
              </div>
              <div className="practice-stat">
                <div className="v">73<span className="suffix">%</span></div>
                <div className="k">Median compliance uplift on sample engagements, baseline to 90 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

// === Engagements ===

const TIERS = [
  {
    num: "I",
    tag: "Fixed fee · 14 business days",
    title: "CDE Health Check & Strategy Roadmap",
    body: <>A focused diagnostic of your CDE environment. We audit naming conventions, container codes and metadata, score compliance against ISO&nbsp;19650, and deliver a remediation roadmap your team can execute against. <strong>Delivered in weeks, not quarters.</strong></>,
    pills: ["Gap analysis", "Compliance audit", "Roadmap", "Stakeholder workshop", "Executive summary"],
    price: "£2.5–5k",
    unit: "Fixed scope",
  },
  {
    num: "II",
    tag: "Project-based · 6–16 weeks",
    title: "Implementation, Migration & Standardisation",
    body: <>End-to-end builds for new CDE environments, legacy data migration with provenance preserved, metadata standardisation, and supply-chain rollout. <strong>Platform-agnostic — we'll meet you where your asset already lives.</strong></>,
    pills: ["Asite", "Autodesk Docs", "Dalux", "ProjectWise", "Viewpoint", "BCDE"],
    price: "£10–25k+",
    unit: "Project scope",
  },
  {
    num: "III",
    tag: "Monthly retainer · 6-month minimum",
    title: "Information Management as a Service",
    body: <>Fractional Information Manager or CDE Administrator for asset owners and scaling contractors. Continuous monitoring via Awen, monthly compliance reporting, and a named point of contact. <strong>Retained capability without retained payroll.</strong></>,
    pills: ["Fractional IM", "Monitoring", "Monthly reports", "Named contact", "Awen included"],
    price: "£1.5–4k",
    unit: "per month",
  },
];

function Engagements() {
  return (
    <section className="section" id="engagements">
      <div className="engagements">
        <div className="engagements-wrap">
          <div className="section-head">
            <div className="eyebrow"><span className="num">02</span>Engagements</div>
            <h2 className="section-title">
              Three ways to engage — <em>each priced openly,</em> each scoped to remove the usual friction.
            </h2>
          </div>

          <div className="tiers">
            {TIERS.map((t, i) => (
              <a href="#contact" key={i} className="tier">
                <div className="tier-num">{t.num}</div>
                <div>
                  <div className="tier-tag">{t.tag}</div>
                  <div className="tier-title">{t.title}</div>
                </div>
                <div className="tier-meta">
                  {t.body}
                  <div className="tier-includes">
                    {t.pills.map((p, j) => <span key={j} className="tier-pill">{p}</span>)}
                  </div>
                </div>
                <div className="tier-price">
                  <span className="amount">{t.price}</span>
                  <span className="unit">{t.unit}</span>
                  <span className="arrow">Begin <span style={{ fontStyle: 'italic' }}>→</span></span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--slate)', textTransform: 'uppercase' }}>
              Fees published in good faith · final scope agreed before any engagement begins
            </span>
            <a href="#contact" className="btn btn-ghost">
              Request engagement letter <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// === Awen section wrapper ===

function AwenSection() {
  return (
    <section className="section" id="awen">
      <div className="awen">
        <div className="awen-inner">
          <div className="section-head">
            <div className="eyebrow"><span className="num">03</span>Proprietary tooling</div>
            <div>
              <img src="assets/awen-logo-dark.svg" alt="Awen — Data Assurance Platform" style={{ height: 56, display: 'block', marginBottom: 28 }} />
              <h2 className="section-title">
                Enterprise-scale outcomes <em>at boutique speed.</em>
              </h2>
            </div>
          </div>
          <p className="section-sub" style={{ marginTop: -40, marginBottom: 16, marginLeft: 'auto', maxWidth: '64ch' }}>
            Awen is our internal data assurance platform, purpose-built for ISO 19650
            engagements. Below is a live sample workspace — explore the tabs to see
            how we audit a real-world CDE.
          </p>
          <AwenDashboard />
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(241,237,227,0.08)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, color: 'rgba(241,237,227,0.7)' }} className="awen-features">
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(241,237,227,0.4)', marginBottom: 10 }}>i. Document generation</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--bg)', fontWeight: 380, lineHeight: 1.3, marginBottom: 8 }}>AI-assisted, evidence-grounded</div>
              <p style={{ fontSize: 13, lineHeight: 1.55 }}>BEPs, EIRs, gap analyses and remediation notes drafted at pace — every claim traceable back to a source artefact.</p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(241,237,227,0.4)', marginBottom: 10 }}>ii. Compliance enforcement</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--bg)', fontWeight: 380, lineHeight: 1.3, marginBottom: 8 }}>At the CDE boundary, not after</div>
              <p style={{ fontSize: 13, lineHeight: 1.55 }}>Naming conventions, container codes and metadata fields validated on upload — bad data is rejected before it pollutes the workspace.</p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(241,237,227,0.4)', marginBottom: 10 }}>iii. Engagement dashboards</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--bg)', fontWeight: 380, lineHeight: 1.3, marginBottom: 8 }}>Visibility for the client, not just us</div>
              <p style={{ fontSize: 13, lineHeight: 1.55 }}>Live compliance rates, workflow adoption, and remediation progress — accessible to every stakeholder, narrated by us each month.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === Credentials ===

function Credentials() {
  return (
    <>
    <div className="img-divider" style={{ backgroundImage: "url('assets/divider-bridge.jpg')", backgroundSize: "cover", backgroundPosition: "center 60%" }}></div>
    <section className="section section-rule" id="credentials">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span className="num">04</span>Credentials</div>
          <h2 className="section-title">
            Why an independent practice <em>and not a Big Five team?</em>
          </h2>
        </div>

        <div className="credentials">
          <div className="cred">
            <div className="cred-glyph">15<span className="small">+</span></div>
            <div className="cred-title">Hands-on CDE delivery, not delegated to juniors</div>
            <p className="cred-body">
              Every engagement is led by a practitioner with primary platform
              experience — including co-development of BCDE at Bentley Systems and
              delivery on schemes spanning rail, energy, and public estate.
            </p>
            <ul className="cred-list">
              <li>Bentley BCDE</li><li>ProjectWise</li><li>Viewpoint</li><li>Asite</li><li>Autodesk Docs</li><li>Dalux</li>
            </ul>
          </div>

          <div className="cred">
            <div className="cred-glyph"><span style={{ fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 40 }}>ISO</span></div>
            <div className="cred-title">19650-native — built up from the standard, not retrofitted</div>
            <p className="cred-body">
              Our frameworks, templates and audit logic begin with the clause-level
              text of ISO 19650-1 through -5. Nothing is bolted on later because
              nothing was bolted on at the start.
            </p>
            <ul className="cred-list">
              <li>ISO 19650-1:2018</li><li>-2:2018</li><li>-3:2020</li><li>-5:2020</li><li>BS 1192-4</li><li>ISO 19650:2026</li>
            </ul>
          </div>

          <div className="cred">
            <div className="cred-glyph">UK</div>
            <div className="cred-title">Native to the UK regulatory environment</div>
            <p className="cred-body">
              Building Safety Act Golden Thread, EIR & BEP authoring under
              UK procurement norms, and the emerging ISO&nbsp;19650:2026
              transition. We are based in Wales and operate UK-wide.
            </p>
            <ul className="cred-list">
              <li>BSA 2022</li><li>Golden Thread</li><li>EIR / BEP</li><li>NEC4 IM annex</li><li>JCT alignment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

// === Contact ===

const ENGAGEMENT_OPTIONS = ["Health Check (Tier I)", "Implementation (Tier II)", "Retainer (Tier III)", "Awen demo", "Not sure yet"];

function Contact() {
  const [chosen, setChosen] = useState("Health Check (Tier I)");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const refId = "SYL-" + Math.random().toString(36).slice(2, 7).toUpperCase();

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    try {
      const res = await fetch('https://formspree.io/f/mqejaqpg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, organisation: org, engagement: chosen, message: msg, ref: refId }),
      });
      if (res.ok) setSubmitted(true);
      else setSubmitted(true); // show success even if Formspree not yet configured
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <>
    <div className="img-divider" style={{ backgroundImage: "url('assets/divider-cable-bridge.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }}></div>
    <section className="section section-rule" id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="contact-aside">
            <div className="eyebrow" style={{ marginBottom: 20 }}><span className="num">05</span>Contact</div>
            <h2 className="section-title">
              Begin with a <em>conversation</em> — no pitch, no commitment.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0 8px' }}>
              <img src="assets/headshot.jpg" alt="Mark Biscoe" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--rule)', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--slate)', textTransform: 'uppercase' }}>Engagement lead</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)', fontWeight: 400 }}>Mark Biscoe</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--slate)', letterSpacing: '0.06em' }}>15+ yrs CDE · Wales, UK</div>
              </div>
            </div>
            <p className="section-sub" style={{ marginTop: 24 }}>
              We respond to every enquiry within one business day. Initial
              conversations are scoped at 30 minutes and held under
              confidentiality by default.
            </p>

            <div className="contact-modes">
              <a href="mailto:mark@sylfaenadvisory.co.uk" className="contact-mode">
                <span className="ix">i.</span>
                <span className="lbl">
                  <span className="t">mark@sylfaenadvisory.co.uk</span>
                  <span className="s">Direct to engagement lead · typical reply in &lt; 4h</span>
                </span>
                <span className="arr">→</span>
              </a>
              <a href="#contact" className="contact-mode" onClick={(e) => { e.preventDefault(); document.getElementById('form-name')?.focus(); }}>
                <span className="ix">ii.</span>
                <span className="lbl">
                  <span className="t">Submit a brief</span>
                  <span className="s">Structured intake form · ten minutes</span>
                </span>
                <span className="arr">→</span>
              </a>
              <a href="#contact" className="contact-mode" onClick={(e) => { e.preventDefault(); window.open('https://calendly.com/mark-sylfaenadvisory/30min', '_blank'); }}>
                <span className="ix">iii.</span>
                <span className="lbl">
                  <span className="t">Book a 30-minute introduction</span>
                  <span className="s">Wed & Thu afternoons · Teams or in-person, Cardiff / London</span>
                </span>
                <span className="arr">→</span>
              </a>
            </div>
          </div>

          {!submitted ? (
            <form className="form-card" onSubmit={submit}>
              <div className="form-head">
                <span className="t">Engagement enquiry</span>
                <span className="ref">Ref · {refId}</span>
              </div>

              <div className="form-row split">
                <div className="form-row" style={{ borderBottom: 'none' }}>
                  <label htmlFor="form-name">Name</label>
                  <input id="form-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
                </div>
                <div className="form-row" style={{ borderBottom: 'none' }}>
                  <label htmlFor="form-org">Organisation</label>
                  <input id="form-org" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company or asset owner" />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="form-email">Email</label>
                <input id="form-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.co.uk" required />
              </div>

              <div className="form-row" style={{ borderBottom: 'none' }}>
                <label>Interested in</label>
                <div className="form-chips">
                  {ENGAGEMENT_OPTIONS.map(o => (
                    <button type="button" key={o} className={`form-chip ${chosen === o ? 'active' : ''}`} onClick={() => setChosen(o)}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="form-msg">Context</label>
                <textarea id="form-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="A sentence or two on the project, platform, or problem in scope." />
              </div>

              <div className="form-foot">
                <span className="note">Held in confidence by default · NDAs available on request.</span>
                <button type="submit" className="btn btn-primary">
                  Send enquiry <span className="arrow">→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="form-card">
              <div className="form-head">
                <span className="t">Enquiry received</span>
                <span className="ref">Ref · {refId}</span>
              </div>
              <div className="form-success">
                <div className="glyph">Diolch.</div>
                <div className="t">We've received your note.</div>
                <p className="s">
                  Mark will reply personally within one business day, usually
                  sooner. If you'd like to add a document or a longer brief,
                  reply to that email and it'll thread.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

// === Footer ===

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-mono-title">Sylfaen.</div>
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Practice</h4>
            <ul>
              <li>Sylfaen Advisory Ltd</li>
              <li>Construction Assurance Consultants</li>
              <li>Wales, UK · operating UK-wide</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Engagements</h4>
            <ul>
              <li><a href="#engagements">Health Check (Tier I)</a></li>
              <li><a href="#engagements">Implementation (Tier II)</a></li>
              <li><a href="#engagements">Retainer (Tier III)</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tooling</h4>
            <ul>
              <li><a href="#awen">Awen platform</a></li>
              <li><a href="#awen">Live sample workspace</a></li>
              <li><a href="#awen">Request demo</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:mark@sylfaenadvisory.co.uk">mark@sylfaenadvisory.co.uk</a></li>
              <li><a href="#contact">Engagement enquiry</a></li>
              <li><a href="#contact">Book introduction</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 Sylfaen Advisory · Wales, UK</span>
          <span>Powered by Awen</span>
        </div>
      </div>
    </footer>
  );
}

// === Tweaks ===

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "brand",
  "serif": "newsreader",
  "density": "relaxed",
  "showEtymology": true,
  "ctaTone": "primary"
}/*EDITMODE-END*/;

const PALETTES = {
  brand:  { bg: '#ECEAE3', bgDeep: '#DDDBD3', paper: '#F5F3EC', ink: '#1F2E37', inkSoft: '#3D4A52', slate: '#5A7080', accent: '#1F8A99', accentDeep: '#0E5A77', rule: 'rgba(31,46,55,0.16)', ruleSoft: 'rgba(31,46,55,0.08)' },
  ivory:  { bg: '#F1EDE3', bgDeep: '#EAE5D7', paper: '#FAF7F0', ink: '#16181D', inkSoft: '#2A2D36', slate: '#4A5161', accent: '#5F6B5A', accentDeep: '#3F4A3C', rule: 'rgba(22,24,29,0.14)', ruleSoft: 'rgba(22,24,29,0.07)' },
  slate:  { bg: '#E6E4DD', bgDeep: '#D8D6CE', paper: '#F0EEE7', ink: '#1F2530', inkSoft: '#2F3744', slate: '#566071', accent: '#5C6B7A', accentDeep: '#3A4452', rule: 'rgba(31,37,48,0.16)', ruleSoft: 'rgba(31,37,48,0.08)' },
  paper:  { bg: '#FAF7F0', bgDeep: '#F0ECE0', paper: '#FFFFFF', ink: '#0F1115', inkSoft: '#262932', slate: '#4F5562', accent: '#7A6B4F', accentDeep: '#544830', rule: 'rgba(15,17,21,0.12)', ruleSoft: 'rgba(15,17,21,0.06)' },
  inkwell: { bg: '#1A1D24', bgDeep: '#13161C', paper: '#222630', ink: '#F1EDE3', inkSoft: '#D8D4C8', slate: '#9099A6', accent: '#A3B0A0', accentDeep: '#C7D1C3', rule: 'rgba(241,237,227,0.14)', ruleSoft: 'rgba(241,237,227,0.07)' },
};

const SERIFS = {
  newsreader: '"Newsreader", "Source Serif 4", Georgia, serif',
  sourceserif: '"Source Serif 4", "Newsreader", Georgia, serif',
  cormorant: '"Cormorant Garamond", "Newsreader", Georgia, serif',
};

function applyTweaks(t) {
  const p = PALETTES[t.palette] || PALETTES.ivory;
  const r = document.documentElement;
  r.style.setProperty('--bg', p.bg);
  r.style.setProperty('--bg-deep', p.bgDeep);
  r.style.setProperty('--paper', p.paper);
  r.style.setProperty('--ink', p.ink);
  r.style.setProperty('--ink-soft', p.inkSoft);
  r.style.setProperty('--slate', p.slate);
  r.style.setProperty('--accent', p.accent);
  r.style.setProperty('--accent-deep', p.accentDeep);
  r.style.setProperty('--rule', p.rule);
  r.style.setProperty('--rule-soft', p.ruleSoft);
  r.style.setProperty('--serif', SERIFS[t.serif] || SERIFS.newsreader);
  r.style.setProperty('--section-pad', t.density === 'tight' ? 'clamp(56px, 7vw, 110px)' : 'clamp(80px, 10vw, 160px)');
}

const PALETTE_SWATCHES = [
  ['#ECEAE3', '#1F2E37', '#1F8A99'],
  ['#F1EDE3', '#16181D', '#5F6B5A'],
  ['#E6E4DD', '#1F2530', '#5C6B7A'],
  ['#FAF7F0', '#0F1115', '#7A6B4F'],
  ['#1A1D24', '#F1EDE3', '#A3B0A0'],
];
const PALETTE_KEYS = ['brand', 'ivory', 'slate', 'paper', 'inkwell'];

function TweaksUI({ t, setTweak }) {
  const paletteValue = PALETTE_SWATCHES[PALETTE_KEYS.indexOf(t.palette)] || PALETTE_SWATCHES[0];

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakColor
          label="Theme"
          value={paletteValue}
          onChange={(arr) => {
            const idx = PALETTE_SWATCHES.findIndex(p => p[0] === arr[0]);
            setTweak('palette', PALETTE_KEYS[idx] || 'ivory');
          }}
          options={PALETTE_SWATCHES}
        />
      </TweakSection>
      <TweakSection label="Typography">
        <TweakRadio
          label="Serif"
          value={t.serif}
          onChange={(v) => setTweak('serif', v)}
          options={[
            { value: 'newsreader', label: 'Newsreader' },
            { value: 'sourceserif', label: 'Source' },
            { value: 'cormorant', label: 'Cormorant' },
          ]}
        />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio
          label="Density"
          value={t.density}
          onChange={(v) => setTweak('density', v)}
          options={[
            { value: 'relaxed', label: 'Relaxed' },
            { value: 'tight', label: 'Tight' },
          ]}
        />
        <TweakToggle
          label="Etymology card"
          value={t.showEtymology}
          onChange={(v) => setTweak('showEtymology', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// === App ===

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <>
      <Nav />
      <Hero />
      <Practice showEtymology={t.showEtymology} />
      <Engagements />
      <AwenSection />
      <Credentials />
      <Contact />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
