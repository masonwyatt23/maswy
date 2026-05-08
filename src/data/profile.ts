export const profile = {
  name: 'Mason Wyatt',
  alias: 'maswy',
  company: 'ashlr.ai',
  pronunciation: {
    display: 'MAHZ-WHY',
    speech: 'maahz why',
    label: 'pronounced like',
  },
  birthday: 'June 22, 2026',
  graduation: 'JMU, May 2025',
  links: {
    linkedin: 'https://www.linkedin.com/in/mason-wyatt-932400201',
    instagram: 'https://www.instagram.com/mason.wyatt.23',
    x: 'https://x.com/masonwyatt23',
    github: 'https://github.com/masonwyatt23',
    substack: 'https://ashlr.substack.com',
    ashlr: 'https://ashlr.ai',
  },
} as const

export type Project = {
  name: string
  tag: string
  copy: string
  preview: string
  repo?: string
  live?: string
}

export const publicProjects: Project[] = [
  {
    name: 'Stargaze',
    tag: 'Open source',
    copy: 'Swipe through GitHub repos. Star the good ones. Keep moving.',
    preview: '/media/projects/stargaze.jpg',
    repo: 'https://github.com/masonwyatt23/stargaze',
    live: 'https://stargaze-evero.vercel.app',
  },
  {
    name: 'TypeForge',
    tag: 'Open source',
    copy: 'Typing game with scoring, combos, effects, and rhythm mode.',
    preview: '/media/projects/typeforge.jpg',
    repo: 'https://github.com/masonwyatt23/typeforge',
  },
  {
    name: 'Food Factory Tycoon',
    tag: 'Roblox',
    copy: 'Roblox restaurant tycoon: cook, upgrade, earn, repeat.',
    preview: '/media/projects/food-factory-tycoon.jpg',
    repo: 'https://github.com/masonwyatt23/food-factory-tycoon',
  },
  {
    name: 'Galaxy Empire Simulator',
    tag: 'Roblox',
    copy: 'Roblox space tycoon with neon bases, upgrades, and events.',
    preview: '/media/projects/galaxy-empire-simulator.jpg',
    repo: 'https://github.com/masonwyatt23/galaxy-empire-simulator',
  },
  {
    name: 'Tower of Chaos',
    tag: 'Roblox',
    copy: 'Randomized Roblox obby with coins, trails, and rotating obstacles.',
    preview: '/media/projects/tower-of-chaos.jpg',
    repo: 'https://github.com/masonwyatt23/tower-of-chaos',
  },
  {
    name: 'CashFlow Empire',
    tag: 'Roblox',
    copy: 'Roblox tycoon with quests, upgrades, achievements, and events.',
    preview: '/media/projects/cashflow-empire.jpg',
    repo: 'https://github.com/masonwyatt23/cashflow-empire',
  },
  {
    name: 'AI Chef',
    tag: 'Open source',
    copy: 'Menu and cocktail idea generator for restaurants.',
    preview: '/media/projects/ai-chef.jpg',
    repo: 'https://github.com/masonwyatt23/AI-chef',
  },
  {
    name: 'Policy Summarizer',
    tag: 'Open source',
    copy: 'Paste dense policy text. Get the short version.',
    preview: '/media/projects/policy-summarizer.jpg',
    repo: 'https://github.com/masonwyatt23/policy-summarizer',
  },
]

export const ashlrGitHubProjects: Project[] = [
  {
    name: 'idle',
    tag: 'Ashlr',
    copy: 'Mac menu-bar app for running DePIN income apps.',
    preview: '/media/projects/idle.jpg',
    repo: 'https://github.com/ashlrai/idle',
    live: 'https://idle.ashlr.ai',
  },
  {
    name: 'ashlr-plugin',
    tag: 'Ashlr',
    copy: 'Claude Code plugin that cuts token waste in Read, Grep, and Edit.',
    preview: '/media/projects/ashlr-plugin.jpg',
    repo: 'https://github.com/ashlrai/ashlr-plugin',
    live: 'https://plugin.ashlr.ai/',
  },
  {
    name: 'phantom-secrets',
    tag: 'Ashlr',
    copy: 'Local secret proxy. Agents see fake tokens; apps get real keys.',
    preview: '/media/projects/phantom-secrets.jpg',
    repo: 'https://github.com/ashlrai/phantom-secrets',
    live: 'https://phm.dev/',
  },
  {
    name: 'webfetch',
    tag: 'Ashlr',
    copy: 'License-aware image search for agents, CLIs, and web apps.',
    preview: '/media/projects/webfetch.jpg',
    repo: 'https://github.com/ashlrai/webfetch',
    live: 'https://getwebfetch.com',
  },
  {
    name: 'morphkit',
    tag: 'Ashlr',
    copy: 'Converts React and TypeScript product UI into native SwiftUI.',
    preview: '/media/projects/morphkit.jpg',
    repo: 'https://github.com/ashlrai/morphkit',
    live: 'https://morphkit.dev',
  },
  {
    name: 'ashlr-stack',
    tag: 'Ashlr',
    copy: 'CLI and MCP control plane for wiring the services a project needs.',
    preview: '/media/projects/ashlr-stack.jpg',
    repo: 'https://github.com/ashlrai/ashlr-stack',
    live: 'https://stack.ashlr.ai',
  },
  {
    name: 'ashlrcode',
    tag: 'Ashlr',
    copy: 'AI coding agent CLI with multiple models, tools, skills, and MCP.',
    preview: '/media/projects/ashlrcode.jpg',
    repo: 'https://github.com/ashlrai/ashlrcode',
    live: 'https://ashlr.ai/ashlrcode',
  },
  {
    name: 'ashlr-ao',
    tag: 'Ashlr',
    copy: 'Local dashboard for Claude Code, Codex, Aider, and Goose.',
    preview: '/media/projects/ashlr-ao.jpg',
    repo: 'https://github.com/ashlrai/ashlr-ao',
    live: 'https://ashlrao.com',
  },
  {
    name: 'ashlr-pulse',
    tag: 'Ashlr',
    copy: 'Team visibility for AI coding sessions, commits, repos, and agents.',
    preview: '/media/projects/ashlr-pulse.jpg',
    repo: 'https://github.com/ashlrai/ashlr-pulse',
    live: 'https://pulse.ashlr.ai',
  },
  {
    name: 'ashlr-timeline',
    tag: 'Ashlr',
    copy: 'Company memory as a spatial timeline for meetings, decisions, and launches.',
    preview: '/media/projects/ashlr-timeline.jpg',
    live: 'https://timeline.ashlr.ai',
  },
  {
    name: 'binshield',
    tag: 'Ashlr',
    copy: 'Binary scanner for npm supply-chain threats.',
    preview: '/media/projects/binshield.jpg',
    repo: 'https://github.com/ashlrai/binshield',
    live: 'https://binary-scanner.vercel.app',
  },
  {
    name: 'solar',
    tag: 'Ashlr',
    copy: 'Solar permitting knowledge graph with AHJs, NEC refs, and docs.',
    preview: '/media/projects/solar.jpg',
    repo: 'https://github.com/ashlrai/solar',
    live: 'https://solar.ashlr.ai',
  },
  {
    name: 'creatures',
    tag: 'Research',
    copy: 'Virtual organisms using connectome data, spiking nets, and physics.',
    preview: '/media/projects/creatures.jpg',
    repo: 'https://github.com/ashlrai/creatures',
  },
  {
    name: 'ashlr-workbench',
    tag: 'Ashlr',
    copy: 'Local workbench for OpenHands, Goose, Aider, ashlrcode, and MCP.',
    preview: '/media/projects/ashlr-workbench.jpg',
    repo: 'https://github.com/ashlrai/ashlr-workbench',
  },
  {
    name: 'ashlr-core-efficiency',
    tag: 'Ashlr',
    copy: 'Token budgets, compression, and provider-aware coding primitives.',
    preview: '/media/projects/ashlr-core-efficiency.jpg',
    repo: 'https://github.com/ashlrai/ashlr-core-efficiency',
  },
]

export const showcaseProjects: Project[] = [
  {
    name: 'ashlr.ai',
    tag: 'Company',
    copy: 'AI products and custom systems for teams that need real tools.',
    preview: '/media/projects/ashlr-ai.jpg',
    live: 'https://ashlr.ai',
  },
  {
    name: 'Elon by Ashlr',
    tag: 'Live site',
    copy: 'Elon-themed interactive site with essays, visuals, and links.',
    preview: '/media/projects/elon-ashlr.jpg',
    live: 'https://elon.ashlr.ai',
  },
  {
    name: 'Swiftiepedia',
    tag: 'Live site',
    copy: 'Taylor Swift reference site with albums, lyrics, eras, and search.',
    preview: '/media/projects/swiftiepedia.jpg',
    live: 'https://swiftiepedia.com',
  },
  {
    name: 'Don Toliverse',
    tag: 'Live site',
    copy: 'Don Toliver reference site with albums, songs, samples, and search.',
    preview: '/media/projects/dontoliverse.jpg',
    live: 'https://dontoliverse.com',
  },
  {
    name: 'TourVault',
    tag: 'Private build',
    copy: 'Golf performance software for player data and coaching workflows.',
    preview: '/media/projects/tourvault.jpg',
    live: 'https://tourvault.vercel.app',
  },
  {
    name: 'Cotidie',
    tag: 'Private build',
    copy: 'Personal operating system for schedules, ingest, and planning.',
    preview: '/media/projects/cotidie.svg',
  },
  {
    name: 'Ye Universe',
    tag: 'Private build',
    copy: 'Kanye catalog explorer for albums, samples, analysis, and listening paths.',
    preview: '/media/projects/ye-universe.jpg',
    live: 'https://yeuniverse.com',
  },
]

export const heroVideo = '/media/maswy-hero.mp4'
export const heroPoster = '/media/maswy-hero-poster.jpg'
