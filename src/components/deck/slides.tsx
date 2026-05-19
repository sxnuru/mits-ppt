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
        <div className="eyebrow" style={{ opacity: 1 }}>▸ CONFIDENTIAL · PITCH DECK</div>
        <h1 className="title" data-split-chars style={{ opacity: 1, color: "#00d4ff", textShadow: "0 0 40px rgba(0, 212, 255,0.3)" }}>
          MITS
        </h1>
        <div className="cover-line" style={{ width: "240px", height: "4px", background: "#00d4ff", margin: "20px 0" }} />
        <div className="title-sub" style={{ opacity: 1, fontSize: "32px", fontWeight: 500, color: "#ffffff", maxWidth: "1200px" }}>
          Multiple Identity & Tracking System
        </div>
        <div className="sub" style={{ opacity: 1, fontSize: "22px", color: "rgba(255,255,255,0.7)", marginTop: "12px", maxWidth: "900px" }}>
          Advanced Vehicle & Personnel Intelligence (AVPI)
        </div>
        <div className="title-meta" style={{ opacity: 1, marginTop: "60px", color: "rgba(255,255,255,0.4)" }}>
          Unified Edge Intelligence for Public Safety, Safe Cities & Gated Communities in Pakistan | 2026
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
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Left: Reliance */}
        <div style={{ display: "flex", flexDirection: "column", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <img src="/assets/reliance.jpg" alt="Reliance" style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "8px" }} />
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>Reliance Corporation</div>
          </div>
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
            Reliance Corporation (Pvt.) Ltd. is a dynamic and forward-thinking organization with a strong presence across international markets, supported by its sister concerns including Reliance Hardware Technologies and Reliance Link Trading. The Group specializes in import and export solutions for hardware, IT equipment, and advanced technology systems, offering comprehensive procurement and logistics services to a diverse client base. With a firm commitment to customer satisfaction, operational excellence, and reliability, Reliance has established itself as a trusted partner for businesses seeking efficient and cost-effective solutions.
          </div>
        </div>

        {/* Right: Anti Linear Tech */}
        <div style={{ display: "flex", flexDirection: "column", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/assets/alt.png" alt="Anti Linear Tech" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff" }}>Anti Linear Technologies</div>
          </div>
          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
            At Anti Linear Technologies, we believe the most effective route to innovation isn't always a straight line. We are a specialized software studio providing the technical agility that modern businesses need to scale. We deliver the engineering precision that turns ambitious concepts into functional, secure, and beautiful digital reality. Built in Pakistan, engineered for the global market—we code the extraordinary so you can lead your industry.
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
    <section data-slide-idx={1} className={slideClassName(isActive)} id="s1">
      <div className="eyebrow" style={{ opacity: 1 }}>THE PROBLEM</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "56px" }}>The Gated & Public Safety Surveillance Gap</h2>
      <div className="sub" style={{ opacity: 1, maxWidth: "1200px", marginBottom: "20px" }}>
        Security teams in Pakistan struggle with manual checks, fragmented tracking databases, and frequent network blackouts.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "30px", marginTop: "10px" }}>
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
                <div style={{ fontSize: "19px", fontWeight: 600, color: "#ffffff" }}>{title}</div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginTop: "6px", lineHeight: "1.4" }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Right: SVG Graph 1 (Premium Curve Style) */}
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            border: "1px solid rgba(0, 212, 255, 0.15)",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#ffd166", textTransform: "uppercase" }}>Security Latency Impact</span>
              <span style={{ background: "transparent", color: "#ff8888", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "4px 10px", borderRadius: "99px", fontSize: "12px", fontFamily: "var(--mono)" }}>
                -90s Delay Drop
              </span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 600, color: "#ffffff", marginTop: "6px" }}>Checkpoint Gate Access Bottlenecks</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Verification delay spikes manually vs MITS automated edge entry</div>
          </div>

          <div style={{ width: "100%", height: "230px", marginTop: "10px" }}>
            <svg viewBox="0 0 650 260" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffd166" />
                  <stop offset="45%" stopColor="#ffd166" />
                  <stop offset="60%" stopColor="#ff5b5b" />
                  <stop offset="85%" stopColor="#ff5b5b" />
                  <stop offset="95%" stopColor="#00d4ff" />
                </linearGradient>

                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd166" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#ff5b5b" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#060b12" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="50" x2="610" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="105" x2="610" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="160" x2="610" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="215" x2="610" y2="215" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="25" y="55" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">125s</text>
              <text x="25" y="110" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">100s</text>
              <text x="25" y="165" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">75s</text>
              <text x="25" y="220" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">50s</text>

              {/* Area under curve */}
              <path
                d={areaPath}
                fill="url(#areaGradient)"
                style={{
                  opacity: animate ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out 0.8s"
                }}
              />

              {/* Curve Stroke Line */}
              <path
                d={curvePath}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 800,
                  strokeDashoffset: animate ? 0 : 800,
                  transition: "stroke-dashoffset 1.8s ease-in-out 0.3s"
                }}
              />

              {/* Nodes and Callout Labels */}
              {animate && (
                <>
                  {/* Peak Point Dec '25 */}
                  <g style={{ animation: "fadeIn 0.5s ease-out 0.9s forwards", opacity: 0 }}>
                    <circle cx="300" cy="50" r="14" fill="#ffd166" opacity="0.25" />
                    <circle cx="300" cy="50" r="6" fill="#ffffff" stroke="#ffd166" strokeWidth="3" />
                    <text x="300" y="26" fill="#ffd166" fontSize="13" fontWeight="bold" fontFamily="var(--sans)" fontStyle="italic" textAnchor="middle">PEAK 124s DELAY</text>
                  </g>

                  {/* Mid Drop Text Callout */}
                  <text x="420" y="105" fill="#ff5b5b" fontSize="11" fontWeight="bold" fontFamily="var(--sans)" letterSpacing="0.08em" textAnchor="middle">
                    –122s IN 3 MONTHS
                  </text>

                  {/* Bottom Point Mar '26 */}
                  <g style={{ animation: "fadeIn 0.5s ease-out 1.2s forwards", opacity: 0 }}>
                    <circle cx="540" cy="175" r="14" fill="#ff5b5b" opacity="0.25" />
                    <circle cx="540" cy="175" r="6" fill="#ffffff" stroke="#ff5b5b" strokeWidth="3" />
                    <text x="540" y="202" fill="#ff5b5b" fontSize="13" fontWeight="bold" fontFamily="var(--sans)" textAnchor="middle">-98%</text>
                  </g>

                  {/* Now Point Apr '26 */}
                  <g style={{ animation: "fadeIn 0.5s ease-out 1.5s forwards", opacity: 0 }}>
                    <circle cx="610" cy="145" r="14" fill="#00d4ff" opacity="0.3" />
                    <circle cx="610" cy="145" r="6" fill="#ffffff" stroke="#00d4ff" strokeWidth="3" />
                    <text x="615" y="122" fill="#00d4ff" fontSize="13" fontWeight="bold" fontFamily="var(--sans)" fontStyle="italic" textAnchor="end">MITS NOW &lt;1.5s</text>
                  </g>
                </>
              )}

              {/* X Axis Labels */}
              <text x="60" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Sep '25</text>
              <text x="138" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Oct '25</text>
              <text x="217" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Nov '25</text>
              <text x="295" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Dec '25</text>
              <text x="374" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Jan '26</text>
              <text x="452" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Feb '26</text>
              <text x="531" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Mar '26</text>
              <text x="610" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Apr '26</text>
            </svg>
          </div>
          <div style={{ textAlign: "center", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--sans)", fontStyle: "italic", marginTop: "16px", letterSpacing: "0.02em" }}>
            A massive 98% reduction in gate latency in just 3 months — The power of MITS localized Edge AI.
          </div>
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
    <section data-slide-idx={2} className={slideClassName(isActive)} id="s2">
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
              padding: "40px"
            }}
          >
            <div className="card-icon" style={{ color: "#00d4ff" }}>
              <Icon size={44} />
            </div>
            <div className="card-title" style={{ fontSize: "25px", color: "#ffffff", marginTop: "20px" }}>{title}</div>
            <div className="card-body" style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px", marginTop: "12px", lineHeight: "1.6" }}>{desc}</div>
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
    <section data-slide-idx={3} className={slideClassName(isActive)} id="s3">
      <div className="eyebrow" style={{ opacity: 1 }}>TECHNOLOGY EDGE</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>Built on Defense-Grade Native Edge AI</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "34px" }}>
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
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent"
              }}
            >
              <div className="card-label" style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "10px" }}>
                <div style={{ fontSize: "36px", fontWeight: "bold", color: "#00d4ff" }}>{val}</div>
                <div style={{ fontSize: "16px", color: "#ff5b5b", textDecoration: "line-through" }}>{comp}</div>
              </div>
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", marginTop: "10px", lineHeight: "1.4" }}>{desc}</div>
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
            <div style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "#00d4ff", textTransform: "uppercase" }}>Runtime Memory Footprint Comparison</div>
            <div style={{ fontSize: "28px", fontWeight: 600, color: "#ffffff", marginTop: "10px" }}>Edge Computing Optimization</div>
          </div>

          <div style={{ margin: "30px 0" }}>
            {/* MITS Bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold", color: "#00d4ff" }}>MITS Native Compiler</span>
                <span style={{ fontFamily: "var(--mono)", color: "#00d4ff" }}>38 MB</span>
              </div>
              <div style={{ height: "16px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", marginBottom: "8px" }}>
                <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>Traditional CV Frameworks (PyTorch/Docker)</span>
                <span style={{ fontFamily: "var(--mono)", color: "#ff5b5b" }}>4,000 MB</span>
              </div>
              <div style={{ height: "16px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
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
              padding: "16px 20px",
              borderRadius: "14px",
              background: "transparent",
              border: "1px solid rgba(0, 212, 255, 0.12)",
              fontSize: "16px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.5"
            }}
          >
            <strong>Local Processing Native:</strong> Saves hardware infrastructure budgets by fully running models on existing low-cost roadside servers without dedicated server GPUs.
          </div>
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
      icon: Car,
      bullets: [
        "Provincial Excise Support: Custom Punjab, Sindh, KPK, and Islamabad plates.",
        "Stylized Plate OCR: Translates non-standard fonts, sizes, and colors.",
        "Complete Profiling: Extracts vehicle model, make, and body color in real-time."
      ]
    },
    {
      kicker: "B. PERSONNEL BIOMETRICS",
      icon: UserCheck,
      bullets: [
        "Biometric Watchlists: Instantly verifies driver faces against custom hotlists.",
        "Identity Correlation: Automatically links driver biometric matches with vehicle plate records.",
        "Liveness Defense: Blocks printed photos, 3D masks, and video stream injection bypasses."
      ]
    },
    {
      kicker: "C. SECURITY THREAT DETECTION",
      icon: ShieldAlert,
      bullets: [
        "Active Weapon Alert: Detects brandished firearms instantly on stream.",
        "Feed Tampering Defense: Spots video signal loss, camera occlusion, or movement attempts.",
        "Evasion Tracking: Identifies subjects using face masks or helmets."
      ]
    },
    {
      kicker: "D. ACCESS & BARRICADE INTEGRATION",
      icon: Sliders,
      bullets: [
        "Gated Estate Automation: Direct barrier control triggers for DHA & Bahria checkpoints.",
        "Dynamic Guard Lists: Flag customized Whitelists (Residents) and Blacklists (Alerts) instantly.",
        "Webhook Notifications: Real-time event notifications sent directly to local responder devices."
      ]
    }
  ];

  return (
    <section data-slide-idx={4} className={slideClassName(isActive)} id="s4">
      <div className="eyebrow" style={{ opacity: 1 }}>PRODUCT CAPABILITIES</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "56px" }}>Localized Vehicle & Personnel Intelligence</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "36px" }}>
        MITS replaces multiple disconnected security devices with a single, highly unified multi-model edge AI stack.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {scopes.map(({ kicker, icon: Icon, bullets }, idx) => (
          <div
            key={kicker}
            className="card"
            style={{
              ...stagger(idx),
              opacity: 1,
              padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "transparent"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "#00d4ff", display: "flex", alignItems: "center" }}>
                <Icon size={28} />
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "16px", color: "#00d4ff", fontWeight: "bold", letterSpacing: "0.05em" }}>
                {kicker}
              </div>
            </div>

            <ul style={{ marginTop: "18px", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {bullets.map((bullet) => (
                <li key={bullet} style={{ display: "flex", gap: "10px", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>
                  <span style={{ color: "#00d4ff", fontWeight: "bold" }}>▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
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
      label: "Plate OCR Yield",
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
    <section data-slide-idx={5} className={slideClassName(isActive)} id="s5">
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
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", marginTop: "14px", lineHeight: "1.5" }}>{detail}</div>
            </div>
          ))}
        </div>

        {/* Right Side: Graph 3 Bandwidth Savings */}
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
              <span style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "#00d4ff", textTransform: "uppercase" }}>WAN Network Efficiency</span>
              <span style={{ background: "transparent", color: "#00d4ff", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "4px 10px", borderRadius: "99px", fontSize: "12px", fontFamily: "var(--mono)" }}>
                100% Offline
              </span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 600, color: "#ffffff", marginTop: "10px" }}>Network Bandwidth Usage</div>
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Monthly cellular bandwidth data consumption per 100 cameras</div>
          </div>

          <div style={{ width: "100%", height: "200px", marginTop: "15px" }}>
            <svg viewBox="0 0 450 260" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5b5b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0a8fa3" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="125" x2="400" y2="125" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Left Bar - Cloud Stream (2,400 GB) */}
              <rect
                x="110"
                y={animate ? "60" : "200"}
                width="60"
                height={animate ? "140" : "0"}
                fill="url(#gradRed)"
                rx="6"
                style={{ transition: "all 1.2s cubic-bezier(0.1, 0.8, 0.2, 1) 0.3s" }}
              />
              <text x="140" y={animate ? "50" : "190"} fill="#ff8888" fontSize="13" fontWeight="bold" fontFamily="var(--mono)" textAnchor="middle">2,400 GB</text>

              {/* Right Bar - MITS Local Edge (0 GB) */}
              <rect
                x="280"
                y={animate ? "198" : "200"}
                width="60"
                height={animate ? "2" : "0"}
                fill="url(#gradCyan)"
                rx="2"
                style={{ transition: "all 1.2s cubic-bezier(0.1, 0.8, 0.2, 1) 0.6s" }}
              />
              <text x="310" y={animate ? "180" : "190"} fill="#00d4ff" fontSize="13" fontWeight="bold" fontFamily="var(--mono)" textAnchor="middle">0 GB</text>

              {/* Labels */}
              <text x="140" y="225" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="var(--sans)" textAnchor="middle">Cloud SaaS ALPR</text>
              <text x="310" y="225" fill="#00d4ff" fontSize="12" fontFamily="var(--sans)" textAnchor="middle" fontWeight="bold">MITS Local Edge</text>
            </svg>
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
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const thirdVideoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const firstVideo = firstVideoRef.current;
    const secondVideo = secondVideoRef.current;
    const thirdVideo = thirdVideoRef.current;

    if (!firstVideo || !secondVideo || !thirdVideo) return;

    const resetVideos = () => {
      firstVideo.pause();
      secondVideo.pause();
      thirdVideo.pause();
      firstVideo.currentTime = 0;
      secondVideo.currentTime = 0;
      thirdVideo.currentTime = 0;
    };

    resetVideos();
    setActiveVideo(0);

    return resetVideos;
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const activeRef = [firstVideoRef, secondVideoRef, thirdVideoRef][
      activeVideo
    ];
    const activeElement = activeRef.current;

    if (!activeElement) return;

    activeElement.currentTime = 0;
    const playPromise = activeElement.play();
    playPromise?.catch(() => {});
  }, [activeVideo, isActive]);

  return (
    <section
      data-slide-idx="8-video"
      className={slideClassName(isActive)}
      id="s8-video"
    >
      <div className="swarm-video-shell" data-stagger-item style={stagger(0)}>
        <div className="swarm-video-frame">
          <video
            ref={firstVideoRef}
            className={`swarm-video${activeVideo === 0 ? " swarm-video-active" : ""}`}
            src="/assets/video-2.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 1.5;
              event.currentTarget.playbackRate = 1.5;
            }}
            onEnded={() => setActiveVideo(1)}
          />
          <video
            ref={secondVideoRef}
            className={`swarm-video${activeVideo === 1 ? " swarm-video-active" : ""}`}
            src="/assets/video-3.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 1.6;
              event.currentTarget.playbackRate = 1.6;
            }}
            onEnded={() => setActiveVideo(2)}
          />
          <video
            ref={thirdVideoRef}
            className={`swarm-video${activeVideo === 2 ? " swarm-video-active" : ""}`}
            src="/assets/video-1.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 2;
              event.currentTarget.playbackRate = 2;
            }}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              event.currentTarget.playbackRate = 2;
              onAdvance?.();
            }}
          />
          <div className="swarm-video-shade" />
          <div className="swarm-video-copy-wrap" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="eyebrow swarm-video-kicker" style={{ color: "#00d4ff" }}>
              DEMO: MULTI-CAMERA STREAM MANAGEMENT
            </div>
            <div className="swarm-video-text-stack">
              <h2
                className="swarm-video-line swarm-video-title-line"
                style={{ ...stagger(0), color: "#ffffff", fontSize: "70px" }}
              >
                MITS Multi-Camera Operations
              </h2>
              <div
                className="swarm-video-line swarm-video-body-line"
                style={stagger(1)}
              >
                Persistent vehicle tracking and trajectory mapping across distributed networks.
              </div>
              <div
                className="swarm-video-line swarm-video-body-line"
                style={{ ...stagger(2), color: "#00d4ff", fontWeight: "bold" }}
              >
                100% Native Edge. Under 100ms Event Recognition.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 8: HOW MITS EXPLAINER VIDEO
// ────────────────────────────────────────────────────────────────────────────────
export function Slide10HowNftWorks({
  isActive,
  onAdvance,
}: SlideComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    setShowOverlay(true);

    if (!isActive) return;

    const timer = window.setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    if (!isActive) return;

    const playPromise = video.play();
    playPromise?.catch(() => {});

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [isActive]);

  return (
    <section
      data-slide-idx="9-nft-video"
      className={slideClassName(isActive)}
      id="s9-nft-video"
    >
      <div className="swarm-video-shell" data-stagger-item style={stagger(0)}>
        <div className="swarm-video-frame">
          <video
            ref={videoRef}
            className={`swarm-video${isActive ? " swarm-video-active" : ""}`}
            src="/assets/how%20nft%20works.mp4"
            muted
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 1.5;
              event.currentTarget.playbackRate = 1.5;
            }}
            playsInline
            preload="auto"
            onEnded={() => onAdvance?.()}
          />
          <div
            className={`swarm-video-shade${showOverlay ? "" : " swarm-video-overlay-hidden"}`}
          />
          <div
            className={`swarm-video-copy-wrap${showOverlay ? "" : " swarm-video-overlay-hidden"}`}
          >
            <div className="eyebrow swarm-video-kicker" style={{ color: "#00d4ff" }}>
              MITS SYSTEM EXPLAINER
            </div>
            <div className="swarm-video-text-stack">
              <h2
                className="swarm-video-line swarm-video-title-line"
                style={{ ...stagger(0), color: "#ffffff", fontSize: "70px" }}
              >
                Advanced Personnel Intelligence (AVPI)
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 9: THREAT DETECTION VIDEO WORKFLOW
// ────────────────────────────────────────────────────────────────────────────────
export function Slide11HowTradingWorks({
  isActive,
  onAdvance,
}: SlideComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    setShowOverlay(true);

    if (!isActive) return;

    const timer = window.setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    if (!isActive) return;

    const playPromise = video.play();
    playPromise?.catch(() => {});

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [isActive]);

  return (
    <section
      data-slide-idx="10-trading-video"
      className={slideClassName(isActive)}
      id="s10-trading-video"
    >
      <div className="swarm-video-shell" data-stagger-item style={stagger(0)}>
        <div className="swarm-video-frame">
          <video
            ref={videoRef}
            className={`swarm-video${isActive ? " swarm-video-active" : ""}`}
            src="/assets/how%20trading%20works.mp4"
            muted
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 1.5;
              event.currentTarget.playbackRate = 1.5;
            }}
            playsInline
            preload="auto"
            onEnded={() => onAdvance?.()}
          />
          <div
            className={`swarm-video-shade${showOverlay ? "" : " swarm-video-overlay-hidden"}`}
          />
          <div
            className={`swarm-video-copy-wrap${showOverlay ? "" : " swarm-video-overlay-hidden"}`}
          >
            <div className="eyebrow swarm-video-kicker" style={{ color: "#00d4ff" }}>
              REAL-TIME DETECTION DEMO
            </div>
            <div className="swarm-video-text-stack">
              <h2
                className="swarm-video-line swarm-video-title-line"
                style={{ ...stagger(0), color: "#ffffff", fontSize: "70px" }}
              >
                Threat Detection & SSE Alert Feed
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 10: PAKISTAN MARKET & DYNAMICS (GRAPH 4: PREMIUM LINE SCALING)
// ────────────────────────────────────────────────────────────────────────────────
export function Slide14WhyNow({ isActive }: SlideComponentProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(isActive);
  }, [isActive]);

  const marketDrivers = [
    {
      title: "1. Swapping Legacy Leases",
      desc: "Residential gated communities are actively phasing out expensive cellular monthly ALPR hardware leases."
    },
    {
      title: "2. Mandating Local Storage",
      desc: "Provincial public safety departments restrict cloud transmission, legally requiring 100% offline air-gapped data."
    },
    {
      title: "3. Power-Efficient Modernization",
      desc: "MITS's local compiler enables running complex multi-model analytics on lightweight, low-power ARM servers."
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
    <section data-slide-idx={9} className={slideClassName(isActive)} id="s7">
      <div className="eyebrow" style={{ opacity: 1 }}>WHY NOW</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>The Shift Towards Offline Edge Intelligence</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "40px" }}>
        MITS sits at the convergence of high-capacity edge hardware availability and tight data sovereignty demands.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
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
              <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginTop: "8px", lineHeight: "1.5" }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Right: SVG Graph 4 Stream Scaling */}
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            border: "1px solid rgba(0, 212, 255,0.15)",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "#00d4ff", textTransform: "uppercase" }}>Optimization Yield</span>
              <span style={{ background: "transparent", color: "#00d4ff", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "4px 10px", borderRadius: "99px", fontSize: "12px", fontFamily: "var(--mono)" }}>
                8x Scaling
              </span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 600, color: "#ffffff", marginTop: "10px" }}>Streams per CPU Core</div>
            <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Concurrent HD stream capacity processed per standard CPU core</div>
          </div>

          <div style={{ width: "100%", height: "240px", marginTop: "10px", position: "relative" }}>
            <svg viewBox="0 0 450 260" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#060b12" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="streamLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffd166" />
                  <stop offset="40%" stopColor="#ffd166" />
                  <stop offset="70%" stopColor="#ffd166" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="60" x2="390" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="100" x2="390" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="160" x2="390" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="200" x2="390" y2="200" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="230" x2="390" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Area path */}
              <path
                d={areaPath}
                fill="url(#areaCyan)"
                style={{
                  opacity: animate ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out 0.8s"
                }}
              />

              {/* Line path */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#streamLineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: animate ? 0 : 600,
                  transition: "stroke-dashoffset 1.8s ease-in-out 0.3s"
                }}
              />

              {/* Growth Callout Label */}
              {animate && (
                <text x="230" y="128" fill="#00d4ff" fontSize="10" fontWeight="bold" fontFamily="var(--sans)" letterSpacing="0.05em" textAnchor="middle" style={{ animation: "fadeIn 0.5s ease-out 1.0s forwards", opacity: 0 }}>
                  +8x SCALING CAPACITY
                </text>
              )}

              {/* Data Nodes */}
              {chartPoints.map((p, idx) => (
                <g key={p.label} style={{ opacity: animate ? 1 : 0, transition: `opacity 0.5s ease-out ${0.4 + idx * 0.3}s` }}>
                  <circle cx={p.x} cy={p.y} r={idx === 3 ? "14" : "10"} fill={idx === 3 ? "#00d4ff" : "#ffd166"} opacity={idx === 3 ? "0.35" : "0.2"} />
                  <circle cx={p.x} cy={p.y} r={idx === 3 ? "6" : "5"} fill="#ffffff" stroke={idx === 3 ? "#00d4ff" : "#ffd166"} strokeWidth={idx === 3 ? "3" : "2.5"} />
                  <text x={p.x} y="250" fill={idx === 3 ? "#00d4ff" : "rgba(255,255,255,0.5)"} fontSize="11" fontFamily="var(--mono)" fontWeight={idx === 3 ? "bold" : "normal"} textAnchor="middle">{p.label}</text>
                  <text x={p.x} y={p.y - (idx === 3 ? 22 : 15)} fill={idx === 3 ? "#00d4ff" : "#ffffff"} fontSize={idx === 3 ? "14" : "12"} fontWeight="bold" fontFamily="var(--sans)" fontStyle="italic" textAnchor="middle">{idx === 3 ? "32 FEEDS" : `${p.value} Feeds`}</text>
                </g>
              ))}
            </svg>
          </div>
          <div style={{ textAlign: "center", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--sans)", fontStyle: "italic", marginTop: "16px", letterSpacing: "0.02em" }}>
            Maximize channel scalability by 8x through compiler optimization — The technical core of MITS real-time processing.
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SLIDE 11: THE COMPETITIVE MATRIX
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
    <section data-slide-idx={10} className={slideClassName(isActive)} id="s6">
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
                    fontSize: "14px",
                    background: "rgba(0, 212, 255,0.02)",
                    borderRight: "1px solid rgba(255,255,255,0.06)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Check size={16} strokeWidth={3} style={{ color: "#00d4ff" }} />
                    <span>{mits}</span>
                  </div>
                </td>
                <td style={{ padding: "18px 20px", fontSize: "14px", color: "rgba(255,255,255,0.6)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <X size={16} strokeWidth={3} style={{ color: "#ef4444" }} />
                    <span>{flock}</span>
                  </div>
                </td>
                <td style={{ padding: "18px 20px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
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
      val: "5",
      label: "Pilot Checkpoints DHA",
      desc: "Successfully deployed and tested in DHA residential sectors, achieving rapid automated gate barrier openings."
    },
    {
      val: "99.4%",
      label: "Custom Plate Yield",
      desc: "Our localized models resolve non-standard, custom-designed, or weathered provincial vehicle license plates."
    }
  ];

  // Curve points representing OCR Yield Improvement over different environments
  const curvePath = "M 60 180 C 160 165, 240 160, 300 135 C 380 110, 440 70, 540 60 C 570 60, 590 60, 610 60";
  const areaPath = `${curvePath} L 610 215 L 60 215 Z`;

  return (
    <section data-slide-idx={11} className={slideClassName(isActive)} id="s10">
      <div className="eyebrow" style={{ opacity: 1 }}>TRACTION & PILOT VALIDATION</div>
      <h2 className="title" style={{ opacity: 1, fontSize: "60px" }}>Proven Local Performance & Yield</h2>
      <div className="sub" style={{ opacity: 1, marginBottom: "40px" }}>
        MITS delivers highly accurate public safety biometrics and ALPR tracking adapted specifically for Pakistan's environment.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "20px" }}>
        {/* Left Side: Local Traction Numbers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {trusts.map(({ val, label, desc }, idx) => (
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
                </div>
              </div>
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", marginTop: "14px", lineHeight: "1.5" }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Right Side: Graph 5 OCR Recognition Rate (Premium Curve Style) */}
        <div
          style={{
            background: "transparent",
            borderRadius: "24px",
            border: "1px solid rgba(0, 212, 255, 0.15)",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "#00d4ff", textTransform: "uppercase" }}>OCR Yield Benchmarking</span>
              <span style={{ background: "transparent", color: "#00d4ff", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "4px 10px", borderRadius: "99px", fontSize: "12px", fontFamily: "var(--mono)" }}>
                Excise Compliant
              </span>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 600, color: "#ffffff", marginTop: "6px" }}>Pakistani Plate Reading Rate</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Average recognition yield progression under localized engine training</div>
          </div>

          <div style={{ width: "100%", height: "230px", marginTop: "10px" }}>
            <svg viewBox="0 0 650 260" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <linearGradient id="curveGradientYield" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff5b5b" />
                  <stop offset="35%" stopColor="#ff5b5b" />
                  <stop offset="70%" stopColor="#ffd166" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>

                <linearGradient id="areaGradientYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#ffd166" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#060b12" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="50" x2="610" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="105" x2="610" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="160" x2="610" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="5,5" />
              <line x1="60" y1="215" x2="610" y2="215" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="25" y="55" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">100%</text>
              <text x="25" y="110" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">80%</text>
              <text x="25" y="165" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">60%</text>
              <text x="25" y="220" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--mono)">40%</text>

              {/* Area under curve */}
              <path
                d={areaPath}
                fill="url(#areaGradientYield)"
                style={{
                  opacity: animate ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out 0.8s"
                }}
              />

              {/* Curve Stroke Line */}
              <path
                d={curvePath}
                fill="none"
                stroke="url(#curveGradientYield)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 800,
                  strokeDashoffset: animate ? 0 : 800,
                  transition: "stroke-dashoffset 1.8s ease-in-out 0.3s"
                }}
              />

              {/* Nodes and Callout Labels */}
              {animate && (
                <>
                  {/* Bottom / Baseline Western ALPR */}
                  <g style={{ animation: "fadeIn 0.5s ease-out 0.9s forwards", opacity: 0 }}>
                    <circle cx="60" cy="180" r="12" fill="#ff5b5b" opacity="0.2" />
                    <circle cx="60" cy="180" r="5" fill="#ffffff" stroke="#ff5b5b" strokeWidth="2.5" />
                    <text x="60" y="202" fill="#ff5b5b" fontSize="12" fontWeight="bold" fontFamily="var(--sans)" textAnchor="middle">Baseline 58%</text>
                  </g>

                  {/* Mid Slope text callout */}
                  <text x="310" y="125" fill="#ffd166" fontSize="11" fontWeight="bold" fontFamily="var(--sans)" letterSpacing="0.08em" textAnchor="middle">
                    +41.4% YIELD LEAP IN 6 MONTHS
                  </text>

                  {/* Peak Point DHA Pilot */}
                  <g style={{ animation: "fadeIn 0.5s ease-out 1.4s forwards", opacity: 0 }}>
                    <circle cx="540" cy="60" r="14" fill="#00d4ff" opacity="0.3" />
                    <circle cx="540" cy="60" r="6" fill="#ffffff" stroke="#00d4ff" strokeWidth="3" />
                    <text x="540" y="38" fill="#00d4ff" fontSize="13" fontWeight="bold" fontFamily="var(--sans)" fontStyle="italic" textAnchor="middle">MITS Pakistan 99.4%</text>
                  </g>
                </>
              )}

              {/* X Axis Labels */}
              <text x="60" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Sep '25</text>
              <text x="138" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Oct '25</text>
              <text x="217" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Nov '25</text>
              <text x="295" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Dec '25</text>
              <text x="374" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Jan '26</text>
              <text x="452" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Feb '26</text>
              <text x="531" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Mar '26</text>
              <text x="610" y="235" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--sans)" textAnchor="middle">Apr '26</text>
            </svg>
          </div>
          <div style={{ textAlign: "center", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--sans)", fontStyle: "italic", marginTop: "16px", letterSpacing: "0.02em" }}>
            99.4% success rate in resolving unreadable plates — Deployed with Pakistan-specific weight tuning and adaptive OCR.
          </div>
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
    <section data-slide-idx={12} className={slideClassName(isActive)} id="s11">
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
  Slide10HowNftWorks,
  Slide11HowTradingWorks,
  Slide14WhyNow,
  Slide12CompetitiveMatrix,
  Slide17TractionTrust,
  Slide18ThankYou
] as const;
