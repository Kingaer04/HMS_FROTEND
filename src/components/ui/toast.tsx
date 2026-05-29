"use client";
import * as React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type?: ToastType;
  title: string;
  message?: string;
  onClose?: () => void;
}

const config: Record<ToastType, { icon: React.ElementType; bg: string; icon_color: string; border: string }> = {
  success: { icon: CheckCircle2, bg: "bg-green-50",   icon_color: "text-green-600",  border: "border-green-200" },
  error:   { icon: XCircle,      bg: "bg-red-50",     icon_color: "text-red-600",    border: "border-red-200"   },
  warning: { icon: AlertTriangle,bg: "bg-accent-50",  icon_color: "text-accent-600", border: "border-accent-200" },
  info:    { icon: Info,         bg: "bg-teal-50",    icon_color: "text-teal-600",   border: "border-teal-200"  },
};

export function Toast({ type = "info", title, message, onClose }: ToastProps) {
  const { icon: Icon, bg, icon_color, border } = config[type];
  return (
    <div className={cn("flex items-start gap-3 p-4 rounded-xl border shadow-lg w-full max-w-sm animate-fade-in", bg, border)}>
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", icon_color)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {message && <p className="text-xs text-text-secondary mt-0.5">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-text-muted hover:text-text-primary flex-shrink-0">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* Simple Toast context — used throughout the app */
interface ToastItem extends ToastProps { id: string; }

interface ToastContextValue {
  toast: (props: Omit<ToastProps, "onClose">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
