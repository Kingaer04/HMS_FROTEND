"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps { defaultValue: string; children: React.ReactNode; className?: string; }
interface TabsContextValue { active: string; setActive: (v: string) => void; }

const TabsContext = React.createContext<TabsContextValue>({ active: "", setActive: () => {} });

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-1 border-b border-border overflow-x-auto", className)}
      role="tablist"
      {...props}
    />
  );
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { active, setActive } = React.useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={cn(
        "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all",
        isActive
          ? "border-teal-500 text-teal-600"
          : "border-transparent text-text-muted hover:text-text-secondary hover:border-border-strong",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { active } = React.useContext(TabsContext);
  if (active !== value) return null;
  return <div className={cn("animate-fade-in pt-4", className)}>{children}</div>;
}
