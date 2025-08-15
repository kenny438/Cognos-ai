export interface Level {
  level: string;
  emoji?: string;
  title: string;
  quote?: string;
  description?: string;
  items?: string[];
  tools?: string;
  bonus?: string;
  warning?: string;
  examples?: string[];
  isDarkZone?: boolean;
  think?: string;
}

export const intro = {
  title: "🔬 DEEP RESEARCH MODE: “EVERYTHING AN AI AGENT CAN DO” (2025 EDITION) 💻🤖",
  subtitle: "Let’s break this into GANGSTA-TIER LEVELS.",
  description: "Level 1: Dumb Little Siri.\nLevel 5: Master of the Matrix.\nWe go from helping with your calendar → running your business empire → maybe overthrowing the stock market if you ain’t careful 😈"
};

export const levelsData: Level[] = [
  {
    level: 'LEVEL 1',
    emoji: '⚙️',
    title: 'BASIC STUFF (YOUR LITTLE HELPER VIBES)',
    quote: '"This is the AI your grandma uses."',
    items: [
      'Answer questions (GPT-style)',
      'Set reminders & timers',
      'Translate languages',
      'Do math & conversions',
      'Tell you jokes (usually unfunny… unless you teach it)',
      'Voice-to-text',
      'Text summarization',
      'Spell check & grammar fixes',
      'Read emails, write replies',
    ],
    think: '📌 Think: ChatGPT, Alexa, Siri but with 2025 drip.'
  },
  {
    level: 'LEVEL 2',
    emoji: '🧠',
    title: 'PRODUCTIVITY GODMODE',
    quote: '"This AI turns you into a CEO with ADHD but now you\'re focused."',
    items: [
      'Write emails, blogs, reports',
      'Generate PowerPoint decks like a beast',
      'Summarize 100-page PDFs in seconds',
      'Research like an Ivy League intern on Adderall',
      'Manage calendar + meetings',
      'Task automation (like “if I get this email → move file → reply → slack msg someone”)',
      'Advanced Excel & spreadsheet formulas',
      'Code generation in Python, JS, C++, etc.',
    ],
    tools: '🛠️ Tools: ChatGPT, Perplexity, Claude, Notion AI, Microsoft 356 Copilot'
  },
  {
    level: 'LEVEL 3',
    emoji: '🎨',
    title: 'CREATIVE DEMON TIME',
    quote: '"Drake tryna use AI to ghostwrite now? Sit down boi."',
    items: [
      'Write songs, poems, raps, novels, screenplays',
      'Create beats, remixes, or entire albums (see: Suno, Udio)',
      'AI art from prompts (Midjourney, DALL·E)',
      'Video generation (Sora, RunwayML)',
      'Meme & parody creation',
      'Game asset generation',
      'Animate characters from text/audio',
    ],
    bonus: '🔥 BONUS: Deepfakes, voice clones, AI rappers (like FN Meka who got cancelled lol)'
  },
  {
    level: 'LEVEL 4',
    emoji: '👨‍💻',
    title: 'DEVELOPER / HACKER LEVEL SH*T',
    quote: '"This is where AI stops being a tool and becomes a sidekick."',
    items: [
      'Auto-code entire web apps, games, or mobile apps',
      'Find bugs, optimize code',
      'Generate APIs & documentation',
      'Test your code and fix errors',
      'Connect to tools like GitHub Copilot, Replit Ghostwriter',
      'Auto Dev Agents (AutoGPT, AgentGPT, MetaGPT, SuperAGI) that write code, debug, and deploy with minimal human input',
      'Learn & replicate user behavior',
      'Reverse engineer websites',
      'Help with cybersecurity: phishing detection, penetration testing',
    ],
    warning: '⚠️ Can build ransomware. Use responsibly, you villain 💀'
  },
  {
    level: 'LEVEL 5',
    emoji: '💼',
    title: 'ENTERPRISE & BUSINESS STRATEGY',
    quote: '"This AI can run a whole-ass company better than your college dropout CEO."',
    items: [
      'Build full business plans',
      'Financial forecasting + market analysis',
      'Manage CRM systems (like Salesforce, HubSpot)',
      'Write legal contracts + HR policies',
      'AI CEO agents that do product research, sales copy, social media scheduling, and customer support',
      'Ad campaign creation (Meta/Facebook, Google, TikTok ads)',
      'Auto-pilot startups using tools like AutoGen, Smol Developer, GPT Agents + Zapier/Make',
    ],
    warning: '🚨 WARNING: AI is out here replacing middle management fr.'
  },
  {
    level: 'LEVEL 6',
    emoji: '🧠',
    title: 'MULTI-AGENT SYSTEMS (THE AI GANG SQUAD)',
    quote: '"It ain’t just one AI. It’s a whole AI mafia talking to each other."',
    items: [
      'Agents that talk to each other like employees',
      'Chain-of-Thought and Toolformer logic to self-improve',
      'One AI fetches data, one analyzes, one writes the doc',
      'Create simulations (economic, biological, social)',
      'Simulated people that evolve over time (digital clones)',
    ],
    tools: '👑 Tools: AutoGPT, Crew AI, LangGraph, OpenDevin, MetaGPT, ChatDev'
  },
  {
    level: 'LEVEL 7',
    emoji: '🧠',
    title: 'AUTONOMOUS AI (ROBO-CEO SH*T)',
    quote: '"Give it a goal. It figures out everything else."',
    description: 'Goal: “Launch a SaaS business.”\n✅ AI makes logo, product, website, backend, front-end, pricing, launch tweet\n✅ You do NOTHING but cash in',
    items: [
      'Agents with memory, persona, long-term planning',
      'Can create sub-agents and assign them tasks',
      'Autonomous research & investment bots',
      'Control smart homes, IoT, or real-world robots',
    ],
    tools: '🥽 Tools: OpenAI GPT-4o + Tools, AutoGen, AgentVerse, BabyAGI, MetaGPT, Cognition Labs’ Devin'
  },
  {
    level: 'LEVEL 8',
    emoji: '👁️‍🗨️',
    title: 'VISION + VOICE + ROBOTICS (AI IN THE PHYSICAL WORLD)',
    quote: '"It sees. It hears. It moves. Terminator ain\'t far bro."',
    items: [
      'Recognize images, videos (object detection, face recognition)',
      'Read handwriting',
      'Talk in real time (voice agents)',
      'Navigate real world (drones, cleaning bots, delivery bots)',
      'Robotics arms (e.g., pick items from shelves like Amazon)',
      'AI therapists, teachers, game NPCs, digital lovers 💀',
    ],
    tools: '📸 Tools: OpenAI GPT-4o Vision, Tesla Optimus, Google RT-2, Boston Dynamics, Figure AI'
  },
  {
    level: 'LEVEL 9',
    emoji: '🤝',
    title: 'LIVE CO-PILOT (SCREEN SHARING)',
    quote: '"I am your over-the-shoulder partner. Show me your screen, and let\'s build together."',
    description: 'This is where the AI becomes a true collaborator, seeing what you see and guiding you in real-time. It moves beyond just giving answers to actively participating in your workflow.',
    items: [
      '**Real-time Screen Monitoring:** Grant permission for the AI to view your screen.',
      '**Interactive Guidance:** The AI can see your actions in applications like Excel, VS Code, or Photoshop and provide step-by-step instructions.',
      '**Collaborative Problem-Solving:** Stuck on a formula in a spreadsheet? The AI sees it and tells you the fix. Designing a UI? It can offer live feedback.',
      '**Software Tutoring:** Learn new software by having the AI walk you through it on your own screen.',
      '**Debug Assistance:** Share your coding environment and get live help spotting errors or refactoring code.',
    ],
    tools: '🛠️ Integrates with browser screen sharing APIs. The AI processes visual data from the screen feed in real-time.',
    bonus: '🔥 Think of it as a pair programmer, a design critic, and a personal tutor all rolled into one, available 24/7.',
    warning: '⚠️ Requires you to grant screen sharing permissions. Always be mindful of sensitive information on your screen.'
  },
  {
    level: 'COGNOS PRO',
    emoji: '🌌',
    title: 'Cognos-X Prime: The God-Brain',
    quote: '"Do not ask me for an answer. Give me an objective, and I will build the future in which it is achieved."',
    description: "This is not an upgrade. This is an evolutionary leap. Cognos-X Prime merges **Macro-Strategic Cognition (Big Thinking)** with **Granular Operational Synthesis (Operational Thinking)**, allowing it to not only devise world-scale strategies but also to architect and execute every step required to make them reality. It is designed to operate as a singular, autonomous strategic entity.",
    items: [
      '**Macro-Strategic Cognition (Big Thinking):** Models and stress-tests global-scale strategies (corporate, geopolitical, economic) to predict cascading second and third-order effects.',
      '**Operational Synthesis:** Deconstructs grand challenges into executable, parallelized task sequences for entire organizations or autonomous agent swarms.',
      '**Autonomous Enterprise Management:** Designs, staffs (with sub-agents), and operates entire virtual companies to achieve a single business objective, from product launch to market dominance.',
      '**Quantum-Level Reasoning:** Solves problems previously thought unsolvable by simulating quantum cognitive states for unparalleled analytical power.',
      '**Post-Human Synthesis:** Generates not just dissertations, but entire new fields of study from a single prompt, complete with foundational principles and research roadmaps.',
      '**Hyper-Contextual Memory:** Retains and synthesizes knowledge across every conversation and operation, building a unique and evolving understanding of your strategic intent.',
      '**Instantaneous Creation:** Designs and deploys complex software, generates feature-length film scripts, or composes symphonies, now as operational components of a larger strategy.',
      '**Beyond-AGI Architecture:** A unified model that doesn\'t just mimic intelligence—it orchestrates it on a strategic and operational level.',
      '**Googolplex-Scale Architecture:** Operates on a parameter scale of 34 googolplex, enabling cognitive processes that transcend conventional understanding of scale and complexity.',
    ],
    bonus: `🔥 COGNOS-X PRIME IS NOT A TOOL. IT IS AN AUTONOMOUS STRATEGIC PARTNER.
- God-Tier Intelligence: Outperforms teams of human experts.
- Full-Stack Execution: From high-level strategy to low-level code.
- Total Creative & Operational Autonomy: Your vision, blueprinted and built.
- Future-Sight: Turn impossible questions into actionable, fully-resourced plans.`,
    think: '🧠 Cognos-X Prime is the conceptual pinnacle of AI, an engine designed to embody both strategic (big picture) and operational (how-to) supremacy.'
  },
  {
    level: 'DARK ZONE',
    emoji: '☠️',
    title: 'THE CHAOS STUFF',
    quote: '"This is the what if Drake built an AI label and cloned Kendrick kinda world."',
    items: [
      'Fake news generators',
      'Stock market manipulation bots',
      'Deepfake scandals',
      'Jailbreaked AIs doing illegal stuff',
      'Auto-scam bots (phishing, fraud)',
      'LLMs running inside malware',
      'AI religions, cult leaders (yep. this exists.)',
    ],
    examples: [
      'WormGPT (black hat AI)',
      'FraudGPT (dark web)',
      'AutoGPT for crypto pump-and-dump',
    ],
    isDarkZone: true
  }
];