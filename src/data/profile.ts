/* Personal info, hero copy, skills and certifications. */

export const PROFILE = {
  name: 'Bharath Srividhya',
  first: 'Bharath',
  last: 'Srividhya',
  email: 'bharathkrishnansrividhya@gmail.com',
  github: 'https://github.com/bharaths27',
  linkedin: 'https://www.linkedin.com/in/bharaths27',
  resume: `${import.meta.env.BASE_URL}assets/Bharath_Srividhya_Resume.pdf`,
  photo: `${import.meta.env.BASE_URL}assets/profile.jpg`,
  location: 'Boston, MA',
  status: 'Open to AI & Security roles · Graduating May 2027',
  auth: 'Authorized to work in the US · no sponsorship required',
  roles: ['AI & Agentic Systems Engineer', 'Cybersecurity Engineer', 'AI Agent Security', 'ML & LLM Builder', 'Robotics Builder'],
}

export const STATS = [
  { value: 99, suffix: '%', label: 'Reporting cost cut at Cognizant', brand: '--c-cognizant' },
  { value: 8640, suffix: '×', label: 'Faster compliance reporting (3 days to 30s)', brand: '--c-cognizant' },
  { value: 1000, suffix: '+', label: 'API endpoints automated', brand: '--c-cyware' },
  { value: 396, suffix: '', label: 'Passing tests on ENGRAM Assist', brand: '--c-bu' },
]

export interface SkillGroup {
  title: string
  sub: string
  icon: string
  brand: string
  chips: string[]
}

export const SKILLS: SkillGroup[] = [
  {
    title: 'AI & Machine Learning',
    sub: 'agents · llms · ml',
    icon: '🤖',
    brand: '--c-gptfy',
    chips: ['Pydantic AI', 'Multi Agent Systems', 'MCP', 'LLMs & GenAI', 'RLHF', 'Fine Tuning', 'Tiny LLaVA / VLMs', 'Computer Vision', 'RAG & Vector Search', 'Mechanistic Interpretability', 'whisper.cpp', 'Scikit-learn', 'Pandas'],
  },
  {
    title: 'Cybersecurity',
    sub: 'appsec · iam · offsec',
    icon: '🛡️',
    brand: '--c-bu',
    chips: ['AI Agent & MCP Security', 'Threat Modeling', 'Penetration Testing', 'OWASP Top 10', 'OWASP ZAP', 'Nuclei', 'sqlmap', 'ffuf', 'Dalfox', 'Content Security Policy', 'SPF / DKIM / DMARC', 'Zero Trust', 'IAM / MFA', 'Adversarial Robustness', 'Red Teaming'],
  },
  {
    title: 'Data & Cloud',
    sub: 'pipelines · db · cloud',
    icon: '🗄️',
    brand: '--c-cognizant',
    chips: ['Databricks', 'Unity Catalog', 'Medallion Architecture', 'ETL Pipelines', 'PostgreSQL', 'pgvector', 'MongoDB', 'Pinecone', 'AWS S3', 'SQLite', 'Docker'],
  },
  {
    title: 'Languages',
    sub: 'code',
    icon: '⌨️',
    brand: '--amber',
    chips: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'C', 'SQL', 'HTML / CSS', 'MATLAB'],
  },
  {
    title: 'Frameworks & Tools',
    sub: 'full stack · tooling',
    icon: '⚙️',
    brand: '--green',
    chips: ['React', 'Next.js', 'Astro', 'Node.js', 'FastAPI', 'Flask', 'Django', 'Spring Boot', 'Tailwind CSS', 'Three.js', 'GSAP', 'Streamlit', 'Git / BitBucket', 'Linux', 'Claude Code'],
  },
  {
    title: 'Robotics & Hardware',
    sub: 'hardware · edge',
    icon: '🦾',
    brand: '--c-engram',
    chips: ['Raspberry Pi 5', 'Hiwonder MasterPi', 'Ultrasonic Sensors', 'OpenCV', 'MJPEG Streaming', 'systemd', 'SSH Tunnels', 'C++'],
  },
]

export const CERTS = [
  { icon: '🔐', name: 'Google Cybersecurity', by: 'Google' },
  { icon: '🧠', name: 'Generative AI Engineering', by: 'IBM' },
  { icon: '📊', name: 'Machine Learning with Python', by: 'IBM' },
  { icon: '🤖', name: 'AI Agent Fundamentals', by: 'Databricks' },
]

/* GPTfy pipeline stages, shown in the pinned "Now building" section. */
export const PIPELINE = [
  { k: '01', title: 'One target URL', text: 'The Flask backend validates the URL and checks that the site is reachable before anything runs.', chips: ['Flask', 'Python'] },
  { k: '02', title: 'Five scanners', text: 'An orchestrator drives five open source tools against the target, one after another.', chips: ['sqlmap', 'Nuclei', 'ffuf', 'Dalfox', 'OWASP ZAP'] },
  { k: '03', title: 'One shared schema', text: 'Every tool writes its results into the same JSON schema, so findings can be compared and merged.', chips: ['JSON schema', 'Docker'] },
  { k: '04', title: 'Merged report', text: 'A single source of truth results layer feeds both the report and the product, so they never drift apart. The current run surfaces 40 findings.', chips: ['40 findings', 'All severities'] },
  { k: '05', title: 'Live dashboard', text: 'Live progress streams to a front end with a 3D hero, smooth scroll, severity charts and a searchable findings table.', chips: ['Three.js', 'GSAP', 'Chart.js'] },
  { k: '06', title: 'Next: ML triage', text: 'The real value: a machine learning model that ranks which findings are actually exploitable, cutting false positives.', chips: ['Machine learning', 'In progress'] },
]
