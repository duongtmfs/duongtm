import { Boxes, Cloud, ShieldCheck, Smartphone, Workflow } from "lucide-react";

export const email = "tongminhduong897@gmail.com";
export const sections = ["Work", "Stack", "Record", "About", "Contact"];

export const projects = [
  {
    title: "Enterprise Resource Planning",
    icon: Boxes,
    field: "Enterprise software",
    role: "ReactJS Developer",
    team: 6,
    points: [
      "Built responsive customer, sales, order, and inventory workflows for a multi-tenant ERP platform.",
      "Developed reusable forms, tables, filters, and dialogs with ReactJS and Ant Design.",
      "Integrated paginated APIs, role-based permissions, and customer loyalty features.",
      "Tested components and application behavior with Jest.",
    ],
    tech: ["ReactJS", "Ant Design", "Zustand", "Axios", "Jest"],
  },
  {
    title: "Nagase",
    icon: Workflow,
    field: "Technology migration",
    role: "Angular Developer",
    team: 8,
    points: [
      "Migrated legacy WinForms interfaces to responsive Angular web applications while preserving existing workflows.",
      "Led client discussions and built interactive prototypes to agree on requirements.",
      "Integrated Jasper Reports with a Java Spring Boot backend for PDF exports.",
      "Designed reusable, accessible components and connected them to RESTful APIs.",
    ],
    tech: ["Angular", "TypeScript", "Jasper Reports", "Spring Boot"],
  },
  {
    title: "Cloudrity",
    icon: ShieldCheck,
    field: "Cybersecurity",
    role: "Angular Developer",
    team: 12,
    points: [
      "Built real-time dashboards for cloud security monitoring and attack detection.",
      "Developed reusable interface components and secure authentication workflows.",
      "Worked with backend engineers to optimize API performance for live security data.",
      "Wrote unit tests and supported QA and business analysts in refining security features.",
    ],
    tech: ["Angular", "TypeScript", "Tailwind CSS", "Ant Design"],
  },
  {
    title: "Smart Cloud Console",
    icon: Cloud,
    field: "Cloud Infrastructure Management Platform",
    role: "ReactJS Developer",
    client: "Vietnam",
    description: "Customers configure virtual machines, manage SSH keys, and secure their accounts. Administrators manage customers and credit account balances.",
    points: [
      "Built responsive cloud service screens and configuration forms for virtual machines and databases. Shared Ant Design controls and CSS Modules kept layouts consistent across feature modules.",
      "Connected account, SSH key, and two-factor authentication workflows to REST APIs. Used TanStack Query to isolate cached data by session and prevent stale responses after account changes.",
      "Built an admin-only balance crediting flow with amount validation, a confirmation step, duplicate-submission protection, and error handling.",
      "Generated TypeScript definitions from OpenAPI and validated responses with Zod. Tested permissions, balance credits, session isolation, and responsive layouts with Vitest and Playwright.",
    ],
    tech: ["TypeScript", "JavaScript (ES6+)", "TSX", "CSS", "ReactJS", "Vite", "Ant Design", "TanStack Router", "TanStack Query", "Zod", "CSS Modules", "Recharts", "OpenAPI TypeScript", "Vitest", "Playwright", "ESLint", "Prettier"],
  },
  {
    title: "Medyx",
    icon: Smartphone,
    field: "Hospital Information System (HIS) Mobile App",
    role: "ReactJS Developer (Ionic React)",
    client: "Vietnam",
    description: "An iOS and Android app where doctors find inpatients and outpatients, review patient records, and complete clinical forms configured by the hospital.",
    points: [
      "Built paginated patient lists with voice search and department and date filters. Doctors could switch between inpatient and outpatient lists without losing their filters.",
      "Rendered clinical forms from API definitions, including editable tables, searchable dropdowns, and file uploads. Validation opened the relevant section and identified the field to correct.",
      "Used Axios to load patient records, menus, and form definitions and submit clinical data. Added biometric sign-in and session restoration with Capacitor.",
      "Tested patient filtering, form navigation, and validation with Vitest and React Testing Library.",
    ],
    tech: ["TypeScript", "TSX", "ReactJS", "Ionic React", "Capacitor", "Redux Toolkit", "React Router", "Axios", "Vite", "Vitest", "React Testing Library"],
  },
];

const resumeStack = [
  "Angular",
  "TypeScript",
  "ReactJS",
  "RxJS",
  "JavaScript (ES6+)",
  "JSX",
  "Angular Material",
  "Ionic",
  "NestJS",
  "Ant Design",
  "React Router",
  "Axios",
  "Zustand",
  "styled-components",
  "Less",
  "Tailwind CSS",
  "Jest",
  "ng-packagr",
  "npm",
  "Module Federation",
  "Jasper Reports",
  "Java",
  "Spring Boot",
  "WinForms",
  "SQL Server",
  "MySQL",
  "JWT",
  "OAuth2",
  "Keycloak",
  "RESTful APIs",
  "Git",
  "CI/CD pipelines",
  "Jira",
  "Agile Scrum",
];

export const stack = Array.from(new Set([...resumeStack, ...projects.flatMap(project => project.tech)]));

export const record = [
  ["Jul 2024 — Nov 2026", "Flast Sulution", "Frontend Developer"],
  ["Jun 2022 — Jun 2024", "FPT Software", "Frontend Developer"],
  ["2022 — 2024", "FPT Aptech Academy", "International Software Programmer"],
];

export const principles = [
  [
    "Build for reuse",
    "Give shared forms, tables, and dialogs a consistent component API.",
  ],
  [
    "Design across screens",
    "Keep enterprise workflows usable across devices and screen sizes.",
  ],
  [
    "Test the interaction",
    "Use unit and component tests, then work with QA to resolve interface issues.",
  ],
  [
    "Clarify before building",
    "Use prototypes and client conversations to align on requirements.",
  ],
];
