"use client";

import React from "react";
import { List, LayoutGrid, GanttChart, Calendar, Filter, SortAsc, Plus, Users, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopbarProps {
  title: string;
  subtitle?: string;
  scopeLabel?: string;
  scopeType?: "company" | "community" | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddTask: () => void;
}

export function Topbar({ title, subtitle, scopeLabel, scopeType, activeTab, onTabChange, onAddTask }: TopbarProps) {
  return (
    <div className="flex flex-col border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {scopeLabel && scopeType && (
            <Badge variant={scopeType === "community" ? "outline" : "secondary"} className="gap-1 text-xs">
              {scopeType === "community" ? <MapPin className="h-3 w-3" /> : <Building className="h-3 w-3" />}
              {scopeLabel}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Share
          </Button>
          <Button size="sm" className="gap-1.5" onClick={onAddTask}>
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 pb-0">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="h-8 bg-transparent p-0 gap-0">
            <TabsTrigger
              value="list"
              className="gap-1.5 rounded-none border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <List className="h-3.5 w-3.5" />
              List
            </TabsTrigger>
            <TabsTrigger
              value="board"
              className="gap-1.5 rounded-none border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Board
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="gap-1.5 rounded-none border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <GanttChart className="h-3.5 w-3.5" />
              Timeline
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="gap-1.5 rounded-none border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Calendar className="h-3.5 w-3.5" />
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="workgroups"
              className="gap-1.5 rounded-none border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Users className="h-3.5 w-3.5" />
              Workgroups
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-1 pb-1">
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
            <Filter className="h-3 w-3" />
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
            <SortAsc className="h-3 w-3" />
            Sort
          </Button>
        </div>
      </div>
    </div>
  );
}
