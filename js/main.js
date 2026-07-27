/* =====================================================================
   Bharath Srividhya — Portfolio interactions
   Vanilla JS, no dependencies. Data lives here so the grid, timeline,
   and modals stay in sync and are easy to extend.
   ===================================================================== */

/* ---------- Experience data (single source of truth) ---------- */
/* brand -> CSS var used for the card accent, timeline dot, and logo badge.
   logo  -> domain used for a real logo (Clearbit) with a monogram fallback. */
const EXPERIENCE = [
  {
    role: "AI & Analytics Intern",
    company: "Cognizant",
    type: "Internship · Hybrid",
    date: "May 2026 – Jul 2026",
    location: "New York, NY",
    scope: "industry",
    brand: "--cat-professional",
    mono: "CG",
    logo: "cognizant.com",
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
    brand: "--cat-research",
    mono: "H2X",
    logo: "bu.edu",
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
    brand: "--cat-research",
    mono: "AL",
    logo: "bu.edu",
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
    brand: "--cat-research",
    mono: "AI",
    logo: "bu.edu",
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
    brand: "--cat-leadership",
    mono: "CyS",
    logo: "bu.edu",
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
    brand: "--cat-professional",
    mono: "CY",
    logo: "cyware.com",
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
    brand: "--cat-professional",
    mono: "1K",
    logo: "1kosmos.com",
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
    brand: "--cat-professional",
    mono: "BCT",
    logo: "bahwancybertek.com",
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
    brand: "--cat-professional",
    mono: "EU",
    logo: "eufinity.com",
    tagline: "// Secure Full-Stack · ML Microservices",
    points: [
      "Architected a secure full-stack app with React &amp; Node.js, implementing JWT authentication for user data protection.",
      "Developed a Python microservice (Flask / Scikit-learn) providing personalized insights from user journals over a RESTful API.",
    ],
    tags: ["React.js", "Node.js", "Flask", "Scikit-learn", "JWT", "HTML"],
  },
];

/* ---------- Project data ---------- */
const PROJECTS = [
  {
    id: "trueface",
    title: "TrueFace",
    category: "AI · Deepfake Detection · Full-Stack",
    tag: "ai",
    glyph: "◎",
    date: "Apr 2026",
    featured: true,
    brand: "--violet",
    image: "assets/projects/trueface.png",
    short:
      "Dual-sided mock-interview & integrity platform (HackDartmouth XI). A real-time conversational AI avatar trains candidates, while a live integrity engine detects deepfakes, latency anomalies, and bot-like reasoning for recruiters.",
    tags: ["Gemini", "HeyGen SDK", "Deepfake Detection", "Python", "MongoDB", "Full-Stack"],
    links: {
      video: "https://www.linkedin.com/in/bharaths27/details/projects/",
    },
    note: "Built at HackDartmouth XI. Full source code available on request.",
    body: `
      <p><strong>TrueFace</strong> is a comprehensive, dual-sided mock-interview and integrity-testing platform built at <strong>HackDartmouth XI</strong>, a complete suite serving both candidates preparing for the real world and recruiters protecting their hiring pipelines.</p>
      <h3>For the Interviewee, The Training Arena</h3>
      <ul>
        <li><strong>Real-Time AI Live Avatar:</strong> a hyper-realistic, low-latency conversational partner powered by <strong>Gemini</strong> and <strong>HeyGen</strong> that simulates the pressure of a real face-to-face interview.</li>
        <li><strong>Live Speech Analytics:</strong> an in-browser dashboard that intercepts raw audio transcripts to track and penalize filler words ("um," "like," "uh") the millisecond they happen.</li>
        <li><strong>Performance Review Dashboard:</strong> a full CRUD interface to save, review, and delete recorded video responses next to the exact prompt asked, so candidates can study body language and delivery.</li>
      </ul>
      <h3>For the Interviewer, The Integrity Engine</h3>
      <ul>
        <li><strong>Real-Time Deepfake Detection:</strong> active monitoring of the candidate's video stream to catch synthetic manipulation and facial overlays.</li>
        <li><strong>Voice &amp; Latency Tracking:</strong> measures unnatural latency spikes and audio anomalies that signal a third-party AI transcription/generation tool.</li>
        <li><strong>Cognitive &amp; Reasoning Evaluation:</strong> a dedicated Speech Analyzer + Gemini Analyzer measure live reasoning against human baselines to catch suspiciously perfect, scripted answers.</li>
        <li><strong>Live Risk Aggregation:</strong> consolidates deepfake probability, latency, voice anomalies, and reasoning scores into a single real-time Risk Score so recruiters know instantly if a session is compromised.</li>
      </ul>
    `,
    skills: ["Gemini", "HeyGen SDK", "Anthropic Claude", "Deepfake Detection", "Computer Vision", "Speech Analytics", "MongoDB", "Full-Stack", "Real-Time Systems"],
  },
  {
    id: "smart-contract-auditor",
    title: "AI Smart Contract Auditor",
    category: "AI · Cybersecurity",
    tag: "ai",
    glyph: "</>",
    date: "Oct 2025",
    brand: "--cyan",
    image: "assets/projects/auditor.png",
    short:
      "Full-stack tool that runs a local, private LLM (Code Llama) to security-audit Solidity smart contracts for vulnerabilities like reentrancy and integer overflow.",
    tags: ["Next.js", "FastAPI", "Ollama", "Prompt Engineering", "Solidity"],
    links: {
      github: "https://github.com/bharaths27/Smart-Contract-Auditor",
      video: "https://www.loom.com/share/eed49925cad24144944da4758cda6ec7",
    },
    body: `
      <p>A full-stack application that leverages a local, private Large Language Model (<strong>Code Llama</strong>) to perform security audits on Solidity smart contracts. It ships with a "How It Works" walkthrough and example contracts (Integer Overflow, Reentrancy) so users can test the AI's analysis directly in the browser.</p>
      <p class="note">The core AI runs Ollama + Code Llama locally to guarantee 100% privacy and control over the code being audited. The video demo shows the full flow end to end.</p>
      <h3>Technical Architecture</h3>
      <p>Decoupled design with a clean separation between the UI and the AI logic:</p>
      <ul>
        <li>A <strong>React &amp; Next.js frontend</strong> for pasting contract code and viewing formatted audit results.</li>
        <li>A <strong>Python &amp; FastAPI backend</strong> that receives code, forwards it to the model, handles CORS, and returns the analysis.</li>
        <li><strong>Ollama (Code Llama)</strong> running as a separate local server, keeping all sensitive code on the user's machine.</li>
      </ul>
      <h3>AI Implementation, Prompt Engineering</h3>
      <p>Intelligence comes from advanced <strong>prompt engineering</strong> and <strong>in-context learning</strong> rather than fine-tuning. A structured, multi-part prompt template instructs the model to act as a "world-class, meticulous smart contract security auditor," supplying core principles (e.g. Checks-Effects-Interactions) and formatting examples that steer a general model toward specialized, high-quality output.</p>
      <h3>Obstacles &amp; Solutions</h3>
      <p>Orchestrating three services (React, FastAPI, Ollama) required solving cross-origin communication via <strong>CORS middleware</strong> whitelisting the frontend origin. Output consistency was achieved by iteratively refining the prompt template to be highly specific, sharply improving relevance and accuracy.</p>
    `,
    skills: ["React", "Next.js", "Python", "FastAPI", "Ollama", "Prompt Engineering", "AI Integration", "REST APIs", "CORS"],
  },
  {
    id: "courtside-inference",
    title: "Courtside Inference",
    category: "Machine Learning · Sports Analytics",
    tag: "ml",
    glyph: "🏀",
    date: "Jan 2026",
    brand: "--amber",
    image: "assets/projects/courtside.png",
    short:
      "Data-driven prediction model that calculates win probabilities and forecasts outcomes for live NBA games from historical performance data.",
    tags: ["Python", "Machine Learning", "Data Analytics", "Pandas"],
    links: {},
    note: "Code available on request.",
    body: `
      <p>A data-driven prediction platform that calculates win probabilities and forecasts outcomes for live NBA games.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Built a prediction model over historical NBA datasets to estimate live win probabilities and forecast game outcomes.</li>
        <li>Processed and analyzed large historical sports datasets to support strategic analysis and predictive modeling.</li>
      </ul>
    `,
    skills: ["Python", "Machine Learning", "Data Analytics", "Pandas", "Feature Engineering"],
  },
  {
    id: "stock-prediction",
    title: "Stock Prediction & Analysis Tool",
    category: "AI · Machine Learning",
    tag: "ml",
    glyph: "$",
    date: "Jan 2024",
    brand: "--green",
    image: "assets/projects/stock.png",
    short:
      "Full-stack platform to analyze 50 S&P 500 companies, with historical metrics plus future price forecasts from two ML models built on engineered technical indicators.",
    tags: ["Next.js", "FastAPI", "Scikit-learn", "Pandas", "Feature Engineering"],
    links: {
      demo: "https://stock-prediction-app-delta.vercel.app/",
      github: "https://github.com/bharaths27/Stock-Prediction-App",
    },
    body: `
      <p>A full-stack application providing an interactive platform for market-data analysis. Users query historical performance for 50 popular S&amp;P 500 companies, view key financial metrics, and generate future price forecasts with one of two machine-learning models.</p>
      <h3>Technical Architecture</h3>
      <p>Decoupled architecture; 100% self-contained with no live external API calls during interaction.</p>
      <ul>
        <li><strong>React &amp; Next.js</strong> frontend (Tailwind, Shadcn/UI) with interactive Recharts visualizations.</li>
        <li><strong>Python &amp; FastAPI</strong> backend reading a pre-cached local data store for near-zero latency, plus real-time loading/inference of the ML models.</li>
      </ul>
      <h3>Machine Learning</h3>
      <p>Models were trained on a dataset built through <strong>feature engineering</strong>. Beyond raw price history, I computed technical indicators like <strong>Simple Moving Averages (SMA)</strong> and the <strong>Relative Strength Index (RSI)</strong>. Users choose between a baseline <strong>Linear Regression</strong> model and a <strong>Random Forest Regressor</strong> that captures non-linear patterns. Forecasts use an iterative technique where each day's prediction feeds the next.</p>
      <h3>Obstacles &amp; Solutions</h3>
      <p>Free financial APIs were unreliable and rate-limited, crashing the initial on-demand architecture. I re-architected to an offline approach: Python scripts pre-fetch and process data and train the models, so the deployed app is fully self-contained, fast, stable, and reliable.</p>
    `,
    skills: ["React", "Next.js", "Python", "FastAPI", "Scikit-learn", "Pandas", "Feature Engineering", "System Architecture", "Vercel/Render"],
  },
  {
    id: "gear-vision",
    title: "Gear Vision, 3D Car Optimizer",
    category: "Machine Learning · 3D",
    tag: "ml",
    glyph: "◈",
    date: "May 2024",
    brand: "--cyan",
    image: "assets/projects/gearvision.png",
    short:
      "Microservice app that renders real vehicles as interactive 3D models and simulates the performance impact of modifications via an ML-powered optimization engine.",
    tags: ["React", "Three.js", "Node.js", "Flask", "Scikit-learn"],
    links: {
      demo: "https://bharaths27.github.io/Gear_Vision_Frontend/",
      github: "https://github.com/bharaths27/Gear_Vision_Frontend",
    },
    body: `
      <p>A full-stack app demonstrating a microservice architecture for a dynamic, data-driven experience. Users select real-world vehicles, view them as interactive 3D models, and simulate how modifications affect performance using a machine-learning engine.</p>
      <h3>Technical Architecture</h3>
      <p>Decoupled microservices with a <strong>React</strong> frontend orchestrating two independent backends:</p>
      <ul>
        <li>A <strong>Node.js &amp; Express</strong> backend-for-frontend (BFF) that guards external API keys and connects to MongoDB Atlas.</li>
        <li>A <strong>Python, Flask &amp; Scikit-learn</strong> microservice serving performance predictions over a lightweight REST API.</li>
      </ul>
      <h3>Machine Learning</h3>
      <p>To deliver instant, realistic feedback without a heavy physics engine, I trained a <strong>Linear Regression</strong> model on vehicle base stats and modification gains. The optimization engine returns accurate approximations (0-60 time, horsepower) with near-zero latency via a scalable Flask API.</p>
      <h3>Obstacles &amp; Solutions</h3>
      <p>Cross-origin deployment surfaced <strong>CORS</strong> errors between the live frontend and backends, resolved with server-side CORS policies whitelisting the frontend domain. Secrets (API keys, DB credentials) were secured with <strong>environment variables</strong> on Render, keeping sensitive data out of the public repos.</p>
    `,
    skills: ["React", "Three.js", "WebGL", "Node.js", "Python", "Flask", "Scikit-learn", "REST APIs", "Secure Credentials", "CORS"],
  },
  {
    id: "floorcare-robot",
    title: "Autonomous Floorcare Robot",
    category: "Embedded · Robotics",
    tag: "embedded",
    glyph: "⬡",
    date: "May 2024",
    brand: "--c-1kosmos",
    image: "assets/projects/robot.png",
    short:
      "University project: C++ firmware for an autonomous robot with real-time obstacle avoidance and a dual-function navigation + vacuuming system.",
    tags: ["C++", "Embedded", "Sensors", "Robotics"],
    links: {},
    body: `
      <p>An autonomous multi-function floorcare robot built as a university project.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Designed and programmed <strong>C++ firmware</strong> integrating ultrasonic and IR sensors for robust, real-time obstacle avoidance.</li>
        <li>Implemented actuator control logic for differential-drive locomotion and a relay-switched fan, creating a dual-function navigation and vacuuming system.</li>
      </ul>
    `,
    skills: ["C++", "Embedded Systems", "Sensor Integration", "Control Logic", "Robotics"],
  },
];

/* ---------- Icons ---------- */
function iconGithub() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>`;
}
function iconLink() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>`;
}
function iconPlay() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
}

/* Logo badge: colored monogram + real logo layered on top (removed on error) */
function logoBadge(brand, mono, domain) {
  const img = domain
    ? `<img src="https://logo.clearbit.com/${domain}" alt="" loading="lazy" onerror="this.remove()">`
    : "";
  return `<span class="logo-badge" style="--brand:var(${brand})">${mono}${img}</span>`;
}

/* ---------- Render experience timelines (grouped into 3 categories) ----------
   Cards are condensed (top 2 bullets + metrics) and open a detail modal. */
function metricPills(metrics) {
  return (metrics || [])
    .map((m) => `<div class="metric-pill"><span class="mv">${m.v}</span><span class="ml">${m.l}</span></div>`)
    .join("");
}

function experienceItem(e) {
  const shown = e.points.slice(0, 2);
  const extra = e.points.length - shown.length;
  const item = document.createElement("div");
  item.className = "tl-item reveal";
  item.style.setProperty("--brand", `var(${e.brand})`);
  item.innerHTML = `
    <div class="tl-card" style="--brand:var(${e.brand})" tabindex="0" role="button" aria-label="${e.role} at ${e.company}, view details">
      <div class="tl-head">
        ${logoBadge(e.brand, e.mono, e.logo)}
        <div class="tl-headings">
          <div class="tl-role">${e.role}</div>
          <div class="tl-company">${e.company} <span class="tl-type">· ${e.type}</span></div>
          <div class="tl-meta">
            <span class="tl-chip-meta">${e.date}</span>
            <span class="tl-chip-meta">📍 ${e.location}</span>
          </div>
        </div>
      </div>
      <div class="tl-tagline">${e.tagline}</div>
      <ul class="tl-points">${shown.map((p) => `<li>${p}</li>`).join("")}</ul>
      ${e.metrics ? `<div class="tl-metrics">${metricPills(e.metrics)}</div>` : ""}
      <div class="tl-tags">${e.tags.slice(0, 6).map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      <div class="tl-foot"><span class="detail">Full details${extra > 0 ? ` · +${extra} more` : ""} →</span></div>
    </div>`;
  const card = item.querySelector(".tl-card");
  const open = () => openExpModal(e);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); } });
  return item;
}

function openExpModal(e) {
  const overlay = document.getElementById("modalOverlay");
  overlay.querySelector(".modal").style.setProperty("--brand", `var(${e.brand})`);
  document.getElementById("modalCat").textContent = `${e.company} · ${e.date}`;
  document.getElementById("modalTitle").textContent = e.role;
  document.getElementById("modalBody").innerHTML = `
    <p class="m-sub">${e.type} · 📍 ${e.location}</p>
    <p class="tl-tagline" style="margin:6px 0 4px">${e.tagline}</p>
    <h3>What I did</h3>
    <ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
    ${e.metrics ? `<h3>Impact</h3><div class="tl-metrics">${metricPills(e.metrics)}</div>` : ""}
    ${e.note ? `<p class="note">${e.note}</p>` : ""}
    <h3>Skills &amp; Tools</h3>
    <div class="chips">${e.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>`;
  overlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function renderExperience() {
  const groups = ["industry", "research", "leadership"];
  groups.forEach((scope) => {
    const wrap = document.getElementById(`timeline-${scope}`);
    if (!wrap) return;
    wrap.innerHTML = "";
    EXPERIENCE.filter((e) => e.scope === scope).forEach((e) => wrap.appendChild(experienceItem(e)));
  });
  observeReveals();
}

/* ---------- Render project cards ---------- */
function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  PROJECTS.filter((p) => filter === "all" || p.tag === filter).forEach((p) => {
    const links = [];
    if (p.links.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${iconLink()} Demo</a>`);
    if (p.links.github) links.push(`<a href="${p.links.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${iconGithub()} Code</a>`);
    if (p.links.video) links.push(`<a href="${p.links.video}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${iconPlay()} Video</a>`);
    const linksHtml = links.length ? links.join("") : `<span style="color:var(--text-faint);font-size:.85rem">${p.note || "Private / coursework"}</span>`;

    const card = document.createElement("article");
    card.className = "project-card reveal" + (p.featured ? " featured" : "");
    card.style.setProperty("--brand", `var(${p.brand || "--cyan"})`);
    card.setAttribute("data-id", p.id);
    card.innerHTML = `
      <div class="project-cover">
        <div class="cover-grid"></div>
        <span class="glyph">${p.glyph}</span>
        ${p.featured ? `<span class="project-ribbon">★ LATEST</span>` : ""}
        <img src="${p.image}" alt="${p.title} preview" loading="lazy"
             onerror="this.parentElement.classList.add('img-fallback'); this.remove()">
        <span class="project-badge">${p.date}</span>
      </div>
      <div class="project-body">
        <div class="p-cat">${p.category}</div>
        <h3>${p.title}</h3>
        <p class="p-desc">${p.short}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        <div class="project-foot">
          <div class="links">${linksHtml}</div>
          <span class="detail">details →</span>
        </div>
      </div>`;
    card.addEventListener("click", () => openModal(p.id));
    grid.appendChild(card);
  });
  observeReveals();
}

/* ---------- Modal ---------- */
function openModal(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  const overlay = document.getElementById("modalOverlay");
  overlay.querySelector(".modal").style.setProperty("--brand", `var(${p.brand || "--cyan"})`);
  const links = [];
  if (p.links.demo) links.push(`<a class="btn btn-primary" href="${p.links.demo}" target="_blank" rel="noopener">${iconLink()} Live Demo</a>`);
  if (p.links.github) links.push(`<a class="btn btn-ghost" href="${p.links.github}" target="_blank" rel="noopener">${iconGithub()} View Code</a>`);
  if (p.links.video) links.push(`<a class="btn btn-ghost" href="${p.links.video}" target="_blank" rel="noopener">${iconPlay()} Video Demo</a>`);

  document.getElementById("modalCat").textContent = p.category;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalBody").innerHTML = `
    ${links.length ? `<div class="m-links">${links.join("")}</div>` : ""}
    ${p.note ? `<p class="note">${p.note}</p>` : ""}
    ${p.body}
    <h3>Skills Demonstrated</h3>
    <div class="chips">${p.skills.map((s) => `<span class="chip">${s}</span>`).join("")}</div>`;
  overlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("visible");
  document.body.style.overflow = "";
}

/* ---------- Typing effect (hero role) ---------- */
function typeLoop(el, phrases) {
  let pi = 0, ci = 0, deleting = false;
  const tick = () => {
    const full = phrases[pi];
    ci += deleting ? -1 : 1;
    el.textContent = full.slice(0, ci);
    let delay = deleting ? 45 : 85;
    if (!deleting && ci === full.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(tick, delay);
  };
  tick();
}

/* ---------- Count-up stats ---------- */
function countUp(el) {
  const target = +el.getAttribute("data-count");
  const suffix = el.getAttribute("data-suffix") || "";
  const span = el.querySelector(".grad") || el;
  const dur = 1400, t0 = performance.now();
  const fmt = (n) => (n >= 1000 ? n.toLocaleString() : String(n));
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    span.textContent = fmt(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Scroll reveal + one-shot animations ---------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
  }
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
}

function initAnimatedMetrics() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.classList.contains("bar-fill")) el.style.width = el.getAttribute("data-pct") + "%";
      else if (el.hasAttribute("data-count")) countUp(el);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-count], .bar-fill").forEach((el) => io.observe(el));
}

/* ---------- Animated starfield (space vibe) ---------- */
function initStarfield() {
  // Reduced-motion users still get a night sky — just static (no drift/twinkle).
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  canvas.id = "starfield";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const PALETTE = ["255,255,255", "103,232,249", "192,132,252", "147,197,253"]; // white, cyan, violet, blue
  let w, h, stars = [], shooting = null, nextShoot = 0, t = 0;

  function build() {
    w = canvas.width = Math.floor(innerWidth * DPR);
    h = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    const count = Math.min(520, Math.round((innerWidth * innerHeight) / 2600));
    stars = Array.from({ length: count }, () => {
      const bright = Math.random() < 0.18; // ~18% are bright glowing stars
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (bright ? Math.random() * 1.6 + 1.1 : Math.random() * 1.1 + 0.45) * DPR,
        a: bright ? Math.random() * 0.35 + 0.65 : Math.random() * 0.5 + 0.4,
        tw: Math.random() * 0.02 + 0.005,
        ph: Math.random() * Math.PI * 2,
        c: PALETTE[(Math.random() * PALETTE.length) | 0],
        dy: (Math.random() * 0.06 + 0.02) * DPR, // slow downward drift
        glow: bright,
      };
    });
  }

  function frame() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.y += s.dy;
      if (s.y > h + 2) { s.y = -2; s.x = Math.random() * w; }
      const alpha = s.a * (0.55 + 0.45 * Math.sin(s.ph + t * s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.c},${alpha.toFixed(3)})`;
      if (s.glow) { ctx.shadowColor = `rgba(${s.c},${alpha.toFixed(3)})`; ctx.shadowBlur = 6 * DPR; }
      ctx.fill();
      if (s.glow) ctx.shadowBlur = 0;
    }
    // occasional shooting star
    if (!shooting && t > nextShoot) {
      shooting = {
        x: Math.random() * w * 0.7,
        y: Math.random() * h * 0.4,
        len: (Math.random() * 120 + 90) * DPR,
        vx: (Math.random() * 5 + 6) * DPR,
        vy: (Math.random() * 2 + 2) * DPR,
        life: 0,
        max: 60,
      };
    }
    if (shooting) {
      const sh = shooting;
      sh.x += sh.vx; sh.y += sh.vy; sh.life += 1;
      const p = 1 - sh.life / sh.max;
      const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.len, sh.y - sh.len * (sh.vy / sh.vx));
      grad.addColorStop(0, `rgba(255,255,255,${(0.9 * p).toFixed(3)})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 * DPR;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - sh.len, sh.y - sh.len * (sh.vy / sh.vx));
      ctx.stroke();
      if (sh.life >= sh.max || sh.x > w + 50) { shooting = null; nextShoot = t + 220 + Math.random() * 380; }
    }
    requestAnimationFrame(frame);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.c},${s.a.toFixed(3)})`;
      if (s.glow) { ctx.shadowColor = `rgba(${s.c},${s.a.toFixed(3)})`; ctx.shadowBlur = 6 * DPR; }
      ctx.fill();
      if (s.glow) ctx.shadowBlur = 0;
    }
  }

  build();
  let rt;
  if (REDUCE) {
    // static night sky, no animation loop
    drawStatic();
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); drawStatic(); }, 200); }, { passive: true });
    return;
  }
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 200); }, { passive: true });
  nextShoot = 120;
  requestAnimationFrame(frame);
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  renderExperience();
  renderProjects();
  initAnimatedMetrics();

  // Nav scroll state
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => { toggle.classList.remove("open"); links.classList.remove("open"); })
  );

  // Active section highlight (only hash links point to on-page sections;
  // the Résumé link is a PDF path and must be excluded from querySelector)
  const navAnchors = [...links.querySelectorAll("a")].filter((a) => (a.getAttribute("href") || "").startsWith("#"));
  const sections = navAnchors.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      }
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Typing effect
  const typed = document.getElementById("typed");
  if (typed) typeLoop(typed, [
    "AI & Agentic Systems Engineer",
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    "ML & LLM Builder",
  ]);

  // Modal wiring
  const overlay = document.getElementById("modalOverlay");
  document.getElementById("modalClose").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Filters (experience + projects, scoped)
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const scope = btn.getAttribute("data-scope");
      document.querySelectorAll(`.filter-btn[data-scope="${scope}"]`).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.getAttribute("data-filter");
      if (scope === "exp") renderExperience(f);
      else renderProjects(f);
    })
  );

  // Footer year
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  observeReveals();
});
