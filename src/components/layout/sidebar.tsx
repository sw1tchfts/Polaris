"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Building2,
  HeartPulse,
  Receipt,
  Users,
  FolderKanban,
  Building,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { companies, projects } from "@/data/mock";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  HeartPulse,
  Receipt,
};

interface SidebarProps {
  activeView: string;
  activeProject: string | null;
  activeCommunity: string | null;
  onNavigate: (view: string, projectId?: string, communityId?: string) => void;
}

export function Sidebar({ activeView, activeProject, activeCommunity, onNavigate }: SidebarProps) {
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(companies.map((c) => c.id))
  );
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(projects.map((p) => p.id))
  );

  const toggle = (set: Set<string>, id: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full w-[280px] flex-col border-r border-sidebar-border bg-sidebar-background">
      <div className="flex flex-col items-start gap-2 px-4 py-3">
        <Image
          src="/polaris-logo.png"
          alt="Polaris"
          width={240}
          height={240}
          className="h-auto w-full rounded-md"
          priority
        />
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FolderKanban className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Polaris</span>
            <span className="text-xs text-muted-foreground">Implementation Hub</span>
          </div>
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

        {companies.map((company) => {
          const companyProjects = projects.filter((p) => p.companyId === company.id);
          const isCompanyExpanded = expandedCompanies.has(company.id);

          return (
            <div key={company.id} className="px-2 py-2">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => toggle(expandedCompanies, company.id, setExpandedCompanies)}
                >
                  {isCompanyExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
                <div className="flex flex-1 items-center gap-2 px-1">
                  <Building className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {company.name}
                  </span>
                </div>
              </div>

              {isCompanyExpanded && (
                <div className="mt-1 ml-2 flex flex-col gap-0.5">
                  {companyProjects.map((project) => {
                    const Icon = iconMap[project.icon] || Building2;
                    const isProjectExpanded = expandedProjects.has(project.id);
                    const projectCommunities = company.communities;

                    return (
                      <div key={project.id}>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => toggle(expandedProjects, project.id, setExpandedProjects)}
                          >
                            {isProjectExpanded ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </Button>
                          <button
                            className={cn(
                              "flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent",
                              activeProject === project.id && !activeCommunity && "bg-sidebar-accent font-medium"
                            )}
                            onClick={() => onNavigate("project", project.id)}
                          >
                            <div className={cn("h-2 w-2 rounded-full", project.color)} />
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="truncate text-sm">{project.name.replace(`${company.name} — `, "").replace(`${company.name.split(" ")[0]} — `, "")}</span>
                          </button>
                        </div>

                        {isProjectExpanded && (
                          <div className="ml-6 flex flex-col gap-0.5 mt-0.5">
                            <button
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-sidebar-accent",
                                activeProject === project.id && activeCommunity === null && activeView === "project-company"
                                  ? "bg-sidebar-accent font-medium text-foreground"
                                  : "text-muted-foreground"
                              )}
                              onClick={() => onNavigate("project-company", project.id)}
                            >
                              <Building className="h-3 w-3" />
                              <span>Company-wide</span>
                            </button>
                            {projectCommunities.map((community) => (
                              <button
                                key={community.id}
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-sidebar-accent",
                                  activeCommunity === community.id
                                    ? "bg-sidebar-accent font-medium text-foreground"
                                    : "text-muted-foreground"
                                )}
                                onClick={() => onNavigate("project-community", project.id, community.id)}
                              >
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{community.name.replace(company.name.split(" ")[0] + " ", "").replace(company.name.split(" ")[0] + " of ", "")}</span>
                              </button>
                            ))}
                            <Separator className="my-1" />
                            <button
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-sidebar-accent",
                                activeProject === project.id && activeView === "workgroups"
                                  ? "bg-sidebar-accent font-medium text-foreground"
                                  : "text-muted-foreground"
                              )}
                              onClick={() => onNavigate("workgroups", project.id)}
                            >
                              <Users className="h-3 w-3" />
                              <span>Workgroups</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </ScrollArea>

      <Separator />
      <div className="flex items-center gap-2 px-4 py-3">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-blue-500 text-[10px] text-white">RT</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col truncate">
          <span className="truncate text-sm">Rachel Torres</span>
          <span className="truncate text-[10px] text-muted-foreground">Implementation Manager</span>
        </div>
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
