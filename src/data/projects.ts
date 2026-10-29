/* Project data. `body` is trusted inline HTML written by me, rendered in the case study modal. */

export interface Project {
  id: string
  title: string
  category: string
  tag: 'ai' | 'ml' | 'robotics' | 'security'
  glyph: string
  date: string
  featured?: boolean
  brand: string
  image?: string
  short: string
  tags: string[]
  links: { demo?: string; github?: string; video?: string; devpost?: string; site?: string }
  /** Extra labelled links shown in the case study. */
  more?: { label: string; url: string }[]
  note?: string
  body: string
  skills: string[]
  stats?: { v: string; l: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'engram-assist',
    title: 'ENGRAM Assist',
    category: 'Robotics · Voice AI · Healthcare',
    tag: 'robotics',
    glyph: '◉',
    date: 'Oct 2026',
    featured: true,
    brand: '--c-engram',
    short:
      'A small helper robot for people who cannot get up or cannot speak. The person controls it with their voice or with hand signs, and it drives over, picks up a light object like a pill bottle with its claw, and brings it back. Built overnight at the DS+X hackathon at Boston University.',
    tags: ['Raspberry Pi 5', 'whisper.cpp', 'FastAPI', 'React', 'MediaPipe', 'Three.js'],
    links: {
      github: 'https://github.com/bharaths27/ENGRAM_Cortex_DSx',
      video: 'https://www.youtube.com/watch?v=zW1QlkF0uXs',
      devpost: 'https://devpost.com/software/engram-assist',
    },
    stats: [
      { v: '396', l: 'passing tests' },
      { v: '~6 cm', l: 'ultrasonic stop' },
      { v: '1:34', l: 'demo video' },
    ],
    body: `
      <p><strong>ENGRAM Assist</strong> is a small helper robot for people who cannot get up or cannot speak. The person controls it with their voice or with hand signs, and it drives over, picks up a light object like a pill bottle with its claw, and brings it back.</p>
      <p class="m-meta">DS+X (CollegeHack) at Boston University · overnight, Oct 24 to 25, 2026 · Health+BiotechHack (Healthcare track) · I was the team lead.</p>
      <h3>The problem</h3>
      <p>About 1 in 8 US adults has a mobility disability (<a href="https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html" target="_blank" rel="noopener">CDC</a>). After a fall or a stroke, the water, the phone and the pills can be across the room, and some people cannot speak to ask for help. Most smart helpers need you to talk or tap a phone. We wanted a helper that works with whatever the person still has: a voice, or just a hand.</p>
      <h3>What it does</h3>
      <ul>
        <li><strong>Voice control on the robot.</strong> A voice loop on the Raspberry Pi 5 listens through a Logitech C920 mic, turns speech into text with whisper.cpp, and matches it to one command from a fixed safe list, like "move forward 30 centimeters", "open the claw" or "stop". Anything else gets "Sorry, I don't know how to do that".</li>
        <li><strong>Hand sign control.</strong> A web page watches the person's hand through a laptop camera with MediaPipe Hands and turns each sign into a robot move (built by Verna).</li>
        <li><strong>Pick up and put down.</strong> "Pick it up" runs saved arm poses (open claw, reach, close, carry) and "put it down" reverses it. Confirmed working on the real arm.</li>
        <li><strong>Live view.</strong> A laptop viewer shows both robot cameras plus an audio panel with what the robot heard, so the user always knows why it moved.</li>
        <li><strong>Safety.</strong> Every move is bounded in distance and speed. The front ultrasonic sensor slows the robot near an object and stops it about 6 cm away. Saying "stop" locks the robot until a helper resets it, reversing is capped at 20 cm, and every command is signed with a shared secret.</li>
      </ul>
      <h3>How it fits together</h3>
      <p>Hand signs or voice → React web page → ENGRAM brain API (Python, FastAPI, signs each command) → robot server on the Pi 5 (checks limits, ultrasonic stop and emergency stop, then drives the motors, arm, claw and camera). The Pi voice loop talks to the robot server directly. ENGRAM Assist is built on ENGRAM Cortex, the memory brain our team made the day before at Hackachusetts.</p>
      <h3>What I built</h3>
      <ul>
        <li>Built and deployed the voice loop on the real robot: C920 mic, whisper.cpp, the fixed command list, and voice "pick it up" and "put it down" that run the saved arm poses. I was the only person who deployed code to the robot.</li>
        <li>Found why the robot rejected every voice command: the voice loop and the robot server used different signing secrets. Fixed it by loading the same secret file for both.</li>
        <li>Fixed the C920 video freezing when its mic was in use (both share one USB link) by compressing the video to 640x360 at 15 fps, and made one script that runs camera and voice together.</li>
        <li>Added a second camera server and a live web viewer with both cameras and an audio status panel.</li>
        <li>Tuned the ultrasonic safety so the robot slows near objects instead of stopping far away, with a filter that ignores single bad sonar readings.</li>
        <li>Merged everyone's branches into main with no conflicts, ran all tests (396 passing on the simulated robot) and wrote the final README.</li>
        <li>Directed, acted in and produced the demo video, and made the pitch, slides and Devpost entry.</li>
      </ul>
      <h3>Team</h3>
      <p>Me (team lead, voice, brain, integration), Verna Lin (hand sign control and web page), Brian Quijada Pleitez (robot hardware, arm poses, robot server, hotspot), and our mentor Carther Theogene, who owns the Hiwonder MasterPi robot.</p>
      <h3>What we learned</h3>
      <p>Hardware takes longer than code. A safe robot is mostly about what it refuses to do. Small details like USB bandwidth can break a demo.</p>
      <h3>Honest limits</h3>
      <p class="note">It is not fully offline: the web page loads the MediaPipe model from Google, browser speech uses an online service, and the voice parser can call Gemini. Only the Pi voice loop runs on the Pi itself. It picks up light objects only, the arm poses were taught by hand for one setup, and it was tested on a table and floor at the event, not in a real home or with patients. Next steps are testing with patients and occupational therapists, a rear sensor, a speaker, and fairness testing across accents, skin tones and lighting.</p>
    `,
    skills: ['Python', 'FastAPI', 'Raspberry Pi OS', 'whisper.cpp', 'OpenCV', 'MJPEG streaming', 'Signed HTTP', 'SSH tunnels', 'pytest', 'React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Three Fiber', 'MediaPipe Hands', 'Vitest', 'ffmpeg'],
  },
  {
    id: 'boundline',
    title: 'Boundline',
    category: 'Security business · AI agents · MCP',
    tag: 'security',
    glyph: '⟂',
    date: 'Oct 2026',
    featured: true,
    brand: '--c-boundline',
    short:
      'Boundline is my security review business for AI agents and MCP servers. I designed, built and launched the website, the products and the outreach system myself.',
    tags: ['Astro', 'React', 'TypeScript', 'React Three Fiber', 'GSAP', 'Stripe', 'Cloudflare Pages'],
    links: {
      site: 'https://boundline.dev',
    },
    note: 'The code is in a private GitHub repo. I can walk through it on request.',
    more: [
      { label: 'Field note: Twelve checks before you ship an MCP server', url: 'https://boundline.dev/notes/mcp-server-security-checks/' },
      { label: 'Templates and the MCP server checklist', url: 'https://boundline.dev/templates/' },
      { label: 'Book a call', url: 'https://cal.com/boundline/intro' },
    ],
    stats: [
      { v: '40', l: 'check MCP checklist' },
      { v: '4 step', l: 'scroll story' },
      { v: 'Live', l: 'site, booking, product' },
    ],
    body: `
      <p><strong>Boundline</strong> is a small business I started in October 2026. It does security reviews for startups that build AI agents and MCP servers. Those startups often get asked hard security questions by their buyers, so Boundline reviews how their agent handles tool permissions, untrusted input, tool definitions, authentication, secrets and third party servers, then gives them a written report and fixes.</p>
      <h3>What I built</h3>
      <ul>
        <li><strong>The business itself.</strong> I wrote the offers, the scope of a review, the pricing, the terms and the privacy policy.</li>
        <li><strong>The website, boundline.dev.</strong> Astro with React islands, TypeScript, Tailwind CSS v4, GSAP and Lenis for motion, and React Three Fiber for the 3D scene. Hosted on Cloudflare Pages. Every push to main deploys on its own, and every branch gets its own preview link.</li>
        <li><strong>A scroll story called "How one message crosses the line".</strong> It walks through a real attack pattern in four steps: an untrusted ticket lands in an issue tracker, the agent reads it, the agent tries to send data out by email, and an approval gate stops it. Each colour on the site has one meaning: amber for untrusted input, crimson for crossing the boundary, and jade for contained or approved.</li>
        <li><strong>A site that works for everyone.</strong> It works with reduced motion, without JavaScript and without WebGL, where a 2D diagram takes over. It keeps WCAG AA contrast and has no sideways scrolling from 360px to 1920px wide.</li>
        <li><strong>Security on my own site.</strong> A strict content security policy only allows scripts, styles and fonts from the site itself, with no inline code at all. I wrote a build check that fails the build if anything would break this policy.</li>
        <li><strong>Products.</strong> A 40 check MCP server security checklist, sold for $15 through Stripe, with a download page after payment. A field note called "Twelve checks before you ship an MCP server".</li>
        <li><strong>Email and domain setup.</strong> Google Workspace on my own domain, with SPF, DKIM and a strict DMARC policy.</li>
        <li><strong>An outreach system.</strong> A scheduled task finds startups that just launched or raised money, finds an address they published themselves, and saves a short personal email as a draft. It sends at most 5 emails a day, never guesses an address, honors every opt out, and stops sending if emails start to bounce.</li>
      </ul>
      <h3>Status</h3>
      <p>Launched in October 2026. The website, booking and the first paid product are live.</p>
    `,
    skills: ['AI agent security', 'MCP security', 'Threat modeling', 'Web security headers / CSP', 'Astro', 'React', 'TypeScript', 'Tailwind CSS', 'three.js', 'GSAP', 'Accessibility', 'DNS and email security (SPF, DKIM, DMARC)', 'Stripe', 'Automation', 'Running a business'],
  },
  {
    id: "trueface",
    title: "TrueFace",
    category: "AI · Deepfake Detection · Full-Stack",
    tag: "ai",
    glyph: "◎",
    date: "Apr 2026",
    
    brand: "--violet",
    short:
      "Dual-sided mock-interview & integrity platform (HackDartmouth XI). A real-time conversational AI avatar trains candidates, while a live integrity engine detects deepfakes, latency anomalies, and bot-like reasoning for recruiters.",
    tags: ["Gemini", "HeyGen SDK", "Deepfake Detection", "Python", "MongoDB", "Full-Stack"],
    links: {
      github: "https://github.com/bharaths27/HackDartmouthXI",
      video: "https://www.youtube.com/watch?v=oRwWkHM_534",
      devpost: "https://devpost.com/software/trueface",
    },
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
    id: 'engram-cortex',
    title: 'ENGRAM Cortex',
    category: 'Robotics · AI Memory',
    tag: 'robotics',
    glyph: '⌬',
    date: 'Oct 2026',
    brand: '--c-engram',
    short:
      'A memory brain for a helper robot, built at the Hackachusetts hackathon (Robotics track). Teach it a rule, plan a task, a person approves, and repeated tasks are saved as skills. It became the base for ENGRAM Assist the next day.',
    tags: ['Python', 'Robotics', 'AI Memory', 'Human in the loop'],
    links: {
      github: 'https://github.com/bharaths27/VAYLT_Hackathon',
    },
    body: `
      <p><strong>ENGRAM Cortex</strong> is a memory brain for the same Hiwonder MasterPi robot, built at the <strong>Hackachusetts</strong> hackathon (Robotics track) on Oct 24, 2026.</p>
      <ul>
        <li>Teach the robot a rule.</li>
        <li>Plan a task, and a person approves the plan before the robot acts.</li>
        <li>Tasks that repeat are saved as skills so they can be reused.</li>
      </ul>
      <p>The next day our team built ENGRAM Assist on top of it at DS+X. Both projects grew out of VAYLT, my Boston University EC 463 Senior Design project, a private home hub for files.</p>
    `,
    skills: ['Python', 'Robotics', 'Task Planning', 'Human in the loop'],
  },
  {
    id: "smart-contract-auditor",
    title: "AI Smart Contract Auditor",
    category: "AI · Cybersecurity",
    tag: "ai",
    glyph: "</>",
    date: "Oct 2025",
    brand: "--cyan",
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
]
