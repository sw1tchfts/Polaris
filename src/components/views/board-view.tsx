"use client";

import React from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreHorizontal,
  Plus,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type Task,
  type Status,
  type Priority,
  statusConfig,
  priorityConfig,
} from "@/data/mock";

const statusIcons: Record<Status, React.ElementType> = {
  todo: Circle,
  "in-progress": Clock,
  "in-review": AlertCircle,
  done: CheckCircle2,
};

const priorityIcons: Record<Priority, React.ElementType> = {
  urgent: AlertCircle,
  high: ArrowUp,
  medium: Minus,
  low: ArrowDown,
  none: Minus,
};

interface BoardViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function BoardView({ tasks, onTaskClick }: BoardViewProps) {
  const columns: Status[] = ["todo", "in-progress", "in-review", "done"];

  return (
    <ScrollArea className="h-full">
      <div className="flex gap-4 p-6 min-h-full">
        {columns.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status);
          const config = statusConfig[status];

          return (
            <div
              key={status}
              className="flex w-[300px] shrink-0 flex-col rounded-xl bg-muted/50"
            >
              <div className="flex items-center gap-2 px-3 py-3">
                <div className={cn("h-2 w-2 rounded-full", config.color)} />
                <span className="text-sm font-medium">{config.label}</span>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {columnTasks.length}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                ))}

                <Button
                  variant="ghost"
                  className="mt-1 w-full justify-start gap-2 text-muted-foreground h-8"
                  size="sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add task
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const PriorityIcon = priorityIcons[task.priority];
  const priorityColor = priorityConfig[task.priority].color;
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <button
      className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3 text-left shadow-sm transition-shadow hover:shadow-md w-full"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-snug">{task.title}</span>
        <PriorityIcon className={cn("h-3.5 w-3.5 shrink-0 mt-0.5", priorityColor)} />
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {totalSubtasks > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3 w-3" />
              {completedSubtasks}/{totalSubtasks}
            </span>
          )}
          {task.dueDate && (
            <span
              className={cn(
                "text-xs",
                isOverdue(task.dueDate) ? "text-red-500 font-medium" : "text-muted-foreground"
              )}
            >
              {formatShortDate(task.dueDate)}
            </span>
          )}
        </div>

        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarFallback className={cn("text-[9px] text-white", task.assignee.color)}>
              {task.assignee.initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </button>
  );
}

function formatShortDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date();
}
