"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ListView } from "@/components/views/list-view";
import { BoardView } from "@/components/views/board-view";
import { TaskDetail } from "@/components/views/task-detail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tasks, projects, type Task } from "@/data/mock";

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleNavigate = (view: string, projectId?: string) => {
    setActiveView(view);
    setActiveProject(projectId ?? null);
    setSelectedTask(null);
  };

  const filteredTasks = useMemo(() => {
    if (activeProject) {
      return tasks.filter((t) => t.project === activeProject);
    }
    return tasks;
  }, [activeProject]);

  const project = activeProject ? projects.find((p) => p.id === activeProject) : null;

  const title = project ? project.name : activeView === "my-tasks" ? "My Tasks" : "Home";
  const subtitle = project
    ? `${filteredTasks.length} tasks`
    : activeView === "home"
      ? "All projects"
      : undefined;

  return (
    <div className="flex h-screen">
      <Sidebar
        activeView={activeView}
        activeProject={activeProject}
        onNavigate={handleNavigate}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddTask={() => {}}
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {activeTab === "list" && (
              <ScrollArea className="h-full">
                <ListView tasks={filteredTasks} onTaskClick={setSelectedTask} />
              </ScrollArea>
            )}
            {activeTab === "board" && (
              <BoardView tasks={filteredTasks} onTaskClick={setSelectedTask} />
            )}
            {activeTab === "timeline" && (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-medium">Timeline View</p>
                  <p className="text-sm">Coming soon</p>
                </div>
              </div>
            )}
            {activeTab === "calendar" && (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-medium">Calendar View</p>
                  <p className="text-sm">Coming soon</p>
                </div>
              </div>
            )}
          </div>

          {selectedTask && (
            <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
