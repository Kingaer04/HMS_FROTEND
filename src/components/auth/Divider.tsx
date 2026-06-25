export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px" style={{ background: "var(--gray-100)" }} />
      <span className="text-xs font-medium px-1" style={{ color: "var(--gray-300)" }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--gray-100)" }} />
    </div>
  );
}
