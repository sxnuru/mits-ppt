import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Cpu,
  Layers,
  ShieldCheck,
  Camera,
  Car,
  UserCheck,
  Server,
  Lock,
  ShieldAlert,
  Sliders,
  Check,
  X,
  Map,
  FileText,
  Fingerprint,
  Award,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

type SlideComponentProps = {
  isActive: boolean;
  locale?: "en";
  onAdvance?: () => void;
};

function slideClassName(isActive: boolean) {
  return `deck-slide${isActive ? " deck-active" : ""}`;
}

function stagger(index: number, extra?: CSSProperties) {
  return { "--i": index, ...extra } as CSSProperties;
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 1: COVER
// ────────────────────────────────────────────────────────────────────────────────
export function Slide01Cover({ isActive }: SlideComponentProps) {
  return (
    <section
      data-slide-idx={0}
      className={slideClassName(isActive)}
      id="s0"
      style={{ alignItems: "flex-start", justifyContent: "center" }}
    >
      <div className="cover-grid" />
      <div className="cover-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ opacity: 1 }}>▸</div>
        <h1 className="title" data-split-chars style={{ opacity: 1, color: "#00d4ff", textShadow: "0 0 40px rgba(0, 212, 255,0.3)" }}>
          MITS
        </h1>
        <div className="cover-line" style={{ width: "240px", height: "4px", background: "#00d4ff", margin: "20px 0" }} />
        <div className="title-sub" style={{ opacity: 1, fontSize: "32px", fontWeight: 500, color: "#ffffff", maxWidth: "1200px" }}>
          Multiple Identity & Tracking System
        </div>
        <div className="sub" style={{ opacity: 1, fontSize: "22px", color: "rgba(255,255,255,0.95)", marginTop: "12px", maxWidth: "900px", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          Advanced Vehicle & Personnel Intelligence (AVPI)
        </div>
        <div className="title-meta" style={{ opacity: 1, marginTop: "60px", color: "rgba(255,255,255,0.9)", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          Unified Edge Intelligence for Public Safety, Safe Cities & Gated Communities in Pakistan
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 1b: ABOUT RELIANCE & ALT
// ────────────────────────────────────────────────────────────────────────────────
export function Slide01bAbout({ isActive }: SlideComponentProps) {
  return (
    <section data-slide-idx={1} className={slideClassName(isActive)} id="s1b">
      <div className="eyebrow" style={{ opacity: 1 }}>BEHIND MITS</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "48px", fontWeight: "bold", marginBottom: "40px" }}>The Synergy of Hardware & Software</h2>
      
      <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Reliance Container */}
        <div style={{ display: "flex", flexDirection: "column", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "48px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
            <img src="/assets/reliance.jpg" alt="Reliance" style={{ width: "84px", height: "84px", objectFit: "cover", borderRadius: "12px" }} />
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#ffffff" }}>Reliance Corporation</div>
          </div>
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.9)", lineHeight: "1.7" }}>
            Reliance Corporation (Pvt.) Ltd. is a dynamic and forward-thinking organization with a strong presence across international markets, supported by its sister concerns including Reliance Hardware Technologies and Reliance Link Trading. The Group specializes in import and export solutions for hardware, IT equipment, and advanced technology systems, offering comprehensive procurement and logistics services to a diverse client base.
          </div>

          {/* Sub-division: Anti Linear Tech */}
          <div style={{ marginTop: "44px", paddingTop: "44px", borderTop: "2px dashed rgba(255,255,255,0.15)", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "12px", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/assets/alt.png" alt="Anti Linear Tech" style={{ width: "72px", height: "72px", objectFit: "contain" }} />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff" }}>Anti Linear Technologies</div>
            </div>
            <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.9)", lineHeight: "1.7" }}>
              At Anti Linear Technologies, we believe the most effective route to innovation isn't always a straight line. We are a specialized software studio providing the technical agility that modern businesses need to scale. We deliver the engineering precision that turns ambitious concepts into functional, secure, and beautiful digital reality. Built in Pakistan, engineered for the global market.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 2: THE PROBLEM (GRAPH 1: PREMIUM CUSTOM CURVE)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide02Problem({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const problems = [
    {
      icon: Layers,
      title: "Checkpoint Bottlenecks",
      desc: "Gated residential estates (DHA, Bahria Town, Askari) rely on manual guard logs, causing massive peak-hour gate congestion."
    },
    {
      icon: Lock,
      title: "Connectivity Gaps",
      desc: "Severe load-shedding and high WAN/cellular internet latency in Pakistan disrupt traditional cloud-based ALPR cameras."
    },
    {
      icon: ShieldAlert,
      title: "Siloed Legacy Systems",
      desc: "Safe Cities and security teams run disconnected tools. Local guards cannot cross-match biometric faces to vehicle plates."
    }
  ];

  // Curve points representing peak delay dropping from 124s down to 1.5s after MITS Edge AI
  const curvePath = "M 60 110 C 160 80, 240 50, 300 50 C 380 50, 440 180, 540 175 C 570 175, 590 160, 610 145";
  const areaPath = `${curvePath} L 610 215 L 60 215 Z`;

  return (
    <section data-slide-idx={2} className={slideClassName(isActive)} id="s1">
      <div className="eyebrow" style={{ opacity: 1 }}>THE PROBLEM</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "72px" }}>The Gated & Public Safety Surveillance Gap</h2>
      <div className="sub" style={{ opacity: 1, maxWidth: "1200px", marginBottom: "20px" }}>
        Security teams in Pakistan struggle with manual checks, fragmented tracking databases, and frequent network blackouts.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", marginTop: "10px" }}>
        {/* Left: Bullet Gaps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {problems.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className="card"
              style={{
                ...stagger(idx),
                opacity: 1,
                border: "1px solid rgba(239, 68, 68, 0.15)",
                background: "transparent",
                padding: "16px 20px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ color: "#ef4444" }}>
                  <Icon size={24} />
                </div>
                <div style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff" }}>{title}</div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "20px", marginTop: "10px", lineHeight: "1.5" }}>{desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 3: THE SOLUTION
// ────────────────────────────────────────────────────────────────────────────────
export function Slide03Solution({ isActive }: SlideComponentProps) {
  const solutions = [
    {
      icon: UserCheck,
      title: "Personnel Biometrics",
      desc: "Instant, local biometric matching that pairs driver faces to database records in under 5ms, operating under any light."
    },
    {
      icon: Car,
      title: "Vehicle ALPR",
      desc: "Extracts plate numbers, vehicle make, color, and registration details on localized, custom provincial formats."
    },
    {
      icon: ShieldCheck,
      title: "Multimodal Fusion",
      desc: "Correlates license plates, biometric identities, and threat triggers simultaneously on a single offline stream."
    }
  ];

  return (
    <section data-slide-idx={3} className={slideClassName(isActive)} id="s2">
      <div className="eyebrow" style={{ opacity: 1 }}>THE SOLUTION</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "56px" }}>One Platform. Local Intelligence. Zero Cloud Risk.</h2>
      <div className="sub" style={{ opacity: 1, maxWidth: "1200px", marginBottom: "40px" }}>
        MITS merges biometrics, vehicle profiling, and live threats into a single native compiler deployed directly at the local edge.
      </div>

      <div className="card-grid" style={{ gap: "32px" }}>
        {solutions.map(({ icon: Icon, title, desc }, idx) => (
          <div
            key={title}
            className="card card-green"
            style={{
              ...stagger(idx),
              opacity: 1,
              background: "transparent",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              padding: "48px 40px"
            }}
          >
            <div className="card-title" style={{ fontSize: "32px", color: "#ffffff", fontWeight: "bold" }}>{title}</div>
            <div className="card-body" style={{ color: "rgba(255,255,255,0.8)", fontSize: "22px", marginTop: "20px", lineHeight: "1.6" }}>{desc}</div>
          </div>
        ))}
      </div>

      <div
        className="deployment-note"
        style={{
          marginTop: "44px",
          fontSize: "20px",
          color: "#00d4ff",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 4: TECHNOLOGY EDGE (GRAPH 2: FOOTPRINT)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide04TechEdge({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const metrics = [
    {
      label: "Core Binary Footprint",
      val: "38 MB",
      comp: "1 GB – 4 GB",
      desc: "Ultra-compact C/C++ engine runs efficiently on existing lightweight roadside CPUs without framework bloat."
    },
    {
      label: "Biometric Template Size",
      val: "160x smaller",
      comp: "Baseline heavy profile",
      desc: "Compressed biometric profiles allow storing watchlists of up to 500 million identities directly in active RAM."
    },
    {
      label: "Cloud Dependency",
      val: "0%",
      comp: "High SaaS locks",
      desc: "Performs instant face and plate comparisons locally, immune to WAN internet blackouts or load-shedding drops."
    },
    {
      label: "Streams per CPU Core",
      val: "4 HD Feeds",
      comp: "1 Feed (GPU Required)",
      desc: "Supports 4 parallel 1080p camera streams locally on a standard low-cost CPU, saving substantial GPU CapEx."
    }
  ];

  return (
    <section data-slide-idx={4} className={slideClassName(isActive)} id="s3">
      <div className="eyebrow" style={{ opacity: 1, marginTop: "40px" }}>TECHNOLOGY EDGE</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>Built on Defense-Grade Native Edge AI</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "20px" }}>
        MITS replaces heavy, resource-intensive frameworks with a compact, hand-optimized vision compiler.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", marginTop: "10px" }}>
        {/* Left Side: Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {metrics.map(({ label, val, comp, desc }, idx) => (
            <div
              key={label}
              className="card"
              style={{
                ...stagger(idx),
                opacity: 1,
                padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent"
              }}
            >
              <div className="card-label" style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontWeight: "bold" }}>{label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "12px" }}>
                <div style={{ fontSize: "44px", fontWeight: "bold", color: "#00d4ff" }}>{val}</div>
                <div style={{ fontSize: "18px", color: "#ff5b5b", textDecoration: "line-through" }}>{comp}</div>
              </div>
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", marginTop: "12px", lineHeight: "1.4" }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Right Side: Graph 2 Footprint Visualizer */}
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            border: "1px solid rgba(0, 212, 255,0.15)",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "16px", color: "#00d4ff", textTransform: "uppercase", fontWeight: "bold" }}>Runtime Memory Footprint Comparison</div>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "#ffffff", marginTop: "10px" }}>Edge Computing Optimization</div>
          </div>

          <div style={{ margin: "30px 0" }}>
            {/* MITS Bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold", color: "#00d4ff" }}>MITS Native Compiler</span>
                <span style={{ fontFamily: "var(--mono)", color: "#00d4ff" }}>38 MB</span>
              </div>
              <div style={{ height: "18px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: animate ? "3.8%" : "0%",
                    background: "linear-gradient(90deg, #00d4ff, #0a8fa3)",
                    borderRadius: "8px",
                    transition: "width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) 0.5s"
                  }}
                />
              </div>
            </div>

            {/* Competitor Bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", marginBottom: "8px" }}>
                <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>Traditional CV Frameworks (PyTorch/Docker)</span>
                <span style={{ fontFamily: "var(--mono)", color: "#ff5b5b" }}>4,000 MB</span>
              </div>
              <div style={{ height: "18px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: animate ? "100%" : "0%",
                    background: "linear-gradient(90deg, #ff5b5b, #ef4444)",
                    borderRadius: "8px",
                    transition: "width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) 0.5s"
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "18px 24px",
              borderRadius: "14px",
              background: "rgba(0, 212, 255, 0.03)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.5"
            }}
          >
            <strong style={{ color: "#ffffff" }}>Local Processing Native:</strong> Saves hardware infrastructure budgets by fully running models on existing low-cost roadside servers without dedicated server GPUs.
          </div>
        </div>
      </div>
      
      {/* Certification Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ padding: "16px 32px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "99px", display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/assets/nist_logo.png" alt="NIST" style={{ height: "24px", objectFit: "contain" }} />
          <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: "bold", letterSpacing: "0.1em" }}>NIST & FIPS CERTIFIED</span>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)" }}>|</span>
          <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>Defense-grade encryption and biometric matching standards</span>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 5: PRODUCT CAPABILITIES
// ────────────────────────────────────────────────────────────────────────────────
export function Slide06FunctionalScope({ isActive }: SlideComponentProps) {
  const scopes = [
    {
      kicker: "A. VEHICLE INTELLIGENCE",
bullets: [
  "Hotlist & Stolen Vehicle Detection: Real-time cross-referencing against law enforcement databases for flagged or stolen vehicles.",
  "Illegal Plate Identification: Detects fraudulent, obscured, non-standard, or tampered license plates.",
  "Behavioral Forensics: Tracks suspicious movement patterns, including blacklisted entry attempts and high-speed trajectory analysis.",
  "Deep Metadata Profiling: Instant extraction of vehicle make, model, and color for high-accuracy suspect matching."
]
    },
    {
      kicker: "B. PERSONNEL BIOMETRICS",
      bullets: [
        "Biometric Watchlists: Instantly verifies driver faces against custom hotlists.",
        "Identity Correlation: Automatically links driver biometric matches with vehicle plate records.",
        "Liveness Defense: Blocks printed photos, 3D masks, and video stream injection bypasses."
      ]
    },
    {
      kicker: "C. SECURITY THREAT DETECTION",
      bullets: [
        "Active Weapon Alert: Detects brandished firearms instantly on stream.",
        "Feed Tampering Defense: Spots video signal loss, camera occlusion, or movement attempts.",
        "Evasion Tracking: Identifies subjects using face masks or helmets."
      ]
    },
    {
      kicker: "D. ACCESS & BARRICADE INTEGRATION",
      bullets: [
        "Gated Estate Automation: Direct barrier control triggers for DHA & Bahria checkpoints.",
        "Dynamic Guard Lists: Flag customized Whitelists (Residents) and Blacklists (Alerts) instantly.",
        "Webhook Notifications: Real-time event notifications sent directly to local responder devices."
      ]
    }
  ];

  return (
    <section data-slide-idx={5} className={slideClassName(isActive)} id="s4">
      <div className="eyebrow" style={{ opacity: 1 }}>PRODUCT CAPABILITIES</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "56px" }}>Localized Vehicle & Personnel Intelligence</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "16px" }}>
        MITS replaces multiple disconnected security devices with a single, highly unified multi-model edge AI stack.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {scopes.map(({ kicker, bullets }, idx) => (
          <div
            key={kicker}
            className="card"
            style={{
              ...stagger(idx),
              opacity: 1,
              padding: "16px 24px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "transparent"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "#00d4ff", display: "flex", alignItems: "center" }}>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "16px", color: "#00d4ff", fontWeight: "bold", letterSpacing: "0.05em" }}>
                {kicker}
              </div>
            </div>

            <ul style={{ marginTop: "12px", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {bullets.map((bullet) => {
                const parts = bullet.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':');
                return (
                  <li key={bullet} style={{ display: "flex", gap: "12px", fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.3" }}>
                    <span style={{ color: "#00d4ff", fontWeight: "bold", marginTop: "2px" }}>▸</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff", letterSpacing: "0.02em" }}>{title}</span>
                      {desc && <span style={{ opacity: 0.9 }}>{desc.trim()}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 6: OPERATIONAL METRICS (GRAPH 3: BANDWIDTH)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide07ProductRealTime({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const metrics = [
    {
      val: "98.6%",
      label: "Plate OCR Accuracy",
      desc: "Extreme Conditions",
      detail: "Reliably reads standard, custom, and damaged Pakistani plates under heavy rain, dust, headlight glare, and at highway speeds."
    },
    {
      val: "-41%",
      label: "False Alarm Reduction",
      desc: "Smart Sequence Validation",
      detail: "Eliminates false threat alerts by analyzing motion physics sequence frames, ignoring harmless static tools or backpacks."
    }
  ];

  return (
    <section data-slide-idx={6} className={slideClassName(isActive)} id="s5">
      <div className="eyebrow" style={{ opacity: 1 }}>OPERATIONAL METRICS</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>High-Fidelity Edge Operations in Real Time</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "40px" }}>
        Optimized to deliver sovereign public safety grade tracking results under extreme local conditions.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "20px" }}>
        {/* Left Side: Performance Metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {metrics.map(({ val, label, desc, detail }, idx) => (
            <div
              key={label}
              className="card"
              style={{
                ...stagger(idx),
                opacity: 1,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "30px 40px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                <span style={{ fontSize: "54px", fontWeight: "bold", color: "#00d4ff", fontFamily: "var(--serif)", lineHeight: "1" }}>{val}</span>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff" }}>{label}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#00d4ff", textTransform: "uppercase" }}>{desc}</div>
                </div>
              </div>
              <div style={{ fontSize: "17.5px", color: "rgba(255,255,255,0.6)", marginTop: "14px", lineHeight: "1.5" }}>{detail}</div>
            </div>
          ))}
        </div>

        {/* Right Side: Facial Recognition */}
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            border: "1px solid rgba(0, 212, 255, 0.15)",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "#00d4ff", textTransform: "uppercase", fontWeight: "bold" }}>Biometric Intelligence</span>
              <span style={{ background: "rgba(0, 212, 255, 0.1)", color: "#00d4ff", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "6px 14px", borderRadius: "99px", fontSize: "13px", fontFamily: "var(--mono)", fontWeight: "bold" }}>
                Active Scanning
              </span>
            </div>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#ffffff", marginTop: "24px" }}>Facial Recognition</div>
            <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", marginTop: "12px", lineHeight: "1.6" }}>
              Our native edge engine incorporates defense-grade biometric tracking for instantaneous personnel identification and security alerts.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "40px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ fontSize: "28px", color: "#00d4ff", fontWeight: "bold", width: "40px", fontFamily: "var(--mono)" }}>01</div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>Anti-Spoofing & Liveness</div>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginTop: "6px", lineHeight: "1.4" }}>Defeats printed photos, 3D masks, and digital screen bypass attempts.</div>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ fontSize: "28px", color: "#00d4ff", fontWeight: "bold", width: "40px", fontFamily: "var(--mono)" }}>02</div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>Million-Scale Watchlists</div>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginTop: "6px", lineHeight: "1.4" }}>Performs sub-100ms cross-referencing against massive local hotlists.</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ fontSize: "28px", color: "#00d4ff", fontWeight: "bold", width: "40px", fontFamily: "var(--mono)" }}>03</div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>Mask & Helmet Evasion</div>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginTop: "6px", lineHeight: "1.4" }}>Accurately detects and logs individuals attempting to obscure their identity.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 7: LIVE DEMO & VIDEO WORKFLOWS (MULTI-CAMERA)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide09AgentSwarms({
  isActive,
  onAdvance,
}: SlideComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <section
      data-slide-idx={7}
      className={slideClassName(isActive)}
      id="s8-video"
    >
      <div className="swarm-video-shell" data-stagger-item style={stagger(0)}>
        <div className="swarm-video-frame" id="s8-video-frame">
          <video
            ref={videoRef}
            className={`swarm-video${isActive ? " swarm-video-active" : ""}`}
            src="/assets/video-2.mp4"
            controls
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 1.0;
              event.currentTarget.playbackRate = 1.0;
            }}
            onEnded={() => onAdvance?.()}
          />
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 8: PAKISTAN MARKET & DYNAMICS (GRAPH 4: PREMIUM LINE SCALING)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide14WhyNow({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const marketDrivers = [
    {
      title: "1. High Power Efficiency",
      desc: "Running advanced security systems locally requires much less electricity, keeping operational costs extremely low."
    },
    {
      title: "2. Replacing High-Priced Legacy Solutions",
      desc: "Moving away from expensive, outdated monthly subscriptions in favor of modern, cost-effective infrastructure."
    },
    {
      title: "3. Local Storage for Sensitive Institutions",
      desc: "Keeping sensitive information strictly on-site to meet the strict security demands of government and defense agencies."
    }
  ];

  // SVG Line Chart coordinates representing streams yield growth
  const chartPoints = [
    { label: "Gen 1", value: 4, x: 60, y: 200 },
    { label: "Gen 2", value: 8, x: 170, y: 175 },
    { label: "Gen 3", value: 16, x: 280, y: 130 },
    { label: "Gen 4 (MITS)", value: 32, x: 390, y: 60 }
  ];

  const linePath = "M 60 200 C 120 190, 180 185, 230 160 C 280 135, 340 90, 390 60";
  const areaPath = `${linePath} L 390 230 L 60 230 Z`;

  return (
    <section data-slide-idx={8} className={slideClassName(isActive)} id="s7">
      <div className="eyebrow" style={{ opacity: 1 }}>WHY NOW</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>Why the shift is needed</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "40px" }}>
        MITS sits at the convergence of high-capacity edge hardware availability and tight data sovereignty demands.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
        {/* Left: Drivers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {marketDrivers.map(({ title, desc }, idx) => (
            <div
              key={title}
              className="card"
              style={{
                ...stagger(idx),
                opacity: 1,
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent"
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#00d4ff" }}>{title}</div>
              <div style={{ fontSize: "17.5px", color: "rgba(255,255,255,0.7)", marginTop: "8px", lineHeight: "1.5" }}>{desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 9: THE COMPETITIVE MATRIX
// ────────────────────────────────────────────────────────────────────────────────
export function Slide12CompetitiveMatrix({ isActive }: SlideComponentProps) {
  const comparisonData = [
    {
      feature: "Local Edge Deployment",
      mits: "Yes (ARM / CPU)",
      flock: "Leased Cloud Box",
      legacy: "Heavy GPU Server"
    },
    {
      feature: "Active Watchlist Storage",
      mits: "500M+ identities",
      flock: "N/A (Cloud Only)",
      legacy: "10M+ (Heavy memory)"
    },
    {
      feature: "Search Latency",
      mits: "<5ms Offline",
      flock: "High (Cloud Loop)",
      legacy: "Server rack dependent"
    },
    {
      feature: "Biometric & Plate Fusion",
      mits: "Face + Plate + Threat",
      flock: "ALPR Only",
      legacy: "Siloed Single Models"
    },
    {
      feature: "Air-Gapped Operation",
      mits: "100% Offline native",
      flock: "Cloud-locked",
      legacy: "Client sync required"
    }
  ];

  return (
    <section data-slide-idx={9} className={slideClassName(isActive)} id="s6">
      <div className="eyebrow" style={{ opacity: 1 }}>COMPETITIVE LANDSCAPE</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "56px" }}>Outpositioning Legacy Security Tech</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "26px" }}>
        Comparing critical operating metrics across biometric verification, local ALPR execution, and offline hardware sovereignty.
      </div>

      <div style={{ marginTop: "10px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "rgba(18,22,31,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            overflow: "hidden"
          }}
        >
          <thead>
            <tr style={{ background: "rgba(0, 212, 255, 0.08)", borderBottom: "1px solid rgba(0, 212, 255,0.2)" }}>
              <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "16px", color: "#00d4ff", fontWeight: "bold", width: "22%" }}>Capability</th>
              <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "16px", color: "#00d4ff", fontWeight: "bold", background: "rgba(0, 212, 255,0.05)", width: "32%" }}>MITS (Edge Native)</th>
              <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "16px", color: "rgba(255,255,255,0.5)", width: "23%" }}>Flock Safety</th>
              <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "16px", color: "rgba(255,255,255,0.5)", width: "23%" }}>Genetec / Legacy ALPR</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map(({ feature, mits, flock, legacy }, index) => (
              <tr
                key={feature}
                style={{
                  borderBottom: index === comparisonData.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  background: index % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent"
                }}
              >
                <td style={{ padding: "18px 20px", fontWeight: "bold", color: "#ffffff", fontSize: "15px" }}>{feature}</td>
                <td
                  style={{
                    padding: "18px 20px",
                    color: "#00d4ff",
                    fontWeight: 600,
                    fontSize: "20px",
                    background: "rgba(0, 212, 255,0.02)",
                    borderRight: "1px solid rgba(255,255,255,0.06)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Check size={16} strokeWidth={3} style={{ color: "#00d4ff" }} />
                    <span>{mits}</span>
                  </div>
                </td>
                <td style={{ padding: "18px 20px", fontSize: "20px", color: "rgba(255,255,255,0.6)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <X size={16} strokeWidth={3} style={{ color: "#ef4444" }} />
                    <span>{flock}</span>
                  </div>
                </td>
                <td style={{ padding: "18px 20px", fontSize: "20px", color: "rgba(255,255,255,0.6)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <X size={16} strokeWidth={3} style={{ color: "#ef4444" }} />
                    <span>{legacy}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 12: TRACTION & SCALE (GRAPH 5: PREMIUM CUSTOM OCR YIELD CURVE)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide17TractionTrust({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const trusts = [
    {
      val: "6",
      label: "Who will need MITS?",
      bullets: [
        { title: "Security agencies", sub: "Threat monitoring and suspect tracking" },
        { title: "Housing Societies", sub: "Automated residential gate access control" },
        { title: "Facilities", sub: "Hospitals, schools, and corporate campuses" },
        { title: "Airports", sub: "High-security perimeter and terminal surveillance" },
        { title: "Check points", sub: "Military and police barricade monitoring" },
        { title: "City-wide entry/exit points", sub: "Safe City vehicle and personnel logging" }
      ]
    }
  ];

  // Curve points representing OCR Yield Improvement over different environments
  const curvePath = "M 60 180 C 160 165, 240 160, 300 135 C 380 110, 440 70, 540 60 C 570 60, 590 60, 610 60";
  const areaPath = `${curvePath} L 610 215 L 60 215 Z`;

  return (
    <section data-slide-idx={11} className={slideClassName(isActive)} id="s10">
      <div className="eyebrow" style={{ opacity: 1 }}>TRACTION & PILOT VALIDATION</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>Proven Local Performance & Accuracy</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "40px" }}>
        MITS delivers highly accurate public safety biometrics and ALPR tracking adapted specifically for Pakistan's environment.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", marginTop: "20px" }}>
        {/* Left Side: Local Traction Numbers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {trusts.map(({ val, label, desc, bullets }: any, idx) => (
            <div
              key={label}
              className="card"
              style={{
                ...stagger(idx),
                opacity: 1,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "40px 50px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
                <span style={{ fontSize: "64px", fontWeight: "bold", color: "#00d4ff", fontFamily: "var(--serif)", lineHeight: "1" }}>{val}</span>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ffffff" }}>{label}</div>
                </div>
              </div>
              
              {/* Render either bullets or desc depending on what exists */}
              <div style={{ marginTop: "24px" }}>
                {bullets ? (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "40px", rowGap: "24px" }}>
                    {bullets.map((b:any, i:number) => (
                      <li key={i} style={{ display: "flex", gap: "16px", lineHeight: "1.4" }}>
                        <span style={{ color: "#00d4ff", fontWeight: "bold", marginTop: "2px", fontSize: "22px" }}>▸</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>{b.title}</span>
                          {b.sub && <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>{b.sub}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.6" }}>
                    {desc}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 13: THANK YOU / END
// ────────────────────────────────────────────────────────────────────────────────
export function Slide18ThankYou({ isActive }: SlideComponentProps) {
  return (
    <section data-slide-idx={11} className={slideClassName(isActive)} id="s11">
      <div className="end-glow" />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div
          className="end-mark"
          style={{
            opacity: 1,
            fontSize: "110px",
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "0.08em"
          }}
        >
          MITS
        </div>
        <div
          className="end-msg"
          style={{
            opacity: 1,
            fontSize: "36px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.8)",
            marginTop: "20px",
            lineHeight: "1.4"
          }}
        >
          Advanced Vehicle & Personnel Intelligence.
          <br />
        </div>
        <div
          className="end-meta"
          style={{
            opacity: 1,
            marginTop: "50px",
            fontFamily: "var(--mono)",
            fontSize: "18px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.2em"
          }}
        >
          THANK YOU · ANTILINEARTECH.COM
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// EXPORT LIST OF SLIDES (13 TOTAL EXPORTS)
// ────────────────────────────────────────────────────────────────────────────────
export const slides = [
  Slide01Cover,
  Slide01bAbout,
  Slide02Problem,
  Slide03Solution,
  Slide04TechEdge,
  Slide06FunctionalScope,
  Slide07ProductRealTime,
  Slide09AgentSwarms,
  Slide12CompetitiveMatrix,
  Slide17TractionTrust,
  Slide18ThankYou
] as const;
