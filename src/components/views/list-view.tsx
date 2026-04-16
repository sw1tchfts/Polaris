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
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type Task, type Status, type Priority, statusConfig, priorityConfig } from "@/data/mock";

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

interface ListViewProps {
  tasks: Task[];
  groupBy?: "status" | "priority" | "assignee" | "none";
  onTaskClick: (task: Task) => void;
}

export function ListView({ tasks, groupBy = "status", onTaskClick }: ListViewProps) {
  const groups = groupTasks(tasks, groupBy);

  return (
    <div className="flex flex-col">
      {groups.map(({ key, label, tasks: groupTasks, color }) => (
        <div key={key}>
          <div className="sticky top-0 flex items-center gap-2 bg-background px-6 py-2 border-b border-border">
            {color && <div className={cn("h-2 w-2 rounded-full", color)} />}
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground">({groupTasks.length})</span>
          </div>
          <div className="flex flex-col">
            {groupTasks.map((task) => (
              <TaskRow key={task.id} task={task} onClick={() => onTaskClick(task)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskRow({ task, onClick }: { task: Task; onClick: () => void }) {
  const StatusIcon = statusIcons[task.status];
  const PriorityIcon = priorityIcons[task.priority];
  const statusColor = statusConfig[task.status].color;
  const priorityColor = priorityConfig[task.priority].color;

  const completedSubtasks = task.subtasks.filter((s) => s.done).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <button
      className="flex items-center gap-3 border-b border-border px-6 py-2.5 text-left transition-colors hover:bg-muted/50 w-full"
      onClick={onClick}
    >
      <StatusIcon className={cn("h-4 w-4 shrink-0", statusColor.replace("bg-", "text-"))} />

      <span className="flex-1 truncate text-sm">{task.title}</span>

      {totalSubtasks > 0 && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3" />
          {completedSubtasks}/{totalSubtasks}
        </span>
      )}

      {task.tags.slice(0, 2).map((tag) => (
        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
          {tag}
        </Badge>
      ))}

      {task.dueDate && (
        <span className={cn(
          "text-xs whitespace-nowrap",
          isOverdue(task.dueDate) ? "text-red-500 font-medium" : "text-muted-foreground"
        )}>
          {formatDate(task.dueDate)}
        </span>
      )}

      <PriorityIcon className={cn("h-3.5 w-3.5 shrink-0", priorityColor)} />

      {task.assignee ? (
        <Avatar className="h-6 w-6">
          <AvatarFallback className={cn("text-[9px] text-white", task.assignee.color)}>
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-6 w-6 rounded-full border-2 border-dashed border-muted-foreground/30" />
      )}

      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
    </button>
  );
}

function groupTasks(tasks: Task[], groupBy: string) {
  if (groupBy === "status") {
    const order: Status[] = ["todo", "in-progress", "in-review", "done"];
    return order.map((status) => ({
      key: status,
      label: statusConfig[status].label,
      color: statusConfig[status].color,
      tasks: tasks.filter((t) => t.status === status),
    }));
  }
  return [{ key: "all", label: "All Tasks", color: undefined, tasks }];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days <= 7) return `${days}d`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date();
}
