/* Experience data. Single source of truth for the timeline and the detail modal.
   `brand` is a CSS custom property name used for the accent color.
   `points` may contain simple inline HTML (strong, em). */

export type Scope = 'industry' | 'research' | 'leadership'

export interface Metric {
  v: string
  l: string
}

export interface Experience {
  role: string
  company: string
  type: string
  date: string
  location?: string
  scope: Scope
  brand: string
  mono: string
  tagline: string
  points: string[]
  metrics?: Metric[]
  tags: string[]
  note?: string
  current?: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'R&D Cybersecurity Consultant',
    company: 'GPTfy',
    type: 'Independent consultant',
    date: 'Present',
    scope: 'industry',
    brand: '--c-gptfy',
    mono: 'GP',
    current: true,
    tagline: '// Automated security scanning · ML exploitability triage',
    points: [
      'Building a product that probes a target from the outside, finds candidate weaknesses, and decides which ones are actually exploitable. That triage step is the machine learning core, since it cuts false positives and proves which findings are reachable instead of just counting them.',
      'Built an automated scanner pipeline that runs five open source security tools from a single target URL: <strong>sqlmap, Nuclei, ffuf, Dalfox and OWASP ZAP</strong>. Every tool writes into one shared JSON schema, and an orchestrator chains them and produces a merged report.',
      'The current run surfaces <strong>40 findings</strong> across severities on OWASP Juice Shop, which I use as an authorized local practice target, with the goal of working on real client sites later.',
      'Made a single source of truth results layer so the report and the product never drift apart.',
      'Built the product website and dashboard: a Flask backend that validates the URL, checks that the site is reachable, runs the pipeline and streams live progress, plus a front end with a 3D hero, smooth scroll, severity charts and a searchable findings table.',
      'Next up: widening scanner coverage to find more real vulnerabilities, and developing the ML triage model that ranks how exploitable each finding is.',
    ],
    metrics: [
      { v: '5', l: 'security tools chained' },
      { v: '40', l: 'findings in current run' },
      { v: '1', l: 'shared JSON schema' },
    ],
    tags: ['Python', 'Flask', 'Docker', 'sqlmap', 'Nuclei', 'ffuf', 'Dalfox', 'OWASP ZAP', 'Three.js', 'GSAP', 'Chart.js'],
  },
  {
    role: "AI & Analytics Intern",
    company: "Cognizant",
    type: "Internship · Hybrid",
    date: "May 2026 – Jul 2026",
    location: "New York, NY",
    scope: "industry",
    brand: "--c-cognizant",
    mono: "CG",
    tagline: "// Agentic AI · Data Engineering · Databricks",
    points: [
      "Architected <strong>\"Aerotrace,\"</strong> a Pydantic AI multi-agent system for a cargo airline (200+ aircraft) that automates complex compliance and audit reporting.",
      "Engineered a Databricks Workspace Admin Portal (Medallion Architecture + Unity Catalog) with a daily automated ETL pipeline for live data access and workspace authorization.",
      "Built an end-to-end ingestion pipeline from AWS S3 into PostgreSQL (pgvector), with a custom retrieval tool routing across SQL, vector, and hybrid search to feed a 4-agent ecosystem (Orchestrator, Compliance, Audit, Output).",
      "Implemented advanced AI memory (Superset for global context, Subset for isolated inter-agent messaging) and shipped production MCP servers via Databricks Genie.",
    ],
    metrics: [
      { v: "3 days → 30s", l: "reporting latency" },
      { v: "$800 → <$1", l: "cost per report" },
      { v: "99%", l: "cost reduction" },
    ],
    tags: ["Pydantic AI", "Databricks", "Unity Catalog", "PostgreSQL / pgvector", "MCP", "AWS S3", "Python"],
    note: "Enterprise client engagement. Implementation details are under NDA, but I'm glad to walk through the architecture and my approach in an interview.",
  },
  {
    role: "AI Researcher / iOS Developer",
    company: "Human to Everything (H2X) Lab",
    type: "Boston University · Part-time",
    date: "Jan 2026 – May 2026",
    location: "Boston, MA",
    scope: "research",
    brand: "--c-bu",
    mono: "H2X",
    tagline: "// Vision-Language Models · Accessible Navigation",
    points: [
      "Developing a real-time, voice-guided iOS navigation app (iPhone 16 Pro) delivering autonomous spatial routing for visually impaired users via Apple &amp; Google Maps APIs.",
      "Fine-tuning and deploying a Tiny LLaVA vision-language model to process live camera feeds and generate context-aware navigational audio cues.",
      "Implementing real-time computer-vision pipelines that track pedestrians, obstacles, and walk signals, computing angle deviations to safely guide the user.",
      "Architecting a transition to hands-free spatial computing by integrating Meta Ray-Ban smart glasses via the Meta Wearables Device Access Toolkit.",
    ],
    tags: ["Tiny LLaVA", "Computer Vision", "iOS / Swift", "React.js", "Meta Wearables SDK", "AI"],
  },
  {
    role: "Research Software Engineer",
    company: "Albro Lab",
    type: "Boston University · Part-time",
    date: "Jan 2026 – May 2026",
    location: "Boston, MA",
    scope: "research",
    brand: "--c-bu",
    mono: "AL",
    tagline: "// Scientific Computing · EdTech Visualization",
    points: [
      "Built an interactive Python + Streamlit web app that translates complex tissue-engineering concepts into accessible visualizations for high-school students.",
      "Programmed dynamic simulations with NumPy &amp; Matplotlib to model how diffusivity, partition coefficients, and tissue thickness affect chemical concentration over time.",
      "Developed image-analysis pipelines to calculate diffusion coefficients, streamlining data collection that traditionally required manual lab techniques.",
      "Acted as the technical bridge between laboratory biology and software engineering, translating scientific formulas into efficient code.",
    ],
    tags: ["Python", "Streamlit", "NumPy", "Matplotlib", "Computer Vision", "Scientific Computing"],
  },
  {
    role: "Technical AI Safety Fellow",
    company: "AI Safety & Alignment (AISA)",
    type: "Boston University · Fellowship",
    date: "Jan 2026 – Apr 2026",
    location: "Boston, MA",
    scope: "research",
    brand: "--c-bu",
    mono: "AI",
    tagline: "// Alignment · Interpretability · AI Control",
    points: [
      "Selected for an intensive technical fellowship analyzing failure modes of modern deep-learning frameworks and alignment risks in advanced AI.",
      "Investigated RLHF vulnerabilities in frontier models, including reward misspecification, deceptive alignment, and goal misgeneralization.",
      "Conducted mechanistic-interpretability research using circuit tracing, feature steering, and persona vectors to decode internal model computations.",
      "Bridged cybersecurity with AI safety across scalable oversight, adversarial robustness, red-teaming, and unlearning, then drafted technical proposals for future alignment research.",
    ],
    tags: ["RLHF", "Mechanistic Interpretability", "Adversarial Robustness", "Red-Teaming", "AI Safety"],
  },
  {
    role: "President",
    company: "BU Cybersecurity Association",
    type: "Boston University · Leadership",
    date: "Jan 2025 – May 2026",
    location: "Boston, MA",
    scope: "leadership",
    brand: "--c-bu",
    mono: "CyS",
    tagline: "// Technical Leadership · Curriculum · Outreach",
    points: [
      "Lead a team of tech associates to design and run hands-on workshops on cybersecurity fundamentals, hackathon prep, and technical resume building.",
      "Spearhead interdisciplinary hackathons and technical events in partnership with the AI Society and AI Safety &amp; Alignment (AISA) club.",
      "Source and coordinate industry experts and guest speakers to deliver talks on operational security and emerging cyber threats.",
      "Drive the club's mission by directly teaching cybersecurity concepts and fostering a collaborative, hands-on learning environment.",
    ],
    tags: ["Public Speaking", "Penetration Testing", "Threat Analysis", "Leadership", "Community"],
  },
  {
    role: "Artificial Intelligence Engineer",
    company: "Cyware",
    type: "Part-time · Remote",
    date: "Mar 2025 – Sep 2025",
    location: "Jersey City, NJ",
    scope: "industry",
    brand: "--c-cyware",
    mono: "CY",
    tagline: "// ML for Cybersecurity · Threat Detection",
    points: [
      "Built an AI platform that automatically reads API specifications to generate functional connectors across 1,000+ endpoints for Cyware's Orchestrate platform.",
      "Developed and optimized ML algorithms on large datasets, improving predictive accuracy and enhancing AI-driven cybersecurity tooling.",
      "Integrated adaptive ML models into existing tools to automate and improve real-time threat detection and response.",
      "Ran regular model evaluations and cross-functional deployments, refining models for continual performance and scalability.",
    ],
    metrics: [
      { v: "1,000+", l: "endpoints automated" },
    ],
    tags: ["Machine Learning", "Generative AI", "NLP", "JavaScript", "BitBucket", "Threat Detection"],
  },
  {
    role: "Cyber Security Engineer Intern",
    company: "1Kosmos",
    type: "Internship · Remote",
    date: "Aug 2024 – Nov 2024",
    location: "Iselin, NJ",
    scope: "industry",
    brand: "--c-1kosmos",
    mono: "1K",
    tagline: "// Zero-Trust · Decentralized Identity · MFA",
    points: [
      "Worked hands-on with the BlockID app across biometric authentication, decentralized identity, and blockchain integration in cybersecurity.",
      "Developed secure websites with multi-factor authentication, ensuring data protection and strengthening platform security.",
      "Researched AI/ML integration in cybersecurity, focusing on the intersection of machine learning and modern identity management.",
      "Contributed to blockchain-enabled security solutions and prepared for IDPro certification.",
    ],
    metrics: [
      { v: "40%", l: "faster user verification" },
    ],
    tags: ["Zero-Trust", "IAM / MFA", "Decentralized Identity", "Blockchain", "React.js", "BitBucket"],
  },
  {
    role: "Software Developer",
    company: "Bahwan CyberTek",
    type: "Hybrid",
    date: "May 2024 – Aug 2024",
    location: "Boston, MA",
    scope: "industry",
    brand: "--c-bahwan",
    mono: "BCT",
    tagline: "// Enterprise Full-Stack · Java / Spring Boot",
    points: [
      "Collaborated with agile teams to build and deploy Java full-stack components for a web portal managing 1,500+ projects.",
      "Designed front-end features with HTML, CSS, and JavaScript, improving user experience and functionality.",
      "Developed RESTful APIs with Java &amp; Spring Boot for complex filtering, boosting system performance and usability.",
      "Optimized PostgreSQL queries over large datasets and managed version control and releases with Git.",
    ],
    metrics: [
      { v: "25%", l: "faster API response" },
      { v: "20%", l: "faster feature delivery" },
    ],
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "REST APIs", "Agile"],
  },
  {
    role: "Application Developer",
    company: "Eufinity",
    type: "Part-time · Hybrid",
    date: "May 2023 – Sep 2023",
    location: "Iselin, NJ",
    scope: "industry",
    brand: "--c-eufinity",
    mono: "EU",
    tagline: "// Secure Full-Stack · ML Microservices",
    points: [
      "Architected a secure full-stack app with React &amp; Node.js, implementing JWT authentication for user data protection.",
      "Developed a Python microservice (Flask / Scikit-learn) providing personalized insights from user journals over a RESTful API.",
    ],
    tags: ["React.js", "Node.js", "Flask", "Scikit-learn", "JWT", "HTML"],
  },
]
