"use client";

import React from "react";
import {
  X,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Tag,
  User,
  Flag,
  Link2,
  Paperclip,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type Task,
  type Status,
  type Priority,
  statusConfig,
  priorityConfig,
  projects,
} from "@/data/mock";

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

const statusIcons: Record<Status, React.ElementType> = {
  todo: Circle,
  "in-progress": Clock,
  "in-review": AlertCircle,
  done: CheckCircle2,
};

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const StatusIcon = statusIcons[task.status];
  const project = projects.find((p) => p.id === task.project);
  const section = project?.sections.find((s) => s.id === task.section);
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;

  return (
    <div className="flex h-full w-[440px] flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {project && (
            <>
              <div className={cn("h-2 w-2 rounded-full", project.color)} />
              <span>{project.name}</span>
            </>
          )}
          {section && (
            <>
              <span>/</span>
              <span>{section.name}</span>
            </>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-4">
          <div className="flex items-start gap-3">
            <button className="mt-0.5 shrink-0">
              <StatusIcon
                className={cn(
                  "h-5 w-5",
                  statusConfig[task.status].color.replace("bg-", "text-")
                )}
              />
            </button>
            <h2 className="text-base font-semibold leading-snug">{task.title}</h2>
          </div>

          {task.description && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <DetailRow icon={User} label="Assignee">
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className={cn("text-[8px] text-white", task.assignee.color)}>
                      {task.assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee.name}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Unassigned</span>
              )}
            </DetailRow>

            <DetailRow icon={Calendar} label="Due date">
              <span className={cn(
                "text-sm",
                task.dueDate && isOverdue(task.dueDate) ? "text-red-500 font-medium" : ""
              )}>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : "No due date"}
              </span>
            </DetailRow>

            <DetailRow icon={Flag} label="Priority">
              <Badge
                variant="outline"
                className={cn("text-xs", priorityConfig[task.priority].color)}
              >
                {priorityConfig[task.priority].label}
              </Badge>
            </DetailRow>

            <DetailRow icon={StatusIcon} label="Status">
              <Badge variant="secondary" className="text-xs">
                {statusConfig[task.status].label}
              </Badge>
            </DetailRow>

            <DetailRow icon={Tag} label="Tags">
              <div className="flex flex-wrap gap-1">
                {task.tags.length > 0 ? (
                  task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No tags</span>
                )}
              </div>
            </DetailRow>
          </div>

          {task.subtasks.length > 0 && (
            <>
              <Separator className="my-5" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">
                    Subtasks ({completedSubtasks}/{task.subtasks.length})
                  </span>
                  <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{
                        width: `${(completedSubtasks / task.subtasks.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
                    >
                      {subtask.done ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          subtask.done && "line-through text-muted-foreground"
                        )}
                      >
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator className="my-5" />

          <div>
            <span className="text-sm font-medium">Activity</span>
            <div className="mt-3 flex gap-3">
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="bg-blue-500 text-[9px] text-white">AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-lg border border-input bg-muted/30 px-3 py-2">
                <p className="text-sm text-muted-foreground">Write a comment...</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t border-border px-4 py-2">
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
          <Paperclip className="h-3 w-3" />
          Attach
        </Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
          <Link2 className="h-3 w-3" />
          Link
        </Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
          <MessageSquare className="h-3 w-3" />
          Comment
        </Button>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-28 items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-sm">{label}</span>
      </div>
      {children}
    </div>
  );
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date();
}
