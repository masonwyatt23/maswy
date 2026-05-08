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
  repo?: string
  live?: string
}

export const publicProjects: Project[] = [
  {
    name: 'Stargaze',
    tag: 'open source',
    copy: 'Swipe right, star repos, boost makers. Indie GitHub discovery with actual taste.',
    repo: 'https://github.com/masonwyatt23/stargaze',
    live: 'https://stargaze-evero.vercel.app',
  },
  {
    name: 'TypeForge',
    tag: 'open source',
    copy: 'Competitive typing game with audio, particles, combos, and Guitar Hero mode.',
    repo: 'https://github.com/masonwyatt23/typeforge',
  },
  {
    name: 'CashFlow Empire',
    tag: 'open source',
    copy: 'Roblox tycoon with monetization, quests, achievements, and scheduled events.',
    repo: 'https://github.com/masonwyatt23/cashflow-empire',
  },
  {
    name: 'AI Chef',
    tag: 'open source',
    copy: 'Restaurant profile and menu/cocktail idea generator with an AI chef assistant.',
    repo: 'https://github.com/masonwyatt23/AI-chef',
  },
]

export const ashlrGitHubProjects: Project[] = [
  {
    name: 'idle',
    tag: 'ashlr github',
    copy: 'Native macOS menu-bar app for orchestrating DePIN passive-income apps on Apple Silicon.',
    repo: 'https://github.com/ashlrai/idle',
    live: 'https://idle.ashlr.ai',
  },
  {
    name: 'ashlr-plugin',
    tag: 'ashlr github',
    copy: 'Open-source Claude Code plugin for token-efficient Read, Grep, and Edit workflows.',
    repo: 'https://github.com/ashlrai/ashlr-plugin',
    live: 'https://plugin.ashlr.ai/',
  },
  {
    name: 'phantom-secrets',
    tag: 'ashlr github',
    copy: 'Local proxy and MCP layer that swaps real secrets for safe phm_ tokens in agent workflows.',
    repo: 'https://github.com/ashlrai/phantom-secrets',
    live: 'https://phm.dev/',
  },
  {
    name: 'webfetch',
    tag: 'ashlr github',
    copy: 'License-first image layer with federated providers, MCP support, and TypeScript/Python SDKs.',
    repo: 'https://github.com/ashlrai/webfetch',
    live: 'https://getwebfetch.com',
  },
  {
    name: 'morphkit',
    tag: 'ashlr github',
    copy: 'Semantic AI agent that converts TypeScript and React web apps into native SwiftUI iOS apps.',
    repo: 'https://github.com/ashlrai/morphkit',
    live: 'https://morphkit.dev',
  },
  {
    name: 'ashlr-stack',
    tag: 'ashlr github',
    copy: 'CLI and MCP control plane for provisioning, wiring, and operating third-party dev services.',
    repo: 'https://github.com/ashlrai/ashlr-stack',
    live: 'https://stack.ashlr.ai',
  },
]

export const showcaseProjects: Project[] = [
  {
    name: 'ashlr.ai',
    tag: 'company',
    copy: 'The main thing. AI-native systems for the kind of work that should not be duct taped forever.',
    live: 'https://ashlr.ai',
  },
  {
    name: 'TourVault',
    tag: 'private build',
    copy: 'Golf Performance OS for elite golfers, data, coaching, and unfairly serious workflows.',
    live: 'https://tourvault.vercel.app',
  },
  {
    name: 'Cotidie',
    tag: 'private build',
    copy: 'Life-OS daemon for scheduling, ingest pollers, coach loops, and personal leverage.',
  },
  {
    name: 'Ye Universe',
    tag: 'private build',
    copy: 'Interactive visual explorer for music, samples, analysis, and curated listening paths.',
    live: 'https://yeuniverse.com',
  },
]

export const heroVideo = '/media/maswy-hero.mp4'
export const heroPoster = '/media/maswy-hero-poster.jpg'
