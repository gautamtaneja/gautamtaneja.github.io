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
    experienceYears: "~5 Years (4+ Full-Time)",
    location: "India (Open to Relocation)",
    headline: "Building Scalable Software. Engineering Better Experiences.",
    subHeadline:
      "Software Engineer specializing in scalable backend systems, modern web applications, cloud infrastructure, and performance-driven engineering.",
    bio: [
      "I am a versatile Software Engineer with approximately 5 years of professional experience architecting, building, and delivering high-performance web applications and scalable backend services.",
      "My engineering philosophy centers around Clean Architecture, maintainability, and end-to-end technical ownership. I enjoy bridging the gap between elegant client-side interfaces and resilient, high-throughput server architectures—from designing robust database schemas and secure RESTful APIs to automating cloud deployments.",
      "I thrive in collaborative environments solving complex technical challenges, hardening system security, optimizing application performance, and delivering mission-critical software that creates genuine business value.",
    ],
    email: import.meta.env.VITE_CONTACT_EMAIL || "gautam.debug@gmail.com",
    resumeUrl: import.meta.env.VITE_RESUME_URL || "./resume.pdf",
    githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/gautamtaneja",
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/gautam-taneja",
    appsScriptUrl:
      import.meta.env.VITE_APPS_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbxoYLfFKqKmyXsCY53Gn_6moQtHIU0X9BOG3n6jiC_jykkHzGIAm6NHcr2sfa63M2Yf/exec",
  },
  highlights: [
    {
      title: "Production Engineering",
      value: "~5 Years",
      description: "Delivering resilient backend systems, cloud pipelines, and modern web applications.",
      badge: "Proven Experience",
    },
    {
      title: "API Performance Gain",
      value: "1.2s → 450ms",
      description: "60% average latency reduction via hybrid EF Core writes + Dapper reads data architecture.",
      badge: "60% Speedup",
    },
    {
      title: "Enterprise Access Control",
      value: "100K+ Users",
      description: "Designed fine-grained RBAC with real-time audit tracking and automated clinical reports.",
      badge: "Security & Scale",
    },
    {
      title: "CI/CD & DevOps Automation",
      value: "15+ Pipelines",
      description: "Automated YAML pipelines in Azure DevOps with Docker, increasing release cadence 4x.",
      badge: "DevOps Mastery",
    },
  ],
  experiences: [
    {
      id: "enest",
      company: "Enest Technologies Pvt. Ltd.",
      role: "Software Engineer / Full-Stack Developer",
      period: "August 2022 – Present",
      location: "India",
      type: "Full-time",
      description:
        "Lead engineer on Imperans: compliance SaaS platform for TDDA (New Zealand), processing 25,000+ drug and alcohol tests monthly across Australasia under ISO 17025 accreditation standards.",
      achievements: [
        "Own architecture, delivery and stakeholder communication end to end, from requirements through production deployment; designed the microservices architecture, including database schema, service boundaries and API contracts.",
        "Built a hybrid data access layer using EF Core for writes and Dapper for reads, cutting average API response time by 60% (1.2 s to 450 ms).",
        "Integrated Stripe with idempotent webhook handlers to prevent duplicate charge processing, and automated SendGrid notifications that reduced missed alerts by 85%.",
        "Designed role-based access control (RBAC) for 100K+ users with real-time audit tracking, and built an automated clinical report generator that saved 75% of administrative drafting time per cycle.",
        "Utilized the OpenAI API with structured prompts for automated report generation and internal task automation; leverage GitHub Copilot in day-to-day development.",
        "Architected cloud workloads across Azure App Service, Azure Functions, Azure Service Bus and Azure Key Vault in the Imperans cloud architecture.",
        "Built and maintained 15+ CI/CD pipelines with Azure DevOps (YAML) and Docker, cutting manual deployment effort by 85% and increasing release cadence 4x.",
        "Mentored 3 junior developers through code reviews and Angular best practices, contributing to a 20% reduction in post-release defects.",
      ],
      technologies: [
        "C#",
        ".NET 8",
        "ASP.NET Core Web API",
        "Angular 18",
        "React",
        "TypeScript",
        "Dapper",
        "EF Core",
        "SQL Server",
        "Azure Service Bus",
        "Azure Key Vault",
        "Docker",
        "Azure DevOps",
        "OpenAI API",
      ],
    },
    {
      id: "enest-intern",
      company: "Enest Technologies Pvt. Ltd.",
      role: "Software Engineer Intern",
      period: "August 2021 – July 2022",
      location: "India",
      type: "Internship",
      description:
        "Contributed to full-stack feature delivery, API refactoring, and database optimization across high-traffic enterprise endpoints. Converted to full-time within 12 months.",
      achievements: [
        "Converted to full-time within 12 months after delivering 10+ core API modules and leading a legacy SQL schema refactor that stabilized high-traffic endpoints.",
        "Optimized T-SQL stored procedures and indexing strategies, reducing query execution time by 30% on high-traffic endpoints.",
        "Built modular, responsive Angular components and significantly enhanced mobile cross-device responsiveness.",
        "Participated in agile ceremonies, sprint estimation, and authored comprehensive unit tests using xUnit.",
      ],
      technologies: ["C#", "ASP.NET Core", "Angular", "JavaScript", "SQL Server", "T-SQL", "xUnit", "Git"],
    },
  ],
  skills: [
    {
      title: "Backend Engineering",
      description: "Building robust, scalable, and high-performance server-side architectures.",
      skills: [
        { name: "C# / .NET 8 / .NET Core", highlight: true },
        { name: "ASP.NET Core Web API", highlight: true },
        { name: "Microservices Architecture", highlight: true },
        { name: "Entity Framework Core" },
        { name: "Dapper (High-Speed ORM)", highlight: true },
        { name: "REST APIs & Swagger / OpenAPI", highlight: true },
        { name: "Role-Based Access Control (RBAC)", highlight: true },
        { name: "Stripe API & Webhooks", highlight: true },
        { name: "SendGrid & Email Automation" },
        { name: "OpenAI API Integration", highlight: true },
      ],
    },
    {
      title: "Frontend Engineering",
      description: "Crafting intuitive, responsive, and accessible client-side applications.",
      skills: [
        { name: "Angular 18", highlight: true },
        { name: "React (Hooks, Context)", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "JavaScript (ES6+)" },
        { name: "HTML5 & CSS3" },
        { name: "Responsive & Mobile UI", highlight: true },
        { name: "jQuery" },
        { name: "Web Accessibility (WCAG)" },
      ],
    },
    {
      title: "Databases & Data Access",
      description: "Designing relational schemas, stored procedures, and query performance tuning.",
      skills: [
        { name: "Microsoft SQL Server", highlight: true },
        { name: "T-SQL & Stored Procedures", highlight: true },
        { name: "Indexing & Query Optimization", highlight: true },
        { name: "Dapper (Read-Optimized)", highlight: true },
        { name: "Entity Framework Core" },
        { name: "Redis Caching", highlight: true },
        { name: "MongoDB (NoSQL)" },
      ],
    },
    {
      title: "Cloud & DevOps",
      description: "Automating pipelines, containerizing workloads, and managing cloud services.",
      skills: [
        { name: "Microsoft Azure (App Service, Functions)", highlight: true },
        { name: "Azure Service Bus & Key Vault", highlight: true },
        { name: "Azure DevOps CI/CD (YAML)", highlight: true },
        { name: "Docker Containerization", highlight: true },
        { name: "AWS (Amazon Web Services)" },
        { name: "Git Version Control" },
        { name: "GitHub Actions", highlight: true },
      ],
    },
    {
      title: "Architecture & Quality",
      description: "Engineering practices ensuring long-term software maintainability and team velocity.",
      skills: [
        { name: "Clean Architecture", highlight: true },
        { name: "SOLID Principles", highlight: true },
        { name: "System Design & Distributed Systems", highlight: true },
        { name: "Unit & Integration Testing (xUnit)", highlight: true },
        { name: "Code Reviews & Mentoring", highlight: true },
        { name: "GitHub Copilot", highlight: true },
        { name: "Agile / Scrum Delivery" },
      ],
    },
  ],
  projects: [
    {
      id: "imperans-compliance-platform",
      title: "Imperans — Compliance SaaS Platform",
      category: "Mission-Critical Enterprise SaaS",
      shortDescription:
        "High-concurrency compliance SaaS platform built for TDDA (The Drug Detection Agency, New Zealand), processing 25,000+ monthly drug & alcohol tests across Australasia under ISO 17025 accreditation standards.",
      challenges: [
        "Adhering to strict ISO 17025 laboratory accreditation standards requiring verifiable audit trails and zero tampering risk.",
        "High query overhead on complex clinical reports and high-volume concurrent webhook processing without double-charging.",
      ],
      techStack: [
        ".NET 8",
        "C#",
        "ASP.NET Core Web API",
        "Angular 18",
        "SQL Server",
        "Dapper",
        "Azure Service Bus",
        "Azure Key Vault",
        "Stripe API",
        "SendGrid",
        "Docker",
      ],
      contributions: [
        "Owned microservices architecture, database schema, service boundaries, and REST API contracts end to end.",
        "Built a hybrid data access layer using EF Core for transactional writes and Dapper for reads, cutting latency by 60% (1.2s to 450ms).",
        "Integrated Stripe with idempotent webhook handlers to prevent duplicate charge processing and automated SendGrid notifications reducing missed alerts by 85%.",
        "Designed granular RBAC for 100K+ users with real-time audit tracking, and built an automated clinical report generator saving 75% of administrative drafting time.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: true,
      metrics: {
        label: "Throughput & Standards",
        value: "25,000+ Tests/Mo • ISO 17025",
      },
    },
    {
      id: "pharmacy-first",
      title: "Pharmacy First — Healthcare & Consultation Platform",
      category: "Healthcare E-Commerce & Telehealth",
      shortDescription:
        "Regulated UK online pharmacy and doctor consultation platform serving 50,000+ customers, offering prescription medications, OTC products, and online clinical consultations.",
      challenges: [
        "Complying with strict UK healthcare regulatory standards, patient data privacy (GDPR), and safe prescription validation workflows.",
        "Orchestrating seamless e-commerce transactions alongside structured patient medical questionnaire evaluations.",
      ],
      techStack: [
        ".NET Framework",
        "ASP.NET MVC",
        "SQL Server",
        "T-SQL Stored Procedures",
        "jQuery",
        "HTML5",
        "CSS3",
      ],
      contributions: [
        "Built patient consultation and e-commerce checkout workflows across the full stack, from frontend forms to backend API handlers.",
        "Engineered complex, high-performance SQL Server stored procedures and transactional data tables.",
        "Implemented strict prescription validation workflows, patient eligibility verification, and automated order fulfillment.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: true,
      metrics: {
        label: "Scale & Compliance",
        value: "50,000+ Customers • UK Regulated",
      },
    },
    {
      id: "high-performance-api",
      title: "High-Performance API Architecture",
      category: "Performance Engineering & System Optimization",
      shortDescription:
        "A hybrid CQRS data layer architecture case study combining EF Core for transactional writes and Dapper for high-speed read queries, slashing response latency by 60%.",
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
        "Slashed average endpoint response latency from 1.2s to 450ms—an immediate 60% reduction in server response time.",
      ],
      githubUrl: "",
      liveUrl: "",
      isConfidential: false,
      metrics: {
        label: "Latency Reduction",
        value: "1.2s → 450ms (60% faster)",
      },
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology — Information Technology (CGPA: 7.7 / 10)",
      institution: "IK Gujral Punjab Technical University (IKGPTU)",
      period: "2018 – 2022",
      location: "India",
      description:
        "Comprehensive coursework in Data Structures, Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, and Object-Oriented Software Engineering.",
    },
  ],
  seo: {
    siteUrl: "https://gautamtaneja.github.io",
    title: "Gautam Taneja | Senior Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Gautam Taneja, Full-Stack Software Engineer with 5 years of experience specializing in C#, .NET 8, ASP.NET Core Web API, Angular 18, React, SQL Server, and cloud architecture.",
    keywords: [
      "Gautam Taneja",
      "Senior Software Engineer",
      "Full-Stack Developer",
      ".NET 8",
      "C#",
      "ASP.NET Core Web API",
      "Angular 18",
      "React",
      "TypeScript",
      "Dapper",
      "Entity Framework Core",
      "SQL Server",
      "Azure",
      "Docker",
      "Azure DevOps",
      "India",
    ],
    author: "Gautam Taneja",
    twitterHandle: "@gautamtaneja",
  },
};
