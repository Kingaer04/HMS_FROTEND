"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/auth.types";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface SidebarProps {
  navItems: NavItem[];
  role: Role;
}

const ROLE_LABELS: Record<Role, string> = {
  HospitalAdmin:  "Hospital Admin",
  Doctor:         "Doctor",
  Receptionist:   "Receptionist",
  Patient:        "Patient",
  LabTechnician:  "Lab Technician",
};

const ROLE_BADGE: Record<Role, "role-admin"|"role-doctor"|"role-receptionist"|"role-patient"|"role-lab"> = {
  HospitalAdmin:  "role-admin",
  Doctor:         "role-doctor",
  Receptionist:   "role-receptionist",
  Patient:        "role-patient",
  LabTechnician:  "role-lab",
};

export function Sidebar({ navItems, role }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-primary-950 text-white transition-all duration-300 ease-smooth flex-shrink-0",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 h-16 border-b border-white/10", collapsed && "justify-center px-0")}>
        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-sm tracking-wide">HMS</span>
            <p className="text-xs text-white/50 -mt-0.5">Healthcare</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-teal-500/20 text-teal-300"
                  : "text-white/60 hover:text-white hover:bg-white/8",
                collapsed && "justify-center px-0 w-10 mx-auto"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-teal-400" : "text-white/50 group-hover:text-white/80")} />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && badge !== undefined && (
                <span className="ml-auto bg-teal-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <Avatar name={user?.fullName || user?.email} role={role.toLowerCase() as any} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName || user?.email}</p>
              <Badge variant={ROLE_BADGE[role]} className="mt-0.5 text-[10px] py-0 px-1.5">
                {ROLE_LABELS[role]}
              </Badge>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && "Sign out"}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-20 -right-3 w-6 h-6 bg-primary-800 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors shadow-md"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
