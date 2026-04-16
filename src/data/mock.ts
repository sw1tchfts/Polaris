export type Priority = "urgent" | "high" | "medium" | "low" | "none";
export type Status = "todo" | "in-progress" | "in-review" | "done";
export type TaskScope = "company" | "community";

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: string;
  org: string;
}

export interface Community {
  id: string;
  name: string;
  companyId: string;
  location: string;
  beds: number;
}

export interface Company {
  id: string;
  name: string;
  color: string;
  communities: Community[];
}

export interface WorkgroupMember {
  userId: string;
  role: string;
}

export interface Workgroup {
  id: string;
  name: string;
  projectId: string;
  members: WorkgroupMember[];
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
  scope: TaskScope;
  communityId?: string;
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
  companyId: string;
  color: string;
  icon: string;
  sections: Section[];
  workgroups: Workgroup[];
}

// --- Users: mix of internal implementation team and client stakeholders ---

export const users: User[] = [
  { id: "u1", name: "Rachel Torres", initials: "RT", color: "bg-blue-500", role: "Implementation Manager", org: "Polaris" },
  { id: "u2", name: "Marcus Webb", initials: "MW", color: "bg-purple-500", role: "Solutions Engineer", org: "Polaris" },
  { id: "u3", name: "Emily Sato", initials: "ES", color: "bg-emerald-500", role: "Training Specialist", org: "Polaris" },
  { id: "u4", name: "Kevin Pham", initials: "KP", color: "bg-amber-500", role: "Integration Architect", org: "Polaris" },
  { id: "u5", name: "Lisa Chen", initials: "LC", color: "bg-rose-500", role: "VP of Operations", org: "Sunrise Senior Living" },
  { id: "u6", name: "Tom Bradley", initials: "TB", color: "bg-cyan-500", role: "IT Director", org: "Sunrise Senior Living" },
  { id: "u7", name: "Angela Morris", initials: "AM", color: "bg-indigo-500", role: "Clinical Director", org: "Sunrise Senior Living" },
  { id: "u8", name: "Derek Johnson", initials: "DJ", color: "bg-orange-500", role: "Regional Director", org: "Harmony Living" },
  { id: "u9", name: "Pam Nguyen", initials: "PN", color: "bg-pink-500", role: "Administrator", org: "Harmony Living" },
  { id: "u10", name: "Brian Walsh", initials: "BW", color: "bg-teal-500", role: "Compliance Officer", org: "Harmony Living" },
];

// --- Companies and Communities ---

export const companies: Company[] = [
  {
    id: "co1",
    name: "Sunrise Senior Living",
    color: "bg-blue-500",
    communities: [
      { id: "cm1", name: "Sunrise of Arlington", companyId: "co1", location: "Arlington, VA", beds: 120 },
      { id: "cm2", name: "Sunrise of Bethesda", companyId: "co1", location: "Bethesda, MD", beds: 95 },
      { id: "cm3", name: "Sunrise of Reston", companyId: "co1", location: "Reston, VA", beds: 110 },
    ],
  },
  {
    id: "co2",
    name: "Harmony Living Partners",
    color: "bg-emerald-500",
    communities: [
      { id: "cm4", name: "Harmony at Lakewood", companyId: "co2", location: "Denver, CO", beds: 85 },
      { id: "cm5", name: "Harmony at Cherry Creek", companyId: "co2", location: "Denver, CO", beds: 140 },
    ],
  },
];

// --- Projects with sections and workgroups ---

export const projects: Project[] = [
  {
    id: "p1",
    name: "Sunrise — Platform Implementation",
    companyId: "co1",
    color: "bg-blue-500",
    icon: "Building2",
    sections: [
      { id: "s1", name: "Discovery & Planning", projectId: "p1" },
      { id: "s2", name: "System Configuration", projectId: "p1" },
      { id: "s3", name: "Data Migration", projectId: "p1" },
      { id: "s4", name: "Training & Enablement", projectId: "p1" },
      { id: "s5", name: "Go-Live & Hypercare", projectId: "p1" },
    ],
    workgroups: [
      {
        id: "wg1",
        name: "Steering Committee",
        projectId: "p1",
        members: [
          { userId: "u1", role: "Project Lead" },
          { userId: "u5", role: "Executive Sponsor" },
          { userId: "u6", role: "IT Sponsor" },
        ],
      },
      {
        id: "wg2",
        name: "Clinical Configuration",
        projectId: "p1",
        members: [
          { userId: "u2", role: "Solutions Lead" },
          { userId: "u7", role: "Clinical SME" },
          { userId: "u3", role: "Training Lead" },
        ],
      },
      {
        id: "wg3",
        name: "Technical Integration",
        projectId: "p1",
        members: [
          { userId: "u4", role: "Integration Lead" },
          { userId: "u6", role: "IT Lead" },
          { userId: "u2", role: "Solutions Engineer" },
        ],
      },
      {
        id: "wg4",
        name: "Training & Rollout",
        projectId: "p1",
        members: [
          { userId: "u3", role: "Training Lead" },
          { userId: "u7", role: "Clinical Trainer" },
          { userId: "u1", role: "Rollout Coordinator" },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Harmony — EHR Integration",
    companyId: "co2",
    color: "bg-emerald-500",
    icon: "HeartPulse",
    sections: [
      { id: "s6", name: "Requirements Gathering", projectId: "p2" },
      { id: "s7", name: "Interface Build", projectId: "p2" },
      { id: "s8", name: "Testing & Validation", projectId: "p2" },
      { id: "s9", name: "Deployment", projectId: "p2" },
    ],
    workgroups: [
      {
        id: "wg5",
        name: "Steering Committee",
        projectId: "p2",
        members: [
          { userId: "u1", role: "Polaris Lead" },
          { userId: "u8", role: "Executive Sponsor" },
          { userId: "u10", role: "Compliance Lead" },
        ],
      },
      {
        id: "wg6",
        name: "Integration Team",
        projectId: "p2",
        members: [
          { userId: "u4", role: "Integration Architect" },
          { userId: "u9", role: "Facility Admin" },
          { userId: "u2", role: "Solutions Engineer" },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "Sunrise — Billing Module Rollout",
    companyId: "co1",
    color: "bg-violet-500",
    icon: "Receipt",
    sections: [
      { id: "s10", name: "Configuration", projectId: "p3" },
      { id: "s11", name: "Testing", projectId: "p3" },
      { id: "s12", name: "Training", projectId: "p3" },
      { id: "s13", name: "Go-Live", projectId: "p3" },
    ],
    workgroups: [
      {
        id: "wg7",
        name: "Billing Workgroup",
        projectId: "p3",
        members: [
          { userId: "u1", role: "Project Lead" },
          { userId: "u5", role: "Operations Sponsor" },
          { userId: "u2", role: "Configuration Lead" },
        ],
      },
    ],
  },
];

// --- Tasks: mix of company-level and community-level ---

export const tasks: Task[] = [
  // === Sunrise Platform Implementation — Company-level tasks ===
  {
    id: "t1",
    title: "Finalize master service agreement and SOW",
    description: "Review and execute MSA with legal teams on both sides. SOW includes all three communities in Phase 1.",
    status: "done",
    priority: "urgent",
    assignee: users[0],
    project: "p1",
    section: "s1",
    scope: "company",
    dueDate: "2026-04-10",
    tags: ["legal", "planning"],
    subtasks: [
      { id: "st1", title: "Draft SOW", done: true },
      { id: "st2", title: "Legal review — Polaris", done: true },
      { id: "st3", title: "Legal review — Sunrise", done: true },
      { id: "st4", title: "Execute agreement", done: true },
    ],
    createdAt: "2026-03-15",
  },
  {
    id: "t2",
    title: "Configure company-wide role permissions and security groups",
    description: "Set up RBAC model at org level: Admin, Regional Director, Community Administrator, Clinical Staff, Front Desk",
    status: "in-progress",
    priority: "high",
    assignee: users[1],
    project: "p1",
    section: "s2",
    scope: "company",
    dueDate: "2026-04-22",
    tags: ["configuration", "security"],
    subtasks: [
      { id: "st5", title: "Define role matrix with Sunrise IT", done: true },
      { id: "st6", title: "Configure roles in platform", done: true },
      { id: "st7", title: "Set up SSO integration with Azure AD", done: false },
      { id: "st8", title: "Test permission inheritance", done: false },
    ],
    createdAt: "2026-04-01",
  },
  {
    id: "t3",
    title: "Build company-wide reporting dashboard templates",
    description: "Create standard report templates that apply across all communities: occupancy, clinical incidents, staffing ratios",
    status: "todo",
    priority: "medium",
    assignee: users[1],
    project: "p1",
    section: "s2",
    scope: "company",
    dueDate: "2026-05-01",
    tags: ["reporting", "configuration"],
    subtasks: [
      { id: "st9", title: "Occupancy report template", done: false },
      { id: "st10", title: "Incident tracking report", done: false },
      { id: "st11", title: "Staff ratio dashboard", done: false },
    ],
    createdAt: "2026-04-05",
  },
  {
    id: "t4",
    title: "Migrate resident records from legacy CareTracker system",
    description: "Export and transform 2,400+ resident records across all Sunrise communities from CareTracker to Polaris format",
    status: "in-progress",
    priority: "urgent",
    assignee: users[3],
    project: "p1",
    section: "s3",
    scope: "company",
    dueDate: "2026-04-25",
    tags: ["data-migration", "integration"],
    subtasks: [
      { id: "st12", title: "Export CareTracker data", done: true },
      { id: "st13", title: "Build transformation scripts", done: true },
      { id: "st14", title: "Validate data integrity", done: false },
      { id: "st15", title: "Import to staging environment", done: false },
      { id: "st16", title: "Client sign-off on migrated data", done: false },
    ],
    createdAt: "2026-04-02",
  },

  // === Sunrise Platform Implementation — Community-level tasks ===
  {
    id: "t5",
    title: "Configure medication management workflow — Arlington",
    description: "Arlington uses a different pharmacy vendor (PharMerica) than the other communities. Custom eMAR integration needed.",
    status: "in-progress",
    priority: "high",
    assignee: users[1],
    project: "p1",
    section: "s2",
    scope: "community",
    communityId: "cm1",
    dueDate: "2026-04-28",
    tags: ["clinical", "eMAR", "configuration"],
    subtasks: [
      { id: "st17", title: "Map PharMerica formulary codes", done: true },
      { id: "st18", title: "Configure eMAR pass times", done: false },
      { id: "st19", title: "Set up PRN protocols", done: false },
    ],
    createdAt: "2026-04-08",
  },
  {
    id: "t6",
    title: "Configure medication management workflow — Bethesda",
    description: "Bethesda uses Omnicare pharmacy. Standard eMAR setup with custom pass times for memory care wing.",
    status: "todo",
    priority: "high",
    assignee: users[1],
    project: "p1",
    section: "s2",
    scope: "community",
    communityId: "cm2",
    dueDate: "2026-05-02",
    tags: ["clinical", "eMAR", "configuration"],
    subtasks: [
      { id: "st20", title: "Map Omnicare formulary codes", done: false },
      { id: "st21", title: "Configure eMAR pass times", done: false },
      { id: "st22", title: "Memory care wing custom schedule", done: false },
    ],
    createdAt: "2026-04-08",
  },
  {
    id: "t7",
    title: "Configure medication management workflow — Reston",
    description: "Reston also uses Omnicare. Standard configuration, no memory care wing.",
    status: "todo",
    priority: "medium",
    assignee: users[1],
    project: "p1",
    section: "s2",
    scope: "community",
    communityId: "cm3",
    dueDate: "2026-05-05",
    tags: ["clinical", "eMAR", "configuration"],
    subtasks: [
      { id: "st23", title: "Map Omnicare formulary codes", done: false },
      { id: "st24", title: "Configure eMAR pass times", done: false },
    ],
    createdAt: "2026-04-08",
  },
  {
    id: "t8",
    title: "Set up community-specific care levels and billing rates — Arlington",
    description: "Arlington has 4 care levels (Independent, Assisted, Enhanced, Memory Care) with different rate structures than other communities.",
    status: "in-review",
    priority: "high",
    assignee: users[0],
    project: "p1",
    section: "s2",
    scope: "community",
    communityId: "cm1",
    dueDate: "2026-04-20",
    tags: ["billing", "configuration"],
    subtasks: [
      { id: "st25", title: "Define care level criteria", done: true },
      { id: "st26", title: "Configure rate tables", done: true },
      { id: "st27", title: "Map to GL codes", done: true },
      { id: "st28", title: "Client review of rate structure", done: false },
    ],
    createdAt: "2026-04-06",
  },
  {
    id: "t9",
    title: "Set up community-specific care levels and billing rates — Bethesda",
    description: "Bethesda has 3 care levels (Assisted, Enhanced, Memory Care). No independent living wing.",
    status: "todo",
    priority: "medium",
    assignee: users[0],
    project: "p1",
    section: "s2",
    scope: "community",
    communityId: "cm2",
    dueDate: "2026-04-30",
    tags: ["billing", "configuration"],
    subtasks: [
      { id: "st29", title: "Define care level criteria", done: false },
      { id: "st30", title: "Configure rate tables", done: false },
      { id: "st31", title: "Map to GL codes", done: false },
    ],
    createdAt: "2026-04-06",
  },
  {
    id: "t10",
    title: "Conduct train-the-trainer sessions — Arlington (Wave 1)",
    description: "First community go-live. Train 8 super users who will train remaining staff.",
    status: "todo",
    priority: "high",
    assignee: users[2],
    project: "p1",
    section: "s4",
    scope: "community",
    communityId: "cm1",
    dueDate: "2026-05-10",
    tags: ["training", "go-live"],
    subtasks: [
      { id: "st32", title: "Identify super users", done: true },
      { id: "st33", title: "Schedule training sessions", done: false },
      { id: "st34", title: "Prepare training materials", done: false },
      { id: "st35", title: "Conduct Day 1: Clinical workflows", done: false },
      { id: "st36", title: "Conduct Day 2: Administrative workflows", done: false },
    ],
    createdAt: "2026-04-10",
  },
  {
    id: "t11",
    title: "Arlington go-live readiness assessment",
    description: "Final checklist before go-live: data migration verified, staff trained, integrations tested, rollback plan documented.",
    status: "todo",
    priority: "urgent",
    assignee: users[0],
    project: "p1",
    section: "s5",
    scope: "community",
    communityId: "cm1",
    dueDate: "2026-05-15",
    tags: ["go-live", "readiness"],
    subtasks: [
      { id: "st37", title: "Data migration sign-off", done: false },
      { id: "st38", title: "Integration testing complete", done: false },
      { id: "st39", title: "Staff training complete", done: false },
      { id: "st40", title: "Rollback plan documented", done: false },
      { id: "st41", title: "Go/No-go decision meeting", done: false },
    ],
    createdAt: "2026-04-12",
  },
  {
    id: "t12",
    title: "Configure state-specific compliance forms — Virginia",
    description: "Arlington and Reston are in Virginia. Configure VA DSS required assessment forms and incident reporting.",
    status: "in-progress",
    priority: "high",
    assignee: users[6],
    project: "p1",
    section: "s2",
    scope: "company",
    dueDate: "2026-04-26",
    tags: ["compliance", "clinical"],
    subtasks: [
      { id: "st42", title: "Map VA DSS assessment requirements", done: true },
      { id: "st43", title: "Configure UAI form template", done: true },
      { id: "st44", title: "Set up incident reporting workflow", done: false },
      { id: "st45", title: "Configure mandatory reporting triggers", done: false },
    ],
    createdAt: "2026-04-04",
  },

  // === Harmony EHR Integration tasks ===
  {
    id: "t13",
    title: "Document PointClickCare API requirements",
    description: "Harmony uses PointClickCare as their EHR. Map all required data exchange points for bidirectional sync.",
    status: "in-progress",
    priority: "high",
    assignee: users[3],
    project: "p2",
    section: "s6",
    scope: "company",
    dueDate: "2026-04-24",
    tags: ["integration", "EHR"],
    subtasks: [
      { id: "st46", title: "Resident demographics sync spec", done: true },
      { id: "st47", title: "Clinical assessment sync spec", done: true },
      { id: "st48", title: "Medication orders sync spec", done: false },
      { id: "st49", title: "Billing data exchange spec", done: false },
    ],
    createdAt: "2026-04-05",
  },
  {
    id: "t14",
    title: "Build HL7 FHIR interface for resident demographics",
    description: "Implement FHIR R4 Patient resource mapping for bidirectional resident data sync between Polaris and PCC.",
    status: "todo",
    priority: "high",
    assignee: users[3],
    project: "p2",
    section: "s7",
    scope: "company",
    dueDate: "2026-05-05",
    tags: ["integration", "FHIR", "development"],
    subtasks: [],
    createdAt: "2026-04-10",
  },
  {
    id: "t15",
    title: "Configure community-specific census sync — Lakewood",
    description: "Lakewood has a different unit numbering scheme and floor plan layout in PCC that needs custom field mapping.",
    status: "todo",
    priority: "medium",
    assignee: users[8],
    project: "p2",
    section: "s7",
    scope: "community",
    communityId: "cm4",
    dueDate: "2026-05-08",
    tags: ["integration", "configuration"],
    subtasks: [
      { id: "st50", title: "Map unit/room numbers to PCC", done: false },
      { id: "st51", title: "Configure floor plan sync", done: false },
    ],
    createdAt: "2026-04-12",
  },
  {
    id: "t16",
    title: "Configure community-specific census sync — Cherry Creek",
    description: "Cherry Creek is a newer facility with standard PCC setup. Should be a straightforward mapping.",
    status: "todo",
    priority: "low",
    assignee: users[8],
    project: "p2",
    section: "s7",
    scope: "community",
    communityId: "cm5",
    dueDate: "2026-05-12",
    tags: ["integration", "configuration"],
    subtasks: [
      { id: "st52", title: "Map unit/room numbers to PCC", done: false },
      { id: "st53", title: "Configure floor plan sync", done: false },
    ],
    createdAt: "2026-04-12",
  },
  {
    id: "t17",
    title: "Compliance audit: HIPAA data flow review",
    description: "Review all data exchange points between Polaris and PCC to ensure HIPAA compliance. Document BAA requirements.",
    status: "in-review",
    priority: "urgent",
    assignee: users[9],
    project: "p2",
    section: "s6",
    scope: "company",
    dueDate: "2026-04-18",
    tags: ["compliance", "HIPAA", "security"],
    subtasks: [
      { id: "st54", title: "Map all PHI data flows", done: true },
      { id: "st55", title: "Review encryption at rest/transit", done: true },
      { id: "st56", title: "Verify BAA coverage", done: true },
      { id: "st57", title: "Document audit trail requirements", done: false },
    ],
    createdAt: "2026-04-03",
  },

  // === Sunrise Billing Module Rollout ===
  {
    id: "t18",
    title: "Configure company-wide billing rules and fee schedules",
    description: "Set up global billing parameters: payment terms, late fees, ancillary service charges, private pay vs. insurance workflows.",
    status: "in-progress",
    priority: "high",
    assignee: users[1],
    project: "p3",
    section: "s10",
    scope: "company",
    dueDate: "2026-04-28",
    tags: ["billing", "configuration"],
    subtasks: [
      { id: "st58", title: "Define fee schedule templates", done: true },
      { id: "st59", title: "Configure payment terms", done: true },
      { id: "st60", title: "Set up insurance payer mappings", done: false },
      { id: "st61", title: "Configure statement generation rules", done: false },
    ],
    createdAt: "2026-04-08",
  },
  {
    id: "t19",
    title: "Set up community-specific tax rates and GL mappings — Arlington",
    description: "Arlington VA has specific local tax requirements for senior living services.",
    status: "todo",
    priority: "medium",
    assignee: users[0],
    project: "p3",
    section: "s10",
    scope: "community",
    communityId: "cm1",
    dueDate: "2026-05-03",
    tags: ["billing", "tax", "configuration"],
    subtasks: [
      { id: "st62", title: "Research Arlington County tax rates", done: false },
      { id: "st63", title: "Configure GL account mappings", done: false },
      { id: "st64", title: "Set up revenue recognition rules", done: false },
    ],
    createdAt: "2026-04-10",
  },
  {
    id: "t20",
    title: "UAT: End-to-end billing cycle testing",
    description: "Test full billing cycle from resident admission through statement generation across all configured communities.",
    status: "todo",
    priority: "high",
    assignee: users[4],
    project: "p3",
    section: "s11",
    scope: "company",
    dueDate: "2026-05-10",
    tags: ["testing", "billing", "UAT"],
    subtasks: [
      { id: "st65", title: "Create test scenarios document", done: false },
      { id: "st66", title: "Test new admission billing", done: false },
      { id: "st67", title: "Test care level change billing", done: false },
      { id: "st68", title: "Test discharge and final statement", done: false },
      { id: "st69", title: "Test insurance claim submission", done: false },
    ],
    createdAt: "2026-04-14",
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

export function getCompanyForProject(projectId: string): Company | undefined {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return undefined;
  return companies.find((c) => c.id === project.companyId);
}

export function getCommunity(communityId: string): Community | undefined {
  for (const company of companies) {
    const community = company.communities.find((c) => c.id === communityId);
    if (community) return community;
  }
  return undefined;
}

export function getUserById(userId: string): User | undefined {
  return users.find((u) => u.id === userId);
}
