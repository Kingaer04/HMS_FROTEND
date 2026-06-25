interface FormHeadingProps {
  title: string;
  subtitle: string;
  accentColor?: string;
}

export function FormHeading({ title, subtitle, accentColor = "#22D3C8" }: FormHeadingProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: accentColor + "18", border: `1px solid ${accentColor}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: accentColor }} />
        </div>
        <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${accentColor}44, transparent)` }} />
      </div>
      <h1 style={{
        fontSize: 28, fontWeight: 800, color: "#060D1A",
        letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 10px",
      }}>{title}</h1>
      <p style={{ fontSize: 14, color: "#8896A8", lineHeight: 1.6, margin: 0 }}>{subtitle}</p>
    </div>
  );
}
