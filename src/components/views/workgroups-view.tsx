"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  MoreHorizontal,
  Mail,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Project, getUserById } from "@/data/mock";

interface WorkgroupsViewProps {
  project: Project;
}

export function WorkgroupsView({ project }: WorkgroupsViewProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(project.workgroups.map((wg) => wg.id))
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Workgroups
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage stakeholder groups and meeting participants for this project
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          New Workgroup
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {project.workgroups.map((workgroup) => {
          const isExpanded = expandedGroups.has(workgroup.id);

          return (
            <div
              key={workgroup.id}
              className="rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  onClick={() => toggleGroup(workgroup.id)}
                  className="shrink-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{workgroup.name}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {workgroup.members.length} members
                    </Badge>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                  <UserPlus className="h-3 w-3" />
                  Add Member
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </div>

              {isExpanded && (
                <>
                  <Separator />
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-0 items-center">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-2 px-2">
                        Member
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-2 px-2 w-48">
                        Role
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-2 px-2 w-20">
                        Actions
                      </div>

                      {workgroup.members.map((member) => {
                        const user = getUserById(member.userId);
                        if (!user) return null;

                        return (
                          <React.Fragment key={member.userId}>
                            <div className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-muted/50">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className={cn("text-[10px] text-white", user.color)}>
                                  {user.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {user.role} &middot; {user.org}
                                </span>
                              </div>
                            </div>

                            <div className="py-2 px-2">
                              <Badge variant="outline" className="text-xs gap-1">
                                <Shield className="h-2.5 w-2.5" />
                                {member.role}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-1 py-2 px-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
