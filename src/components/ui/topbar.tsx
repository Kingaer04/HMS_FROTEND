"use client";
import * as React from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Avatar } from "./avatar";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/store/notification.store";
import { cn } from "@/lib/utils";
import { Role } from "@/types/auth.types";

interface TopBarProps { title?: string; role: Role; }

export function TopBar({ title, role }: TopBarProps) {
  const { user } = useAuth();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-lg font-semibold text-text-primary">{title}</h1>}
      </div>
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-bg transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full animate-pulse-dot" />
          )}
        </Link>
        {/* Avatar */}
        <Avatar
          name={user?.fullName || user?.email}
          role={role.toLowerCase() as any}
          size="sm"
        />
      </div>
    </header>
  );
}
