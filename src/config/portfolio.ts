export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  challenges: string[];
  techStack: string[];
  contributions: string[];
  githubUrl?: string;
  liveUrl?: string;
  isConfidential?: boolean;
  metrics?: { label: string; value: string };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

export interface HighlightMetric {
  title: string;
  value: string;
  description: string;
  badge?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    experienceYears: string;
    location: string;
    headline: string;
    subHeadline: string;
    bio: string[];
    email: string;
    resumeUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    appsScriptUrl: string;
  };
  highlights: HighlightMetric[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  projects: Project[];
  education: EducationItem[];
  seo: {
    siteUrl: string;
    title: string;
    description: string;
    keywords: string[];
    author: string;
    twitterHandle: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Gautam Taneja",
    title: "Senior Software Engineer | Full-Stack Developer",
    experienceYears: "~5 Years",
    location: "Mohali, Punjab, India",
    headline: "Building Scalable Software. Engineering Better Experiences.",
    subHeadline:
      "Software Engineer specializing in scalable backend systems, modern web applications, cloud infrastructure, and performance-driven engineering.",
    bio: [
      "I am a versatile Software Engineer with approximately 5 years of professional experience architecting, building, and delivering enterprise-grade web applications and high-throughput backend services.",
      "My engineering philosophy centers around Clean Architecture, maintainability, and measurable performance. Whether optimizing relational database queries to slash endpoint response times by over 60%, establishing robust CI/CD automation, or designing responsive, accessible user interfaces in React and Angular, I take complete technical ownership from architectural design to production deployment.",
      "I thrive in environments where solving complex distributed systems challenges, hardening API security, and engineering resilient, mission-critical software directly drives business impact.",
    ],
    email: import.meta.env.VITE_CONTACT_EMAIL || "gautamtaneja.dev@gmail.com",
    resumeUrl: import.meta.env.VITE_RESUME_URL || "./resume.pdf",
    githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/your-username",
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/your-profile",
    appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL || "",
  },
  highlights: [
    {
      title: "Engineering Experience",
      value: "~5 Years",
      description: "Delivering resilient backend systems, cloud pipelines, and modern web applications.",
      badge: "Proven Track Record",
    },
    {
      title: "API Performance Gain",
      value: "1.2s → 450ms",
      description: "Average latency reduced by 62% via hybrid CQRS read-path optimization using Dapper.",
      badge: "62% Speedup",
    },
    {
      title: "Full-Stack Ownership",
      value: "End-to-End",
      description: "Architecting domain models, RESTful APIs, modern frontend SPAs, and automated CI/CD.",
      badge: "Lifecycle Mastery",
    },
    {
      title: "Multi-Stack Delivery",
      value: ".NET + React",
      description: "Production experience across .NET 8/10, React, Angular, Azure, AWS, and modern databases.",
      badge: "Versatile Stack",
    },
  ],
  experiences: [
    {
      id: "enest",
      company: "Enest Technologies Pvt. Ltd.",
      role: "Software Engineer / Full-Stack Developer",
      period: "August 2022 – Present",
      location: "Mohali, Punjab, India",
      type: "Full-time",
      description:
        "Architecting and delivering enterprise-grade solutions across distributed backend services and responsive frontend applications.",
      achievements: [
        "Architected and engineered enterprise-grade web applications using ASP.NET Core (.NET 8/10), Angular, and React with TypeScript.",
        "Designed and implemented high-performance REST APIs, background workers, and asynchronous job processing pipelines.",
        "Improved critical API endpoint performance from ~1.2 seconds down to 450 milliseconds by adopting Dapper for high-throughput read operations and eliminating ORM overhead.",
        "Implemented secure authentication and authorization flows utilizing JWT, OAuth2, and OpenID Connect (OIDC) protocols.",
        "Engineered database schemas and optimized complex queries across Microsoft SQL Server, PostgreSQL, and MongoDB.",
        "Integrated payment gateways (e.g., Stripe) and third-party APIs with resilient retry policies, idempotency, and webhook verification.",
        "Established automated Azure DevOps CI/CD pipelines, Docker containerization, and production cloud deployments.",
      ],
      technologies: [
        "C#",
        ".NET Core / .NET 8",
        "ASP.NET Core",
        "React",
        "Angular",
        "TypeScript",
        "Dapper",
        "EF Core",
        "SQL Server",
        "PostgreSQL",
        "Docker",
        "Azure DevOps",
      ],
    },
    {
      id: "ghrix",
      company: "Ghrix Technologies",
      role: "Software Development Intern",
      period: "February 2022 – July 2022",
      location: "Mohali, Punjab, India",
      type: "Internship",
      description:
        "Contributed to full-stack feature development, component refactoring, and REST API integrations within an agile engineering team.",
      achievements: [
        "Developed reusable responsive UI components using modern JavaScript, HTML5, and CSS3 following design specifications.",
        "Collaborated with senior engineers to build, test, and document RESTful endpoints connecting client applications to database layers.",
        "Conducted code reviews, debugged edge cases, and wrote automated unit tests to uphold code reliability and maintainability.",
      ],
      technologies: ["JavaScript", "React", "Node.js", "REST APIs", "SQL", "Git"],
    },
  ],
  skills: [
    {
      title: "Backend Engineering",
      description: "Building robust, scalable, and high-performance server-side architectures.",
      skills: [
        { name: "C# / .NET 8 / .NET 10", highlight: true },
        { name: "ASP.NET Core REST APIs", highlight: true },
        { name: "Microservices Architecture", highlight: true },
        { name: "Entity Framework Core" },
        { name: "Dapper (High-Speed ORM)", highlight: true },
        { name: "JWT, OAuth2 & OIDC Auth", highlight: true },
        { name: "Repository & Unit of Work" },
        { name: "Background Jobs & Async Queues" },
        { name: "Stripe & Payment Gateways" },
        { name: "API Security & Rate Limiting" },
      ],
    },
    {
      title: "Frontend Engineering",
      description: "Crafting intuitive, responsive, and accessible client-side applications.",
      skills: [
        { name: "React (Hooks, Context, State)", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "Angular", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Modern JavaScript (ESNext)" },
        { name: "HTML5 & Semantic Markup" },
        { name: "Responsive & Adaptive UI" },
        { name: "Web Accessibility (WCAG)" },
        { name: "Framer Motion / Animations" },
      ],
    },
    {
      title: "Databases & Storage",
      description: "Designing relational schemas, NoSQL document stores, and query optimization.",
      skills: [
        { name: "Microsoft SQL Server", highlight: true },
        { name: "PostgreSQL", highlight: true },
        { name: "MongoDB (NoSQL)" },
        { name: "Query Optimization & Indexing", highlight: true },
        { name: "Database Migrations & Schemas" },
        { name: "Redis Caching" },
        { name: "Data Integrity & ACID" },
      ],
    },
    {
      title: "Cloud & DevOps",
      description: "Automating pipelines, containerizing workloads, and managing cloud services.",
      skills: [
        { name: "Microsoft Azure", highlight: true },
        { name: "AWS (Amazon Web Services)" },
        { name: "Docker Containerization", highlight: true },
        { name: "Azure DevOps CI/CD", highlight: true },
        { name: "GitHub Actions", highlight: true },
        { name: "Git Version Control" },
        { name: "Application Insights & Monitoring" },
        { name: "Production Release Management" },
      ],
    },
    {
      title: "Architecture & Practices",
      description: "Applying foundational engineering principles to produce maintainable systems.",
      skills: [
        { name: "Clean Architecture", highlight: true },
        { name: "SOLID Principles", highlight: true },
        { name: "Design Patterns (GoF)", highlight: true },
        { name: "System Design & Distributed Systems", highlight: true },
        { name: "Performance Profiling & Tuning", highlight: true },
        { name: "Automated Testing (Unit & Integration)" },
        { name: "Code Reviews & Technical Mentorship" },
        { name: "Agile / Scrum Delivery" },
      ],
    },
  ],
  projects: [
    {
      id: "enterprise-management-platform",
      title: "Enterprise Management Platform",
      category: "Full-Stack Enterprise Solution",
      shortDescription:
        "A full-scale enterprise management platform featuring modular domain services, fine-grained RBAC permissions, audit logging, and automated reporting.",
      challenges: [
        "Enforcing strict role-based access control (RBAC) across complex multi-departmental workflows without sacrificing API throughput.",
        "Managing high-concurrency read/write operations and producing asynchronous audit reports across large data tables.",
      ],
      techStack: [
        "ASP.NET Core",
        "React",
        "TypeScript",
        "Microsoft SQL Server",
        "Docker",
        "Azure",
        "Tailwind CSS",
      ],
      contributions: [
        "Architected backend microservices and decoupled REST API layers following Clean Architecture and DDD principles.",
        "Engineered role-based access control and JWT token refresh mechanisms with fine-grained claim verification.",
        "Built dynamic data grid interfaces and interactive reporting dashboards in React with virtualized rendering.",
        "Automated deployment to Azure App Service using Azure DevOps CI/CD pipelines.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: true,
      metrics: {
        label: "Architecture",
        value: "Clean Architecture + Multi-Tenant",
      },
    },
    {
      id: "mobile-automotive-booking",
      title: "Mobile Automotive Service Booking Platform",
      category: "Full-Stack Web & Payment Application",
      shortDescription:
        "A seamless customer booking and service dispatch application connecting vehicle owners with mobile mechanics, featuring real-time slot scheduling and automated payments.",
      challenges: [
        "Eliminating double-booking race conditions during simultaneous peak-hour scheduling requests across shared technician calendars.",
        "Achieving reliable and idempotent payment fulfillment with Stripe webhook confirmation and transaction rollback safety.",
      ],
      techStack: [
        ".NET Core",
        "React",
        "PostgreSQL",
        "AWS (ECS, S3)",
        "Stripe API",
        "Tailwind CSS",
      ],
      contributions: [
        "Designed pessimistic/optimistic slot reservation locking in PostgreSQL to guarantee zero booking conflicts.",
        "Integrated Stripe payment intents and robust webhook handlers to automate invoicing and receipts.",
        "Developed responsive customer booking wizard and technician dispatch dashboard in React and Tailwind.",
        "Packaged services into lightweight Docker containers orchestrated on AWS ECS.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: true,
      metrics: {
        label: "Payments & Booking",
        value: "Zero-Conflict Scheduling + Stripe",
      },
    },
    {
      id: "high-performance-api",
      title: "High-Performance API Architecture",
      category: "Performance Engineering & System Optimization",
      shortDescription:
        "An API optimization case study establishing a hybrid CQRS model that combined EF Core for transactional writes and Dapper for high-speed read queries.",
      challenges: [
        "High query overhead and memory allocations caused by ORM entity tracking and multiple table joins on high-frequency read endpoints.",
        "API endpoint latency averaging ~1.2 seconds, causing timeouts during peak usage periods.",
      ],
      techStack: [
        ".NET 8",
        "C#",
        "Dapper",
        "EF Core",
        "SQL Server",
        "Redis",
        "BenchmarkDotNet",
      ],
      contributions: [
        "Profiled API bottlenecks and memory consumption with BenchmarkDotNet and SQL Server Profiler.",
        "Separated write operations (handled reliably via EF Core) from read queries (executed via ultra-fast, raw parameterized SQL with Dapper).",
        "Implemented Redis distributed caching with smart invalidation policies for frequently accessed catalog data.",
        "Slashed average endpoint response latency from 1.2s to 450ms—an immediate 62% reduction in server response time.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: false,
      metrics: {
        label: "Latency Reduction",
        value: "1.2s → 450ms (62% faster)",
      },
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology — Information Technology",
      institution: "DAV Institute of Engineering and Technology, Jalandhar",
      period: "2018 – 2022",
      location: "Punjab, India",
      description:
        "Comprehensive coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, Operating Systems, and Object-Oriented Software Engineering.",
    },
  ],
  seo: {
    siteUrl: "https://gautamtaneja.github.io",
    title: "Gautam Taneja | Senior Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Gautam Taneja, a Senior Software Engineer with ~5 years of experience specializing in ASP.NET Core, C#, React, TypeScript, scalable distributed systems, and cloud architecture.",
    keywords: [
      "Gautam Taneja",
      "Senior Software Engineer",
      "Full-Stack Developer",
      ".NET Developer",
      "ASP.NET Core",
      "React",
      "TypeScript",
      "C#",
      "Dapper",
      "Azure",
      "AWS",
      "Software Architect",
      "Mohali",
      "India",
    ],
    author: "Gautam Taneja",
    twitterHandle: "@gautamtaneja",
  },
};
