export const profile = {
  name: 'Mason Wyatt',
  alias: 'maswy',
  company: 'ashlr.ai',
  pronunciation: {
    display: 'MAHZ-WHY',
    speech: 'MAHZ WHY',
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
    copy: 'GitHub discovery for finding small projects worth watching.',
    preview: '/media/projects/stargaze.jpg',
    repo: 'https://github.com/masonwyatt23/stargaze',
    live: 'https://stargaze-evero.vercel.app',
  },
  {
    name: 'TypeForge',
    tag: 'Open source',
    copy: 'A fast typing game with effects, combos, and rhythm-game modes.',
    preview: '/media/projects/typeforge.jpg',
    repo: 'https://github.com/masonwyatt23/typeforge',
  },
  {
    name: 'Food Factory Tycoon',
    tag: 'Roblox',
    copy: 'Restaurant tycoon game loop with chef progression, warm visuals, and event hooks.',
    preview: '/media/projects/food-factory-tycoon.jpg',
    repo: 'https://github.com/masonwyatt23/food-factory-tycoon',
  },
  {
    name: 'Galaxy Empire Simulator',
    tag: 'Roblox',
    copy: 'Space tycoon prototype with neon buildings, progression systems, and scheduled events.',
    preview: '/media/projects/galaxy-empire-simulator.jpg',
    repo: 'https://github.com/masonwyatt23/galaxy-empire-simulator',
  },
  {
    name: 'Tower of Chaos',
    tag: 'Roblox',
    copy: 'Randomized obby with obstacle variants, coin economy, trails, and admin events.',
    preview: '/media/projects/tower-of-chaos.jpg',
    repo: 'https://github.com/masonwyatt23/tower-of-chaos',
  },
  {
    name: 'CashFlow Empire',
    tag: 'Roblox',
    copy: 'A Roblox tycoon prototype with quests, achievements, and live events.',
    preview: '/media/projects/cashflow-empire.jpg',
    repo: 'https://github.com/masonwyatt23/cashflow-empire',
  },
  {
    name: 'AI Chef',
    tag: 'Open source',
    copy: 'A restaurant assistant for menu ideas, cocktail concepts, and profile generation.',
    preview: '/media/projects/ai-chef.jpg',
    repo: 'https://github.com/masonwyatt23/AI-chef',
  },
  {
    name: 'Policy Summarizer',
    tag: 'Open source',
    copy: 'A TypeScript app for turning dense policy text into readable summaries.',
    preview: '/media/projects/policy-summarizer.jpg',
    repo: 'https://github.com/masonwyatt23/policy-summarizer',
  },
]

export const ashlrGitHubProjects: Project[] = [
  {
    name: 'idle',
    tag: 'Ashlr',
    copy: 'Native macOS menu-bar app for orchestrating DePIN apps on Apple Silicon.',
    preview: '/media/projects/idle.jpg',
    repo: 'https://github.com/ashlrai/idle',
    live: 'https://idle.ashlr.ai',
  },
  {
    name: 'ashlr-plugin',
    tag: 'Ashlr',
    copy: 'Claude Code plugin for token-efficient Read, Grep, and Edit workflows.',
    preview: '/media/projects/ashlr-plugin.jpg',
    repo: 'https://github.com/ashlrai/ashlr-plugin',
    live: 'https://plugin.ashlr.ai/',
  },
  {
    name: 'phantom-secrets',
    tag: 'Ashlr',
    copy: 'Local proxy and MCP layer for keeping real secrets out of agent contexts.',
    preview: '/media/projects/phantom-secrets.jpg',
    repo: 'https://github.com/ashlrai/phantom-secrets',
    live: 'https://phm.dev/',
  },
  {
    name: 'webfetch',
    tag: 'Ashlr',
    copy: 'License-first image search layer with MCP support and TypeScript/Python SDKs.',
    preview: '/media/projects/webfetch.jpg',
    repo: 'https://github.com/ashlrai/webfetch',
    live: 'https://getwebfetch.com',
  },
  {
    name: 'morphkit',
    tag: 'Ashlr',
    copy: 'Agent system for converting TypeScript and React apps into SwiftUI iOS apps.',
    preview: '/media/projects/morphkit.jpg',
    repo: 'https://github.com/ashlrai/morphkit',
    live: 'https://morphkit.dev',
  },
  {
    name: 'ashlr-stack',
    tag: 'Ashlr',
    copy: 'CLI and MCP control plane for provisioning and operating external dev services.',
    preview: '/media/projects/ashlr-stack.jpg',
    repo: 'https://github.com/ashlrai/ashlr-stack',
    live: 'https://stack.ashlr.ai',
  },
  {
    name: 'ashlrcode',
    tag: 'Ashlr',
    copy: 'Multi-provider AI coding agent CLI with tools, skills, MCP support, and autopilot mode.',
    preview: '/media/projects/ashlrcode.jpg',
    repo: 'https://github.com/ashlrai/ashlrcode',
    live: 'https://ashlr.ai/ashlrcode',
  },
  {
    name: 'ashlr-ao',
    tag: 'Ashlr',
    copy: 'Local-first command center for running Claude Code, Codex, Aider, and Goose.',
    preview: '/media/projects/ashlr-ao.jpg',
    repo: 'https://github.com/ashlrai/ashlr-ao',
    live: 'https://ashlrao.com',
  },
  {
    name: 'ashlr-pulse',
    tag: 'Ashlr',
    copy: 'Shared mission control for agentic engineering teams across repos and AI agents.',
    preview: '/media/projects/ashlr-pulse.jpg',
    repo: 'https://github.com/ashlrai/ashlr-pulse',
  },
  {
    name: 'binshield',
    tag: 'Ashlr',
    copy: 'Binary scanner for npm supply-chain threats with decompile and AI classification.',
    preview: '/media/projects/binshield.jpg',
    repo: 'https://github.com/ashlrai/binshield',
    live: 'https://binary-scanner.vercel.app',
  },
  {
    name: 'solar',
    tag: 'Ashlr',
    copy: 'Open solar permitting knowledge graph covering AHJs, NEC refs, and integration docs.',
    preview: '/media/projects/solar.jpg',
    repo: 'https://github.com/ashlrai/solar',
    live: 'https://solar.ashlr.ai',
  },
  {
    name: 'creatures',
    tag: 'Research',
    copy: 'Virtual organisms powered by connectome data, spiking networks, and physics bodies.',
    preview: '/media/projects/creatures.jpg',
    repo: 'https://github.com/ashlrai/creatures',
  },
  {
    name: 'ashlr-workbench',
    tag: 'Ashlr',
    copy: 'Local workbench that wires OpenHands, Goose, Aider, ashlrcode, and MCP servers.',
    preview: '/media/projects/ashlr-workbench.jpg',
    repo: 'https://github.com/ashlrai/ashlr-workbench',
  },
  {
    name: 'ashlr-core-efficiency',
    tag: 'Ashlr',
    copy: 'Token-efficiency primitives for compression, budgets, and provider-aware coding flows.',
    preview: '/media/projects/ashlr-core-efficiency.jpg',
    repo: 'https://github.com/ashlrai/ashlr-core-efficiency',
  },
]

export const showcaseProjects: Project[] = [
  {
    name: 'ashlr.ai',
    tag: 'Company',
    copy: 'AI-native systems for teams that need durable tools, automation, and infrastructure.',
    preview: '/media/projects/ashlr-ai.jpg',
    live: 'https://ashlr.ai',
  },
  {
    name: 'Elon by Ashlr',
    tag: 'Live site',
    copy: 'Interactive Elon-themed web project built as a sharp, visual internet object.',
    preview: '/media/projects/elon-ashlr.jpg',
    live: 'https://elon.ashlr.ai',
  },
  {
    name: 'Swiftiepedia',
    tag: 'Live site',
    copy: 'Taylor Swift reference site with structured pages, search, and deep catalog detail.',
    preview: '/media/projects/swiftiepedia.jpg',
    live: 'https://swiftiepedia.com',
  },
  {
    name: 'Don Toliverse',
    tag: 'Live site',
    copy: 'Don Toliver fan site with a visual artist-universe treatment.',
    preview: '/media/projects/dontoliverse.jpg',
    live: 'https://dontoliverse.com',
  },
  {
    name: 'TourVault',
    tag: 'Private build',
    copy: 'Golf performance software for player data, coaching workflows, and training plans.',
    preview: '/media/projects/tourvault.jpg',
    live: 'https://tourvault.vercel.app',
  },
  {
    name: 'Cotidie',
    tag: 'Private build',
    copy: 'Personal operating system for schedules, ingest loops, and daily planning.',
    preview: '/media/projects/cotidie.svg',
  },
  {
    name: 'Ye Universe',
    tag: 'Private build',
    copy: 'Interactive explorer for music, samples, analysis, and curated listening paths.',
    preview: '/media/projects/ye-universe.jpg',
    live: 'https://yeuniverse.com',
  },
]

export const heroVideo = '/media/maswy-hero.mp4'
export const heroPoster = '/media/maswy-hero-poster.jpg'
