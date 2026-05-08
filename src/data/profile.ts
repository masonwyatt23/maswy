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
    name: 'CashFlow Empire',
    tag: 'Open source',
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
