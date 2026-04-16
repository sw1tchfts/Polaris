"use client";

import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ListView } from "@/components/views/list-view";
import { BoardView } from "@/components/views/board-view";
import { TaskDetail } from "@/components/views/task-detail";
import { WorkgroupsView } from "@/components/views/workgroups-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tasks, projects, companies, getCommunity, type Task } from "@/data/mock";

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleNavigate = (view: string, projectId?: string, communityId?: string) => {
    setActiveView(view);
    setActiveProject(projectId ?? null);
    setActiveCommunity(communityId ?? null);
    setSelectedTask(null);
    if (view === "workgroups") {
      setActiveTab("workgroups");
    } else if (activeTab === "workgroups") {
      setActiveTab("list");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "workgroups") {
      setActiveView("workgroups");
    }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeProject) {
      result = result.filter((t) => t.project === activeProject);
    }

    if (activeView === "project-company" && activeProject) {
      result = result.filter((t) => t.scope === "company");
    } else if (activeView === "project-community" && activeCommunity) {
      result = result.filter(
        (t) => t.scope === "community" && t.communityId === activeCommunity
      );
    }

    return result;
  }, [activeProject, activeView, activeCommunity]);

  const project = activeProject ? projects.find((p) => p.id === activeProject) : null;
  const company = project ? companies.find((c) => c.id === project.companyId) : null;
  const community = activeCommunity ? getCommunity(activeCommunity) : null;

  let title = "Home";
  let subtitle: string | undefined = "All projects";
  let scopeLabel: string | undefined;
  let scopeType: "company" | "community" | null = null;

  if (project) {
    title = project.name;
    subtitle = `${filteredTasks.length} tasks`;

    if (activeView === "project-company") {
      scopeLabel = "Company-wide";
      scopeType = "company";
    } else if (activeView === "project-community" && community) {
      scopeLabel = community.name;
      scopeType = "community";
    }
  } else if (activeView === "my-tasks") {
    title = "My Tasks";
    subtitle = undefined;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        activeView={activeView}
        activeProject={activeProject}
        activeCommunity={activeCommunity}
        onNavigate={handleNavigate}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          scopeLabel={scopeLabel}
          scopeType={scopeType}
          activeTab={activeTab}
          onTabChange={handleTabChange}
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
            {activeTab === "workgroups" && project && (
              <ScrollArea className="h-full">
                <WorkgroupsView project={project} />
              </ScrollArea>
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
