"use client";

import React, { useState } from "react";
import {
  Home,
  Inbox,
  CheckSquare,
  BarChart3,
  Plus,
  Search,
  Settings,
  ChevronDown,
  ChevronRight,
  Hash,
  Globe,
  Smartphone,
  Megaphone,
  Users,
  FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/mock";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Megaphone,
};

interface SidebarProps {
  activeView: string;
  activeProject: string | null;
  onNavigate: (view: string, projectId?: string) => void;
}

export function Sidebar({ activeView, activeProject, onNavigate }: SidebarProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(projects.map((p) => p.id))
  );

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-sidebar-border bg-sidebar-background">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <FolderKanban className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Polaris</span>
          <span className="text-xs text-muted-foreground">Workspace</span>
        </div>
      </div>

      <div className="px-3 py-1">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground h-8 px-2" size="sm">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search</span>
        </Button>
      </div>

      <Separator className="mx-3" />

      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          <nav className="flex flex-col gap-0.5">
            <SidebarItem
              icon={Home}
              label="Home"
              active={activeView === "home"}
              onClick={() => onNavigate("home")}
            />
            <SidebarItem
              icon={CheckSquare}
              label="My Tasks"
              active={activeView === "my-tasks"}
              onClick={() => onNavigate("my-tasks")}
              badge={5}
            />
            <SidebarItem
              icon={Inbox}
              label="Inbox"
              active={activeView === "inbox"}
              onClick={() => onNavigate("inbox")}
              badge={3}
            />
            <SidebarItem
              icon={BarChart3}
              label="Reporting"
              active={activeView === "reporting"}
              onClick={() => onNavigate("reporting")}
            />
            <SidebarItem
              icon={Users}
              label="Team"
              active={activeView === "team"}
              onClick={() => onNavigate("team")}
            />
          </nav>
        </div>

        <Separator className="mx-3" />

        <div className="px-2 py-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Projects
            </span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="mt-1 flex flex-col gap-0.5">
            {projects.map((project) => {
              const Icon = iconMap[project.icon] || Hash;
              const isExpanded = expandedProjects.has(project.id);

              return (
                <div key={project.id}>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => toggleProject(project.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </Button>
                    <button
                      className={cn(
                        "flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                        activeProject === project.id && "bg-sidebar-accent font-medium"
                      )}
                      onClick={() => onNavigate("project", project.id)}
                    >
                      <div className={cn("h-2 w-2 rounded-full", project.color)} />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{project.name}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="ml-8 flex flex-col gap-0.5">
                      {project.sections.map((section) => (
                        <button
                          key={section.id}
                          className="rounded-md px-2 py-1 text-left text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                        >
                          {section.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      <Separator />
      <div className="flex items-center gap-2 px-4 py-3">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-blue-500 text-[10px] text-white">AC</AvatarFallback>
        </Avatar>
        <span className="flex-1 truncate text-sm">Alex Chen</span>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
        active && "bg-sidebar-accent font-medium text-sidebar-primary"
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}
