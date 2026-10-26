/* Shared content for every hub draft. Copy lives here so versions can be compared and merged. */
window.HUB = {
  handle: 'LiX',
  github: 'https://github.com/LiX-Works',
  tagline: 'AI agents for real research, with a researcher at every checkpoint.',
  intro: 'I build open-source AI-agent tools for the daily work of science: finding and citing literature, running simulations, making figures, and explaining physics in ways people can play with.',
  githubLine: 'GitHub is where researchers and engineers worldwide publish, version and review their code. Every project here is open source on it.',
  humanLine: 'Agents draft. A researcher decides. Every tool stops at checkpoints where a person reviews the evidence.',

  /* Working vocabulary, each with a one-line gloss. */
  terms: {
    agent:   { name: 'AI agent',            short: 'Agent',   gloss: 'an AI that plans and carries out multi-step work with real software' },
    prompt:  { name: 'Prompt engineering',  short: 'Prompt',  gloss: 'precise instructions that steer what the model does' },
    context: { name: 'Context engineering', short: 'Context', gloss: 'deciding what the model knows at each step: goal, files, history' },
    skill:   { name: 'Agent Skill',         short: 'Skill',   gloss: 'a packaged playbook of rules and scripts an agent loads when needed' },
    mcp:     { name: 'MCP',                 short: 'MCP',     gloss: 'Model Context Protocol, a plug-in standard that lets an agent operate other software' },
    cli:     { name: 'CLI loop',            short: 'CLI',     gloss: 'the agent runs commands, reads the output and retries until the checks pass' },
    sub:     { name: 'Subagents',           short: 'Subagents', gloss: 'a lead agent hands pieces of work to other models and checks what comes back' },
    hitl:    { name: 'Human-in-the-Loop',   short: 'Human',   gloss: 'a researcher reviews, corrects and decides at every checkpoint' }
  },

  groups: {
    literature: { name: 'Literature',       color: 'teal' },
    simulation: { name: 'Simulation',       color: 'blue' },
    figures:    { name: 'Figures',          color: 'violet' },
    infra:      { name: 'Agent toolkit',    color: 'slate' },
    system:     { name: 'Research loop',    color: 'amber' },
    visual:     { name: 'Science you can play with', color: 'rose' },
    side:       { name: 'Also built',       color: 'gray' }
  },

  projects: [
    { id: 'scholarfetch', name: 'ScholarFetch', group: 'literature',
      repo: 'https://github.com/LiX-Works/ScholarFetch',
      line: 'From a topic to verified publisher PDFs.',
      what: 'Searches six scholarly databases, checks every title, author and DOI, then downloads the publishers’ own PDFs through a dedicated browser that uses your institutional access.',
      human: 'You decide what to cite.',
      terms: ['skill', 'cli', 'hitl'], fig: 'scholarfetch.webp' },

    { id: 'autocite', name: 'Zotero Word AutoCite', group: 'literature',
      repo: 'https://github.com/LiX-Works/Zotero-Word-AutoCite',
      line: 'Dozens of live citations, placed from your plan.',
      what: 'Reads which paper goes where, inserts live Zotero fields into Word and refreshes the bibliography. Every citation stays editable in Zotero.',
      human: 'You decide which paper supports which sentence.',
      terms: ['skill', 'hitl'], fig: 'autocite.webp' },

    { id: 'comsol', name: 'COMSOL Agent Research Workflow', group: 'simulation',
      repo: 'https://github.com/LiX-Works/COMSOL-Agent-Research-Workflow',
      line: 'Physics simulations an agent builds, runs and checks.',
      what: 'Drives COMSOL Multiphysics through its native Java API and command line. Conservation, limiting cases and mesh sensitivity are checked before any result is read.',
      human: 'A researcher states the physics and reviews every run.',
      terms: ['skill', 'cli', 'hitl'], fig: 'comsol-results.webp', fig2: 'comsol-workflow.webp' },

    { id: 'origin', name: 'Origin MCP + Skill', group: 'figures',
      repo: 'https://github.com/LiX-Works/Origin_MCP-Skill_for_Scientific-Plots',
      line: 'Publication figures on request, still editable.',
      what: 'An open-source MCP server operates Origin; a Skill carries Nature- and NIST-style plotting rules. The agent inspects each render, refines it and hands back an editable Origin project.',
      human: 'Human reviews, agent refines.',
      terms: ['mcp', 'skill', 'hitl'], fig: 'origin.webp', gallery: ['origin-xy.webp', 'origin-heatmap.webp', 'origin-category.webp', 'origin-histogram.webp'] },

    { id: 'search', name: 'Agent Search Booster', group: 'infra',
      repo: 'https://github.com/LiX-Works/Agent-Search-Booster',
      line: 'Search wider. Read deeper.',
      what: 'Routing rules send every search to the right engine, platform reader or real browser, so the agent reads full pages, comments and transcripts instead of snippets.',
      terms: ['skill', 'mcp', 'cli'], fig: 'search-booster.webp' },

    { id: 'subagent', name: 'Subagent Manager', group: 'infra',
      repo: 'https://github.com/LiX-Works/Subagent-Manager',
      line: 'One lead agent, a team of models.',
      what: 'The lead decides what to delegate, picks the right model for each piece, hands over the context it needs and checks every result before it is used.',
      terms: ['sub', 'context', 'skill'], fig: 'subagent.webp' },

    { id: 'loop', name: 'Loop for Scientific Research', group: 'system', status: 'Building',
      repo: 'https://github.com/LiX-Works/Loop-for-Scientific-Research',
      line: 'Many models, one research cycle.',
      what: 'A research loop where independent AI advisors assess a question, a team executes, and reviewers examine the evidence. The researcher sets the direction and makes every call.',
      human: 'The researcher closes the loop.',
      terms: ['sub', 'context', 'hitl'], fig: 'loop-research-cycle.svg', fig2: 'loop-overview.svg' },

    { id: 'capacitance', name: 'Capacitance Demos', group: 'visual',
      repo: 'https://github.com/LiX-Works/Capacitance-Demos',
      site: 'https://lix-works.github.io/Capacitance-Demos/',
      line: 'Interactive 3D lessons on capacitive sensing.',
      what: 'ProxiTouch shows one electrode sensing approach, touch and press. The mutual-capacitance lab follows how much capacitance survives as two plates unfold.',
      live: 'proxitouch' },

    { id: 'animation', name: 'Scientific Animation Workflow', group: 'visual',
      repo: 'https://github.com/LiX-Works/Scientific-Animation-Workflow',
      site: 'https://lix-works.github.io/Scientific-Animation-Workflow/gallery/index.html#film',
      line: 'Science films rendered from code.',
      what: 'Electric-double-layer gating, rendered frame by frame from code: a flat transistor gains depth, opens onto the ionic interface, and shows why a thin dielectric breaks down.',
      live: 'edl' },

    { id: 'ksa', name: 'KSA UI Languages', group: 'side',
      repo: 'https://github.com/LiX-Works/KsaUiLanguages',
      line: 'Interface localization for the space-flight game Kitten Space Agency.' },

    { id: 'translate', name: 'Codex Companion Translate', group: 'side',
      repo: 'https://github.com/LiX-Works/codex-companion-translate',
      line: 'A tray app: copy text, press a key, read the translation.' }
  ]
};
HUB.byId = Object.fromEntries(HUB.projects.map(p => [p.id, p]));
