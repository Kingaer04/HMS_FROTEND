"use client";
import React, { useEffect, useRef, useState } from "react";

interface AuthShellProps {
  children: React.ReactNode;
  role: "hospital" | "doctor" | "receptionist" | "patient" | "lab-technician";
  mode: "login" | "register";
}

const ROLE_META = {
  hospital: {
    label: "Hospital Admin",
    accent: "#22D3C8",
    accentDim: "#22D3C820",
    tagline: "Full control of your hospital, in one place.",
    roleLink: null,
  },
  doctor: {
    label: "Doctor Portal",
    accent: "#22D3C8",
    accentDim: "#22D3C820",
    tagline: "Your patients, schedule, and records — ready.",
    roleLink: null,
  },
  receptionist: {
    label: "Front Desk",
    accent: "#FB923C",
    accentDim: "#FB923C20",
    tagline: "Keep check-ins fast and the queue moving.",
    roleLink: null,
  },
  patient: {
    label: "Patient Portal",
    accent: "#A78BFA",
    accentDim: "#A78BFA20",
    tagline: "Your health records, appointments, and results.",
    roleLink: null,
  },
  "lab-technician": {
    label: "Lab Portal",
    accent: "#38BDF8",
    accentDim: "#38BDF820",
    tagline: "Process requests and upload results with speed.",
    roleLink: null,
  },
};

/* ── Animated ECG canvas ── */
function ECGCanvas({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const offset = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    // one ECG cycle shape (normalised 0-1 x, amplitude y)
    const cycle = [
      [0, 0], [0.08, 0], [0.12, -0.05], [0.15, 0.55],
      [0.18, -0.7], [0.21, 0.2], [0.25, 0],
      [0.35, 0], [0.38, 0.15], [0.41, -0.15], [0.44, 0],
      [1.0, 0],
    ] as [number, number][];

    function getY(x: number): number {
      // interpolate through cycle
      const cx = ((x % 1) + 1) % 1;
      for (let i = 0; i < cycle.length - 1; i++) {
        const [x0, y0] = cycle[i];
        const [x1, y1] = cycle[i + 1];
        if (cx >= x0 && cx <= x1) {
          const t = (cx - x0) / (x1 - x0);
          return y0 + t * (y1 - y0);
        }
      }
      return 0;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      offset.current += 0.004;

      // trailing glow
      for (let glow = 3; glow >= 0; glow--) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = glow === 0 ? 0.9 : 0.06 / (glow * 0.8);
        ctx.lineWidth = glow === 0 ? 1.8 : 4 - glow;
        const mid = H / 2;
        const amp = H * 0.38;
        for (let px = 0; px <= W; px += 2) {
          const xNorm = px / W + offset.current;
          const y = mid - getY(xNorm) * amp;
          px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.stroke();
      }

      // bright dot at leading edge
      const leadX = W - 1;
      const leadXNorm = leadX / W + offset.current;
      const leadY = H / 2 - getY(leadXNorm) * H * 0.38;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      // soft halo
      ctx.beginPath();
      ctx.arc(leadX, leadY, 7, 0, Math.PI * 2);
      ctx.fillStyle = color + "33";
      ctx.fill();

      frame.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame.current);
  }, [color]);

  return (
    <canvas
      ref={ref}
      width={340}
      height={56}
      style={{ width: "100%", height: 56 }}
    />
  );
}

/* ── Live vitals ticker ── */
function VitalTicker({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    const id = setInterval(() => {
      const base = parseFloat(value);
      const jitter = (Math.random() - 0.5) * 0.6;
      setDisplayed((base + jitter).toFixed(label === "SpO₂" ? 0 : 1));
    }, 2200 + Math.random() * 800);
    return () => clearInterval(id);
  }, [value, label]);

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      padding: "10px 12px",
    }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "var(--font-mono)", lineHeight: 1 }}>{displayed}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{unit}</span>
      </div>
    </div>
  );
}

/* ── Patient mini-card ── */
function PatientCard({ name, status, time, color }: { name: string; status: string; time: string; color: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const statusColors: Record<string, string> = {
    "In consultation": "#22D3C8",
    "Waiting":         "#FB923C",
    "Checked in":      "#A78BFA",
    "Lab pending":     "#38BDF8",
    "Checked out":     "rgba(255,255,255,0.3)",
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 12px",
      background: "rgba(255,255,255,0.04)",
      border: "0.5px solid rgba(255,255,255,0.07)",
      borderRadius: 10,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: color + "28",
        border: `1.5px solid ${color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color, flexShrink: 0,
      }}>{initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ fontSize: 10, color: statusColors[status] || "rgba(255,255,255,0.4)", marginTop: 1 }}>{status}</div>
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>{time}</div>
    </div>
  );
}

/* ── Stat pill ── */
function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "var(--font-mono)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}

export default function AuthShell({ children, role, mode }: AuthShellProps) {
  const meta = ROLE_META[role];
  const acc = meta.accent;

  const patients = [
    { name: "Amaka Johnson",    status: "In consultation", time: "9:14 AM",  color: acc },
    { name: "Chukwu Emmanuel",  status: "Waiting",         time: "9:02 AM",  color: "#FB923C" },
    { name: "Fatima Hassan",    status: "Checked in",      time: "8:55 AM",  color: "#A78BFA" },
    { name: "Biodun Adeyemi",   status: "Lab pending",     time: "8:41 AM",  color: "#38BDF8" },
    { name: "Ngozi Eze",        status: "Checked out",     time: "8:20 AM",  color: "rgba(255,255,255,0.3)" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "var(--font-sans)", background: "#fff" }}>

      {/* ══════════════════════════════
          LEFT PANEL — Live dashboard
         ══════════════════════════════ */}
      <div
        className="hidden lg:flex"
        style={{
          width: 480,
          flexShrink: 0,
          background: "linear-gradient(160deg, #060D1A 0%, #0A1628 60%, #0C1E3A 100%)",
          flexDirection: "column",
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 44px),
                            repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 44px)`,
          pointerEvents: "none",
        }} />

        {/* Accent glow behind content */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 360, height: 360, borderRadius: "50%",
          background: acc, opacity: 0.07, filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -60,
          width: 280, height: 280, borderRadius: "50%",
          background: "#38BDF8", opacity: 0.04, filter: "blur(60px)",
          pointerEvents: "none",
        }} />

        {/* ── Logo bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: `linear-gradient(135deg, ${acc}, ${acc}99)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 14, color: "#fff",
              boxShadow: `0 4px 12px ${acc}44`,
            }}>H</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>HMS Nigeria</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: -1 }}>Healthcare Management System</div>
            </div>
          </div>
          {/* Live badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.06)",
            border: "0.5px solid rgba(255,255,255,0.12)",
            borderRadius: 20, padding: "4px 10px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Live</span>
          </div>
        </div>

        {/* ── Heading ── */}
        <div style={{ marginBottom: 24, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: acc, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            {meta.label}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0 }}>
            {meta.tagline}
          </h2>
        </div>

        {/* ── ECG Monitor ── */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 16,
          position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Patient vitals — Ward B</span>
            <span style={{ fontSize: 10, color: acc, fontFamily: "var(--font-mono)" }}>72 BPM</span>
          </div>
          <ECGCanvas color={acc} />
        </div>

        {/* ── Live vitals grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16, position: "relative", zIndex: 1 }}>
          <VitalTicker label="SpO₂"  value="98"    unit="%"    color={acc} />
          <VitalTicker label="Temp"  value="36.8"  unit="°C"   color="#FB923C" />
          <VitalTicker label="BP"    value="120"   unit="mmHg" color="#A78BFA" />
        </div>

        {/* ── Stats row ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0,
          padding: "14px 0", marginBottom: 16,
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          position: "relative", zIndex: 1,
        }}>
          <StatPill label="Today's visits" value="132"  color={acc} />
          <StatPill label="Active doctors" value="48"   color="#FB923C" />
          <StatPill label="Pending labs"   value="29"   color="#38BDF8" />
        </div>

        {/* ── Patient queue ── */}
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's queue</span>
            <span style={{ fontSize: 10, color: acc, fontWeight: 500 }}>5 patients</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {patients.map((p) => (
              <PatientCard key={p.name} {...p} />
            ))}
          </div>
        </div>

        {/* ── NHIS footer ── */}
        <div style={{
          marginTop: 20,
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 10, padding: "10px 14px",
          position: "relative", zIndex: 1,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, flexShrink: 0,
          }}>🛡️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>NHIS Integrated System</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>National Health Insurance Scheme · Nigeria</div>
          </div>
          <div style={{
            fontSize: 10, fontWeight: 600, color: acc,
            background: acc + "18", border: `0.5px solid ${acc}44`,
            borderRadius: 20, padding: "2px 8px",
          }}>Verified</div>
        </div>
      </div>

      {/* ══════════════════════════════
          RIGHT PANEL — Auth form
         ══════════════════════════════ */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: "#fff", overflowY: "auto",
      }}>
        {/* Top nav */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 40px 0",
        }}>
          {/* Mobile logo only */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="lg:hidden">
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: acc, display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#fff",
            }}>H</div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0A1628" }}>HMS</span>
          </div>
          <div className="hidden lg:block" />

          <div style={{ fontSize: 13, color: "#8896A8" }}>
            {mode === "login" ? (
              <>Don&apos;t have an account?{" "}
                <a href={`/register/${role}`} style={{ color: acc, fontWeight: 600, textDecoration: "none" }}>Sign up</a>
              </>
            ) : (
              <>Already have an account?{" "}
                <a href={`/login/${role}`} style={{ color: acc, fontWeight: 600, textDecoration: "none" }}>Sign in</a>
              </>
            )}
          </div>
        </div>

        {/* Form centred */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "32px 40px",
        }}>
          <div style={{ width: "100%", maxWidth: 400 }}>
            {children}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 40px 24px", borderTop: "1px solid #F7F8FC",
        }}>
          <span style={{ fontSize: 12, color: "#C8D0E0" }}>© 2026 HMS Nigeria</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy", "Terms", "Support"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "#C8D0E0", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}