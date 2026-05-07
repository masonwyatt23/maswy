export const profile = {
  name: 'Mason Wyatt',
  alias: 'maswy',
  company: 'ashlr.ai',
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
