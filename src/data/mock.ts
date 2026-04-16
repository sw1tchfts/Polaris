export type Priority = "urgent" | "high" | "medium" | "low" | "none";
export type Status = "todo" | "in-progress" | "in-review" | "done";

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee?: User;
  project: string;
  section: string;
  dueDate?: string;
  tags: string[];
  subtasks: { id: string; title: string; done: boolean }[];
  createdAt: string;
}

export interface Section {
  id: string;
  name: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
  sections: Section[];
}

export const users: User[] = [
  { id: "u1", name: "Alex Chen", initials: "AC", color: "bg-blue-500" },
  { id: "u2", name: "Sarah Kim", initials: "SK", color: "bg-purple-500" },
  { id: "u3", name: "James Miller", initials: "JM", color: "bg-emerald-500" },
  { id: "u4", name: "Priya Patel", initials: "PP", color: "bg-amber-500" },
  { id: "u5", name: "David Okoro", initials: "DO", color: "bg-rose-500" },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Website Redesign",
    color: "bg-blue-500",
    icon: "Globe",
    sections: [
      { id: "s1", name: "Design", projectId: "p1" },
      { id: "s2", name: "Development", projectId: "p1" },
      { id: "s3", name: "Content", projectId: "p1" },
    ],
  },
  {
    id: "p2",
    name: "Mobile App",
    color: "bg-purple-500",
    icon: "Smartphone",
    sections: [
      { id: "s4", name: "iOS", projectId: "p2" },
      { id: "s5", name: "Android", projectId: "p2" },
      { id: "s6", name: "Backend", projectId: "p2" },
    ],
  },
  {
    id: "p3",
    name: "Q2 Marketing",
    color: "bg-emerald-500",
    icon: "Megaphone",
    sections: [
      { id: "s7", name: "Social Media", projectId: "p3" },
      { id: "s8", name: "Email Campaigns", projectId: "p3" },
      { id: "s9", name: "Analytics", projectId: "p3" },
    ],
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Design new landing page hero section",
    description: "Create a compelling hero section with animated illustrations",
    status: "in-progress",
    priority: "high",
    assignee: users[0],
    project: "p1",
    section: "s1",
    dueDate: "2026-04-20",
    tags: ["design", "landing-page"],
    subtasks: [
      { id: "st1", title: "Create wireframe", done: true },
      { id: "st2", title: "Design in Figma", done: true },
      { id: "st3", title: "Get stakeholder approval", done: false },
    ],
    createdAt: "2026-04-10",
  },
  {
    id: "t2",
    title: "Implement authentication flow",
    description: "Set up NextAuth with Google and GitHub providers",
    status: "todo",
    priority: "urgent",
    assignee: users[1],
    project: "p1",
    section: "s2",
    dueDate: "2026-04-18",
    tags: ["backend", "auth"],
    subtasks: [
      { id: "st4", title: "Configure NextAuth", done: false },
      { id: "st5", title: "Add Google provider", done: false },
      { id: "st6", title: "Add GitHub provider", done: false },
      { id: "st7", title: "Create sign-in page", done: false },
    ],
    createdAt: "2026-04-11",
  },
  {
    id: "t3",
    title: "Write blog post: Product Launch",
    status: "in-review",
    priority: "medium",
    assignee: users[2],
    project: "p1",
    section: "s3",
    dueDate: "2026-04-22",
    tags: ["content", "marketing"],
    subtasks: [
      { id: "st8", title: "Draft outline", done: true },
      { id: "st9", title: "Write first draft", done: true },
      { id: "st10", title: "Internal review", done: false },
    ],
    createdAt: "2026-04-08",
  },
  {
    id: "t4",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "done",
    priority: "high",
    assignee: users[3],
    project: "p1",
    section: "s2",
    dueDate: "2026-04-15",
    tags: ["devops", "infrastructure"],
    subtasks: [
      { id: "st11", title: "Create workflow file", done: true },
      { id: "st12", title: "Add test step", done: true },
      { id: "st13", title: "Configure deployment", done: true },
    ],
    createdAt: "2026-04-05",
  },
  {
    id: "t5",
    title: "Design mobile navigation patterns",
    status: "in-progress",
    priority: "medium",
    assignee: users[0],
    project: "p2",
    section: "s4",
    dueDate: "2026-04-25",
    tags: ["design", "mobile"],
    subtasks: [
      { id: "st14", title: "Research patterns", done: true },
      { id: "st15", title: "Create prototypes", done: false },
    ],
    createdAt: "2026-04-12",
  },
  {
    id: "t6",
    title: "Build push notification service",
    status: "todo",
    priority: "high",
    assignee: users[4],
    project: "p2",
    section: "s6",
    dueDate: "2026-04-28",
    tags: ["backend", "notifications"],
    subtasks: [],
    createdAt: "2026-04-13",
  },
  {
    id: "t7",
    title: "Create social media content calendar",
    status: "in-progress",
    priority: "medium",
    assignee: users[2],
    project: "p3",
    section: "s7",
    dueDate: "2026-04-19",
    tags: ["marketing", "social"],
    subtasks: [
      { id: "st16", title: "Plan April posts", done: true },
      { id: "st17", title: "Plan May posts", done: false },
      { id: "st18", title: "Design templates", done: false },
    ],
    createdAt: "2026-04-09",
  },
  {
    id: "t8",
    title: "Set up email automation workflows",
    status: "todo",
    priority: "low",
    assignee: users[3],
    project: "p3",
    section: "s8",
    dueDate: "2026-04-30",
    tags: ["marketing", "email"],
    subtasks: [],
    createdAt: "2026-04-14",
  },
  {
    id: "t9",
    title: "Implement responsive grid layout",
    status: "todo",
    priority: "medium",
    assignee: users[1],
    project: "p1",
    section: "s2",
    dueDate: "2026-04-24",
    tags: ["frontend", "responsive"],
    subtasks: [
      { id: "st19", title: "Mobile breakpoints", done: false },
      { id: "st20", title: "Tablet breakpoints", done: false },
    ],
    createdAt: "2026-04-14",
  },
  {
    id: "t10",
    title: "Configure analytics dashboard",
    status: "todo",
    priority: "low",
    assignee: users[4],
    project: "p3",
    section: "s9",
    dueDate: "2026-05-01",
    tags: ["analytics", "dashboard"],
    subtasks: [],
    createdAt: "2026-04-15",
  },
  {
    id: "t11",
    title: "Android material design components",
    status: "in-progress",
    priority: "high",
    assignee: users[4],
    project: "p2",
    section: "s5",
    dueDate: "2026-04-22",
    tags: ["android", "design"],
    subtasks: [
      { id: "st21", title: "Bottom navigation", done: true },
      { id: "st22", title: "Action sheets", done: false },
      { id: "st23", title: "Floating action button", done: false },
    ],
    createdAt: "2026-04-10",
  },
  {
    id: "t12",
    title: "API rate limiting implementation",
    status: "in-review",
    priority: "urgent",
    assignee: users[1],
    project: "p2",
    section: "s6",
    dueDate: "2026-04-17",
    tags: ["backend", "security"],
    subtasks: [
      { id: "st24", title: "Design rate limit strategy", done: true },
      { id: "st25", title: "Implement middleware", done: true },
      { id: "st26", title: "Add Redis backing store", done: true },
      { id: "st27", title: "Write tests", done: false },
    ],
    createdAt: "2026-04-07",
  },
];

export const statusConfig: Record<Status, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-gray-400" },
  "in-progress": { label: "In Progress", color: "bg-blue-500" },
  "in-review": { label: "In Review", color: "bg-amber-500" },
  done: { label: "Done", color: "bg-emerald-500" },
};

export const priorityConfig: Record<Priority, { label: string; color: string }> = {
  urgent: { label: "Urgent", color: "text-red-600" },
  high: { label: "High", color: "text-orange-500" },
  medium: { label: "Medium", color: "text-amber-500" },
  low: { label: "Low", color: "text-blue-500" },
  none: { label: "None", color: "text-gray-400" },
};
