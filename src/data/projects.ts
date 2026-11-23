/* Project data. `body` is trusted inline HTML written by me, rendered in the case study modal. */

export interface Project {
  id: string
  title: string
  category: string
  tag: 'ai' | 'ml' | 'robotics' | 'security'
  glyph: string
  date: string
  /** Which row it shows in: my business, hackathon winners, or other projects. */
  group: 'business' | 'winner' | 'other'
  /** Hackathon and prizes, shown on winner cards. */
  award?: { event: string; prizes: string[] }
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
    id: 'boundline',
    title: 'Boundline',
    category: 'My business · AI agent security · MCP',
    tag: 'security',
    glyph: '⟂',
    date: 'Oct 2026',
    group: 'business',
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
    id: 'trueface',
    title: 'TrueFace',
    category: 'AI · Deepfake Detection · Full Stack',
    tag: 'ai',
    group: 'winner',
    award: { event: 'HackDartmouth XI', prizes: ['Winner'] },
    glyph: '◎',
    date: 'Apr 2026',
    brand: '--violet',
    short:
      'A practice interview app with two sides. Candidates practice with a live AI avatar, and recruiters get a live integrity check that looks for deepfakes, odd delays and answers that sound scripted.',
    tags: ['Gemini', 'HeyGen SDK', 'Deepfake Detection', 'Python', 'MongoDB', 'Full Stack'],
    links: {
      github: 'https://github.com/bharaths27/HackDartmouthXI',
      video: 'https://www.youtube.com/watch?v=oRwWkHM_534',
      devpost: 'https://devpost.com/software/trueface',
    },
    body: `
      <p><strong>TrueFace</strong> is a practice interview and integrity platform we built at <strong>HackDartmouth XI</strong>, where it won. It has two sides: one helps candidates get ready for real interviews, and the other helps recruiters protect their hiring.</p>
      <h3>For the candidate: a place to practice</h3>
      <ul>
        <li><strong>Live AI avatar:</strong> a realistic, fast conversational partner powered by <strong>Gemini</strong> and <strong>HeyGen</strong> that feels like a real face to face interview.</li>
        <li><strong>Live speech feedback:</strong> a dashboard in the browser reads the transcript as you talk and flags filler words ("um", "like", "uh") the moment you say them.</li>
        <li><strong>Review dashboard:</strong> save, watch and delete your recorded answers next to the exact question you were asked, so you can study your body language and delivery.</li>
      </ul>
      <h3>For the recruiter: an integrity check</h3>
      <ul>
        <li><strong>Live deepfake detection:</strong> watches the candidate's video stream for fake faces and overlays.</li>
        <li><strong>Voice and delay tracking:</strong> looks for unusual delays and audio problems that can mean someone is using an outside AI tool.</li>
        <li><strong>Reasoning check:</strong> a Speech Analyzer and a Gemini Analyzer compare live answers to normal human answers to catch ones that sound too perfect or scripted.</li>
        <li><strong>One risk score:</strong> combines the deepfake, delay, voice and reasoning signals into one live score, so a recruiter knows right away if a session looks wrong.</li>
      </ul>
    `,
    skills: ['Gemini', 'HeyGen SDK', 'Anthropic Claude', 'Deepfake Detection', 'Computer Vision', 'Speech Analytics', 'MongoDB', 'Full Stack', 'Real Time Systems'],
  },
  {
    id: 'clarity',
    title: 'Clarity',
    category: 'Hardware · IoT · Sustainability',
    tag: 'robotics',
    group: 'winner',
    award: { event: 'HackPrinceton Fall 2026', prizes: ['Winner, MLH Best Use of Tiger Data'] },
    glyph: '◍',
    date: 'Nov 2026',
    brand: '--cyan',
    short:
      'A water tester you pour into. The tank reads dissolved solids and clarity, then tips the cup into the filter that fixes the problem. Readings go over a direct radio link to a Raspberry Pi base station with an AI agent and a 3D map of Princeton.',
    tags: ['Arduino', 'ESP32', 'ESP-NOW', 'Raspberry Pi', 'Tiger Data', 'Gemini'],
    links: {
      github: 'https://github.com/thejustjim/hackPrincetonFall26',
      site: 'https://wateramong.us',
      video: 'https://www.youtube.com/watch?v=Ud5rvpX2Ixw',
    },
    more: [{ label: 'My hardware docs, diagrams and Arduino code', url: 'https://github.com/thejustjim/hackPrincetonFall26/tree/bharath/clarity-hardware/hardware' }],
    stats: [
      { v: 'Winner', l: 'MLH Best Use of Tiger Data' },
      { v: '36h', l: 'HackPrinceton Fall 2026' },
    ],
    body: `
      <p><strong>Clarity</strong> is a water tester that also fixes the water. My team built it in 36 hours at <strong>HackPrinceton Fall 2026</strong>, and it won <strong>MLH Best Use of Tiger Data</strong>. I led the hardware with Ethan Yung.</p>
      <h3>Why I cared</h3>
      <p>Growing up in India, I had skin irritation from impure water for years and thought it was normal. When I moved abroad it went away. That stuck with me.</p>
      <h3>The problem</h3>
      <p>Public water data is thin. The stream next to Princeton was last sampled for dissolved solids in 2023, and the utility tests its system, not your glass. People buy home filters without knowing what their water needs.</p>
      <h3>How it works</h3>
      <ul>
        <li>You pour one cup of water into the test cup. A TDS probe and a light sensor read it, and the result shows on an LCD.</li>
        <li>High dissolved solids (over 300 ppm): the cup tips left into a PUR Plus filter. Cloudy water: it tips right into a Brita. Water in range stays upright.</li>
        <li>Clear cut readings are decided right away by the Arduino. Close calls go to the base station, where an AI model (Gemini) picks the filter and explains why. If it does not answer in 8 seconds, the tank uses its own rule, so it still works with no internet.</li>
        <li>You pour the filtered water back in to retest, so every pour has a before and an after.</li>
      </ul>
      <h3>What I built</h3>
      <ul>
        <li><strong>The tank:</strong> Arduino Uno with the TDS sensor, an LDR clarity sensor, a 1602 LCD and a 360 degree servo that tips the cup, with a 1000 µF capacitor so the servo does not brown out the board.</li>
        <li><strong>The firmware:</strong> sensing, the decision rule, the timed tip and return, and serial commands for calibration.</li>
        <li><strong>The radio:</strong> an ESP32 on the tank talks to an ESP32 at the base station over ESP-NOW, with no Wi-Fi or cell. A resistor divider brings the Uno's 5 V serial down to 3.3 V. The dashboard can start a test over the same link.</li>
        <li><strong>The base station:</strong> a Raspberry Pi 4B with the receiver on USB.</li>
        <li><strong>CAD:</strong> a printed ring sized to hold the PUR Plus filter.</li>
      </ul>
      <h3>What my teammates built</h3>
      <p>Jimin Bang and Verna Lin built the software: a Python gateway with anomaly checks, the Gemini decision agent, a team of LangChain Deep Agents that looks into the unclear cases, every reading synced to Tiger Data (TimescaleDB) with hourly and daily trends, an iMessage agent through Photon where residents can ask questions or send water photos, and a live 3D map of Princeton readings next to about 14,000 USGS monitoring sites.</p>
      <p>During the event we also walked around campus collecting real water samples to test.</p>
      <h3>What went wrong and what we changed</h3>
      <ul>
        <li>The LoRa radio needed soldering we could not do in time, so we switched to ESP-NOW between two ESP32 boards.</li>
        <li>The pH probe drifted with no buffer solutions to calibrate it, so this build estimates pH from dissolved solids and says so everywhere.</li>
        <li>Our 3D printer broke in the middle of the event, so we swapped the ZeroWater filter for a PUR Plus and printed a ring to hold it.</li>
        <li>Hardware humbles you. One voltage drop from the servo was enough to throw off our sensor readings until a 1000 µF capacitor fixed it.</li>
        <li>We cut the RGB LED, the button and the stop switches to keep the build reliable. Tests start from the dashboard instead.</li>
      </ul>
      <h3>Honest limits</h3>
      <p class="note">Clarity reads dissolved solids and clarity. pH is estimated from dissolved solids, not measured. It does not test for lead or bacteria, and it never calls water safe, only "in range". There is one real tank; the other map nodes are simulated and labelled.</p>
    `,
    skills: ['Arduino', 'C++', 'ESP32', 'ESP-NOW', 'Raspberry Pi', 'Sensors', 'Servo control', 'Circuit design', 'CAD', 'Python', 'FastAPI', 'TimescaleDB', 'Gemini', 'LangChain'],
  },
  {
    id: 'outbound',
    title: 'Outbound',
    category: 'Full Stack · AI Agents · Solana',
    tag: 'ai',
    group: 'winner',
    award: { event: 'BostonHacks 2026', prizes: ['1st place, Bos(tons) of Eats & Streets track', 'Winner, MLH Best Use of Solana'] },
    glyph: '⇢',
    date: 'Nov 2026',
    brand: '--green',
    short:
      'A multiplayer game on Boston’s T. Students ride to quests on a live 3D map with every train in real time, plan trips from a photo with AI agents, fill a neighborhood passport, and turn XP into a Solana token they spend on coupons.',
    tags: ['Next.js', 'Supabase', 'TimescaleDB', 'Mastra', 'Gemini', 'Solana'],
    links: {
      github: 'https://github.com/bharaths27/outbound',
      demo: 'https://outboundwith.us',
    },
    stats: [
      { v: '1st', l: 'Eats & Streets track' },
      { v: '349', l: 'automated tests' },
      { v: '24h', l: 'BostonHacks 2026' },
    ],
    body: `
      <p><strong>Outbound</strong> gives Boston students a reason to get off at an unfamiliar T stop, and someone from another school to go with. My team of four built it in 24 hours at <strong>BostonHacks 2026</strong> at Boston University. It won <strong>1st place in the Bos(tons) of Eats &amp; Streets track</strong> and <strong>MLH Best Use of Solana</strong>.</p>
      <p class="m-meta">Nov 21 to 22, 2026 · I was the backend and infrastructure lead.</p>
      <h3>The problem</h3>
      <p>Give a Boston student 45 minutes between classes and the hardest question is "where can I go that is worth the trip?" The café is saved on TikTok, the event is on a university calendar, and which train to take is another search. Boston has more than 30 colleges, yet students spend four years in the same neighborhood with people from their own school.</p>
      <h3>What it does</h3>
      <ul>
        <li><strong>Live 3D map of Boston:</strong> real 3D buildings and every Red, Orange, Green and Blue Line train drawn live on the real track. If the live feed fails, it replays recorded trains and says so.</li>
        <li><strong>Explore by craving, budget, time and T line:</strong> filters for open now, free food and how much time you have, plus a search box where "cheap dumplings 40 min" turns into filters.</li>
        <li><strong>Directions:</strong> our own MBTA route planner with up to 4 T options, each with minutes, fare, transfers and steps.</li>
        <li><strong>Outbound Guide:</strong> drop a photo of food or a place, or ask a question, and a chain of AI agents finds the spot and plans the ride.</li>
        <li><strong>The game:</strong> check in when you arrive (checked by location in the database), earn XP, fill a Boston Passport with neighborhood stamps, keep streaks, and push your school up a weekly leaderboard. A trip with a friend from another school earns double XP.</li>
        <li><strong>Rewards:</strong> XP turns into OUT, a Solana token, that you spend on sample coupons.</li>
        <li><strong>Host an event:</strong> any student or club can post an event that shows up as a pin on everyone's map.</li>
      </ul>
      <h3>What I built</h3>
      <ul>
        <li><strong>Database and game rules:</strong> the Supabase Postgres schema, migrations and row level security. All scoring lives in Postgres functions: <code>check_in()</code> checks you are within 75 m, allows one check in per quest per day and applies the XP bonuses, so XP cannot be faked from the app.</li>
        <li><strong>Live train data:</strong> a Python tracker on a Vultr server polls the MBTA API every 15 seconds into Tiger Data (TimescaleDB) hypertables. Continuous aggregates compare each line's delay now with its normal delay for that hour, like "Orange Line +6 min".</li>
        <li><strong>The AI Guide:</strong> Mastra workflows where Grok looks at the photo, a Photo Decider agent picks food or place, a Food Researcher or Trip Planner agent uses live train tools, and Gemini writes one answer card. Every stage streams to the screen. If Gemini fails, it falls back to Gemini Lite, then Grok, then a keyword matcher. Every quest a model suggests is checked against the database first.</li>
        <li><strong>Route planner:</strong> a graph built from MassGIS track data and every MBTA station, with transfer penalties and Dijkstra's algorithm, so directions work with no Google key.</li>
        <li><strong>Solana rewards:</strong> OUT is an SPL Token-2022 token, 1 XP = 1 OUT. Claiming mints your balance to your Phantom wallet. To redeem, you sign a transfer in Phantom, and the server checks the mint, sender, treasury, amount, memo and that the signature was not used before, then gives you a coupon code.</li>
        <li><strong>Deploy and integration:</strong> Vercel with the outboundwith.us domain, and I owned the branch that merged all four people's work (map, screens, game logic, AI and wallet) into one app.</li>
        <li><strong>Security fixes during the event:</strong> views that skipped row level security and leaked hidden players' stamps, players being able to edit their own XP, and QR codes readable through the public API. All three are fixed.</li>
      </ul>
      <h3>Team</h3>
      <p>Me (backend, data, AI, blockchain, infrastructure, integration), Verna Lin (3D map, frontend, design), Siqi "Suki" Li (content, game design, survey, Mastra photo trip flow, Devpost, pitch) and Angie Che (app screens).</p>
      <h3>What I learned</h3>
      <p>A useful recommendation starts with a limit, like "$15 and 45 minutes". The reward shapes the game, so XP had to be locked down before it could become a token. And trust comes from details users rarely see.</p>
      <h3>Honest limits</h3>
      <p class="note">OUT is a test token on Solana devnet with no money value, and the coupons are samples. Leaderboard players marked "(sim)" are simulated from our student survey, and place reviews and friends on the map are sample data, all labelled in the app. The train tracker server was set to shut down after judging, so live delay history may now show the replay fallback.</p>
    `,
    skills: ['TypeScript', 'Python', 'SQL', 'PL/pgSQL', 'Next.js', 'React', 'PostgreSQL', 'Supabase', 'TimescaleDB', 'Mastra', 'Gemini API', 'xAI Grok', 'LLM agents', 'Solana', 'SPL Token-2022', 'Vercel', 'Vultr', 'Graph algorithms', 'Geospatial data', 'Row level security', 'Vitest'],
  },
  {
    id: 'engram-assist',
    title: 'ENGRAM Assist',
    category: 'Robotics · Voice AI · Healthcare',
    tag: 'robotics',
    glyph: '◉',
    date: 'Oct 2026',
    group: 'other',
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
    id: 'aerotrace',
    title: 'AeroTrace',
    category: 'Multi Agent AI · Cognizant',
    tag: 'ai',
    group: 'other',
    glyph: '✈',
    date: 'Summer 2026',
    brand: '--c-cognizant',
    short:
      'A multi agent AI app for a cargo airline that pulls aircraft compliance and audit reports in under 30 seconds instead of over three days. Built at a Cognizant intern hackathon hosted by Senior Directors.',
    tags: ['Pydantic AI', 'PostgreSQL', 'pgvector', 'Amazon S3', 'OCR', 'Python'],
    links: {},
    note: 'Built inside Cognizant, so there is no public code. I can walk through the architecture on request.',
    stats: [
      { v: '3 days → 30s', l: 'to get a report' },
      { v: '99%', l: 'lower reporting cost' },
    ],
    body: `
      <p><strong>AeroTrace</strong> is an AI app that uses several agents to fetch aircraft reports and answer questions about them. I built it with my team at a <strong>Cognizant intern hackathon</strong> hosted by Senior Directors during my internship in New York.</p>
      <h3>The problem</h3>
      <p>The client was a cargo airline with a large fleet. It spent hundreds of dollars and over three days just to get aircraft compliance and management reports. AeroTrace answers the same queries in under 30 seconds and cut the reporting cost by 99 percent, to a few cents per request.</p>
      <h3>How the data gets in</h3>
      <ul>
        <li>We tested it on synthetic data: PDF documents and images.</li>
        <li>OCR pulls the text out of the images. The pipeline then structures everything and stores it in an Amazon S3 bucket.</li>
        <li>Numbers like dates and times go down a <strong>SQL path</strong>. Text and images are turned into embeddings and stored as vectors in PostgreSQL with pgvector, the <strong>vector path</strong>.</li>
        <li>When a question needs both, the first agent picks a <strong>hybrid path</strong> that uses SQL and vector search together.</li>
      </ul>
      <h3>The agents</h3>
      <ul>
        <li><strong>Chat interface:</strong> shows the conversation next to live numbers for the cost and processing time of each request.</li>
        <li><strong>Orchestrate Agent:</strong> the planner. It reads the question, decides which agents and tools to run, collects what they return and passes it on.</li>
        <li><strong>Audit Agent and Compliance Agent:</strong> pull out the details about aircraft regulations and audits, using report tools that fetch the exact data they ask for.</li>
        <li><strong>Output Agent:</strong> takes everything gathered and writes the final answer for the user.</li>
      </ul>
      <h3>Memory</h3>
      <ul>
        <li><strong>Superset memory</strong> carries the user's exact question through the whole pipeline, from the Orchestrate Agent to the Output Agent.</li>
        <li><strong>Subset memory</strong> is a local channel that lets the Audit Agent and Compliance Agent talk to each other to double check report details.</li>
      </ul>
      <h3>Built with</h3>
      <p>Pydantic AI for the agents, PostgreSQL with pgvector, Amazon S3, and OCR. We used GitHub Copilot and Claude while building it.</p>
    `,
    skills: ['Pydantic AI', 'Multi agent systems', 'RAG', 'PostgreSQL', 'pgvector', 'Amazon S3', 'OCR', 'Python'],
  },
  {
    id: 'courtside-inference',
    title: 'Courtside Inference',
    category: 'Machine Learning · Sports Analytics',
    tag: 'ml',
    group: 'other',
    glyph: '🏀',
    date: 'Jan 2026',
    brand: '--amber',
    short:
      'A prediction model that works out win chances and forecasts results for live NBA games, using past game data.',
    tags: ['Python', 'Machine Learning', 'Data Analytics', 'Pandas'],
    links: {},
    note: 'Code available on request.',
    body: `
      <p>A prediction platform that works out win chances and forecasts results for live NBA games.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Built a prediction model on past NBA datasets to estimate live win chances and forecast game results.</li>
        <li>Cleaned and analyzed large sets of past sports data to support the analysis and the model.</li>
      </ul>
    `,
    skills: ['Python', 'Machine Learning', 'Data Analytics', 'Pandas', 'Feature Engineering'],
  },
  {
    id: 'smart-contract-auditor',
    title: 'AI Smart Contract Auditor',
    category: 'AI · Cybersecurity',
    tag: 'ai',
    group: 'other',
    glyph: '</>',
    date: 'Oct 2025',
    brand: '--cyan',
    short:
      'A full stack tool that runs a private LLM (Code Llama) on your own machine to check Solidity smart contracts for security bugs like reentrancy and integer overflow.',
    tags: ['Next.js', 'FastAPI', 'Ollama', 'Prompt Engineering', 'Solidity'],
    links: {
      github: 'https://github.com/bharaths27/Smart-Contract-Auditor',
      video: 'https://www.loom.com/share/eed49925cad24144944da4758cda6ec7',
    },
    body: `
      <p>A full stack app that uses a private Large Language Model (<strong>Code Llama</strong>) running on your own machine to do security audits of Solidity smart contracts. It comes with a "How It Works" walkthrough and example contracts (Integer Overflow, Reentrancy) so you can test the AI's analysis right in the browser.</p>
      <p class="note">The AI runs through Ollama and Code Llama on the user's own machine, so the code being audited never leaves it. The video demo shows the full flow from start to end.</p>
      <h3>How it is built</h3>
      <p>The UI and the AI logic are kept separate:</p>
      <ul>
        <li>A <strong>React and Next.js frontend</strong> where you paste contract code and read the formatted audit results.</li>
        <li>A <strong>Python and FastAPI backend</strong> that receives the code, sends it to the model, handles CORS, and returns the analysis.</li>
        <li><strong>Ollama (Code Llama)</strong> running as its own local server, so sensitive code stays on the user's machine.</li>
      </ul>
      <h3>How the AI works: prompt engineering</h3>
      <p>The results come from careful <strong>prompt engineering</strong> and <strong>in context learning</strong>, not fine tuning. A structured prompt with several parts tells the model to act as a very careful smart contract security auditor, gives it core rules (like Checks Effects Interactions) and shows example outputs, which steers a general model toward focused, useful answers.</p>
      <h3>Problems and fixes</h3>
      <p>Running three services (React, FastAPI, Ollama) together meant fixing cross origin requests with <strong>CORS middleware</strong> that allows the frontend's address. To get consistent answers, I kept refining the prompt to be more specific, which made the results much more relevant and accurate.</p>
    `,
    skills: ['React', 'Next.js', 'Python', 'FastAPI', 'Ollama', 'Prompt Engineering', 'AI Integration', 'REST APIs', 'CORS'],
  },
]
